import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {geoConicEqualArea} from "d3-geo";
import topo from '../geography/topo';

const Map = () => {
    return (
        <ComposableMap projection={() => geoConicEqualArea()
            .scale(1000)
            .center([-32, 72.5])
            .parallels([40, 80])
            .rotate([270, 0])} width='1280' height='720'>
            <Geographies geography={topo}>
                {(geographies, projection) => geographies.map(geo => {
                    return (
                        <Geography
                            key={geo.properties.full_name}
                            stroke='#fff'
                            projection={projection}
                            geography={geo}
                            fill={geo.properties.uniqueColor}
                        />
                    );
                })}
            </Geographies>
        </ComposableMap>
    );
};

export {Map};