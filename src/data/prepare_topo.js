const topo = require('./raw_topo');
const fs = require('fs');
const round10 = require('round10').round10;

const geometries = topo.objects.subunits.geometries;

geometries.sort((a, b) => a.properties.population / a.properties.square - b.properties.population / b.properties.square);

/*
fill = hsl(COLOR_HUE, 50%, COLOR_VALUE)
x - population density
delta = (ln(max(x)) - ln(min(x))) / N
COLOR_VALUE(x) = 100% - 80% / N,             ln(x) < ln(min(x)) + delta
               = 100% - 80% * 2 / N,         ln(x) ∈ [ln(min(x)) + delta; ln(min(x)) + 2 * delta)
               ...
               = 100% - 80% * (N - 1) / N,   ln(x) ∈ [ln(min(x)) + (N - 2) * delta; ln(min(x)) + (N - 1) * delta)
               = 0%,                         ln(x) >= (N - 1) * delta
*/

const MIN_LN_X = Math.log(geometries[0].properties.population / geometries[0].properties.square);
const MAX_LN_X = Math.log(geometries[geometries.length - 1].properties.population / geometries[geometries.length - 1].properties.square);
const N = 7;
const DELTA = (MAX_LN_X - MIN_LN_X) / N;
const breakpoints = [];
const roundBreakpoint = lnX => {
    let firstDigitPosition = Math.floor(lnX / Math.log(10));
    let roundedX = round10(Math.exp(lnX), firstDigitPosition);
    let roundedLnX = Math.log(roundedX);
    return {roundedX, roundedLnX};
};
for (let i = 1; i < N; i++) {
    let rawLnX = MIN_LN_X + i * DELTA;
    let {roundedX, roundedLnX} = roundBreakpoint(rawLnX);
    breakpoints.push({
        lnX: roundedLnX,
        x: roundedX,
        colorValue: 100 - i * 80 / N
    });
}
const calculateColor = lnX => {
    for (let i = 0; i < N - 1; i++)
        if (lnX < breakpoints[i].lnX) return breakpoints[i].colorValue;
    return 0;
};
topo.breakpoints = breakpoints;


geometries.forEach(geo => {
    for (let property in geo.properties) {
        if (property !== 'full_name' && property !== 'population' && property !== 'square') delete geo.properties[property];
    }
    geo.properties.density = round10(geo.properties.population / geo.properties.square, -2);
    geo.properties.colorValue = calculateColor(Math.log(geo.properties.density));
});

fs.writeFile('./src/data/topo.json', JSON.stringify(topo), err => err ? console.log(err) : console.log('success'));