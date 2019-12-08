const topo = require('./raw_topo');
const fs = require('fs');

const geometries = topo.objects.subunits.geometries;

geometries.sort((a, b) => a.properties.population / a.properties.square - b.properties.population / b.properties.square);

const COLOR_HUE = '270';

/*
fill = hsl(COLOR_HUE, 50%, COLOR_VALUE)
x = population_density
COLOR_VALUE(x) = c1 + c2 * ln(x)
COLOR_VALUE(min(x)) = 90
COLOR_VALUE(max(x)) = 0
c1 = 90 / (ln(min(x) / max(x))
c2 = - c1 * ln(max(x))
*/

const MIN_X = geometries[0].properties.population / geometries[0].properties.square;
const MAX_X = geometries[geometries.length - 1].properties.population / geometries[geometries.length - 1].properties.square;
const C2 = 90 / (Math.log(MIN_X / MAX_X));
const C1 = -C2*Math.log(MAX_X);

geometries.forEach(geo => {
    for (let property in geo.properties) {
        if (property !== 'full_name' && property !== 'population' && property !== 'square') delete geo.properties[property];
    }
    geo.properties.population_density = Math.round(100 * geo.properties.population / geo.properties.square) / 100;
    const COLOR_VALUE = C1 + C2 * Math.log(geo.properties.population_density) + '%';
    geo.properties.fill = `hsl(${COLOR_HUE}, 50%, ${COLOR_VALUE})`;
});

fs.writeFile('./src/geography/topo.json', JSON.stringify(topo), err => err ? console.log(err) : console.log('success'));