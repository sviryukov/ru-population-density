const topo = require('./raw_topo');
const fs = require('fs');

const geometries = topo.objects.subunits.geometries;

geometries.sort((a, b) => a.properties.population / a.properties.square - b.properties.population / b.properties.square);

const COLOR_HUE = '270';

/*
        2 methods of painting subjects on a map by population density
*/

/*
    Method 1: each subject painted in unique color

fill = hsl(COLOR_HUE, 50%, UNIQUE_COLOR_VALUE)
x = population_density
UNIQUE_COLOR_VALUE(x) = c1 + c2 * ln(x)
UNIQUE_COLOR_VALUE(min(x)) = 90
UNIQUE_COLOR_VALUE(max(x)) = 0
c2 = 90 / (ln(min(x)) - ln(max(x)))
c1 = - c2 * ln(max(x))
*/

const MIN_LOG_X = Math.log(geometries[0].properties.population / geometries[0].properties.square);
const MAX_LOG_X = Math.log(geometries[geometries.length - 1].properties.population / geometries[geometries.length - 1].properties.square);
const C2 = 90 / (MIN_LOG_X - MAX_LOG_X);
const C1 = -C2 * MAX_LOG_X;
const calculateUniqueColor = logX => C1 + C2 * logX + '%';

/*
    Method 2: subjects painted in 5 colors, split into 5 equal logarithmic intervals

fill = hsl(COLOR_HUE, 50%, INTERVAL_COLOR_VALUE)
x = population_density
delta = (ln(max(x)) - ln(min(x))) / 5
INTERVAL_COLOR_VALUE(x) = 85%, ln(x) < lin(min(x)) + delta
                        = 70%, ln(x) ∈ [lin(min(x)) + delta, lin(min(x)) + 2 * delta)
                        = 55%, ln(x) ∈ [lin(min(x)) + 2 * delta, lin(min(x)) + 3 * delta)
                        = 40%, ln(x) ∈ [lin(min(x)) + 3 * delta, lin(min(x)) + 4 * delta)
                        = 0%, ln(x) >= 4 * delta
*/

const DELTA = (MAX_LOG_X - MIN_LOG_X) / 5;
const breakpoints = [];
for(let i = 1; i < 5; i++) breakpoints.push({
    logX: MIN_LOG_X + i * DELTA,
    colorValue: 100 - i * 15 + '%'
});
const calculateIntervalColor = logX => {
    for(let i = 0; i < 4; i++)
        if(logX < breakpoints[i].logX) return breakpoints[i].colorValue;
    return '0%';
};


geometries.forEach(geo => {
    for (let property in geo.properties) {
        if (property !== 'full_name' && property !== 'population' && property !== 'square') delete geo.properties[property];
    }
    geo.properties.population_density = Math.round(100 * geo.properties.population / geo.properties.square) / 100;
    const UNIQUE_COLOR_VALUE = calculateUniqueColor(Math.log(geo.properties.population_density));
    const INTERVAL_COLOR_VALUE = calculateIntervalColor(Math.log(geo.properties.population_density));
    geo.properties.uniqueColor = `hsl(${COLOR_HUE}, 50%, ${UNIQUE_COLOR_VALUE})`;
    geo.properties.intervalColor = `hsl(${COLOR_HUE}, 50%, ${INTERVAL_COLOR_VALUE})`;
});

fs.writeFile('./src/geography/topo.json', JSON.stringify(topo), err => err ? console.log(err) : console.log('success'));