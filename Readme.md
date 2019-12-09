## Population density of federal subjects of Russia visualizing web app
 
#### [Demo](http://tests.jelastic.regruhosting.ru/)

#### Stack: node.js, express.js, React.js, styled-components, [React Simple Maps](https://www.react-simple-maps.io/) 

### Data display method

#### 1. Subjects are sorted in order of population density.

#### 2. Subjects are combined into 7 groups by equal logarithmic intarvals:

x - population density of a subject
<br/>
<br/>
delta = (ln(x<sub>max</sub>) - ln(x<sub>min</sub>)) / 7
<br/>
<br/>
X<sub>1</sub> = {x: ln(x) < ln(x<sub>min</sub>) + delta = d<sub>1</sub>}
<br/>
X<sub>2</sub> = {x: ln(x) ∈ [ln(x<sub>min</sub>) + delta; ln(x<sub>min</sub>) + 2 * delta) = [d<sub>1</sub>; d<sub>2</sub>)}
<br/>
...
<br/>
X<sub>6</sub> = {x: ln(x) ∈ [ln(x<sub>min</sub>) + 5 * delta; ln(x<sub>min</sub>) + 6 * delta) = [d<sub>5</sub>; d<sub>6</sub>)}
<br/>
X<sub>7</sub> = {x: ln(x) ≥ ln(x<sub>min</sub>) + 6 * delta = d<sub>6</sub>}
<br/>
<br/>
d<sub>1</sub>, d<sub>2</sub>, ..., d<sub>6</sub> - logarithmic breakpoints.

#### 3. Breakpoints initial (not logarithmic) values (e<sup>d<sub>1</sub></sup>, e<sup>d<sub>2</sub></sup>, ...) are rounded to one significant digit, so that group border values look practical and navigation over data is easier. Logarithmic breakpoints are recalculated in accordance with new group border values.

E.g.:
<br/>
<br/>
x<sub>min</sub> = 0.07
<br/>
x<sub>max</sub> = 4782.44
<br/>
d<sub>1</sub> = ln(x<sub>min</sub>) + delta = -1.0689...
<br/>
e<sup>d<sub>1</sub></sup> = 0.3433...  ->  0.3
<br/>
d<sub>1-rounded</sub> = ln(0.3) = -1.2039...
<br/>
...
<br/>
d<sub>6</sub> = ln(x<sub>min</sub>) + 6 * delta = 6.8824...
<br/>
e<sup>d<sub>6</sub></sup> = 974.9881...  ->  1000
<br/>
d<sub>6-rounded</sub> = ln(1000) = 6.9007...


#### 4. Subjects (recombined in accordance with new rounded breakpoints) of the same group are painted in the same color of hue-saturation-value model. Neighbour groups' color values differ by (80/7)%, excluding the last 2 groups: the 6th's value is (100 - 6 * 80 / 7)% and the 7th's value is 0% (for visual contrast reason).

### Sources

[carto.com](https://obulantsev.carto.com/tables/russia_geojson_wgs84/public/map)