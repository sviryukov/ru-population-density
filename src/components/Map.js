import {useEffect} from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';
import {geoConicEqualArea} from "d3-geo";
import topo from '../data/topo';

const Map = props => {
    const handleFocus = properties => () => props.setSelectedSubject(properties);
    useEffect(() => {
        topo.breakpoints.forEach((breakpoint, i) => {
            if (i === 0) breakpoint.name = `< ${breakpoint.x}`;
            else breakpoint.name = `${topo.breakpoints[i - 1].x} - ${breakpoint.x}`;
        });
        topo.breakpoints.push({
            name: `> ${topo.breakpoints[topo.breakpoints.length - 1].x}`,
            colorValue: 0
        });
        props.setBreakpoints(topo.breakpoints);
    }, []);
    return (
        <ComposableMap projection={() => geoConicEqualArea()
            .scale(1000)
            .center([-32, 72.5])
            .parallels([40, 80])
            .rotate([270, 0])} width='1280' height='720'>
            <Geographies geography={topo}>
                {(geographies, projection) => geographies.map((geo, i) => {
                    return (
                        <Geography key={geo.properties.full_name}
                                   tabIndex={85 - i}
                                   projection={projection}
                                   geography={geo}
                                   stroke='#fff'
                                   style={{
                                       default: {
                                           fill: `hsl(${props.colorHue}, 50%, ${geo.properties.colorValue}%)`,
                                           transition: 'fill 0.2s',
                                           outline: "none",
                                           cursor: 'pointer'
                                       },
                                       hover: {
                                           fill: `hsl(${props.colorHue}, 100%, 50%)`,
                                           outline: "none",
                                           cursor: 'pointer'
                                       },
                                       pressed: {
                                           fill: `hsl(${props.colorHue}, 100%, 50%)`,
                                           outline: "none",
                                           cursor: 'pointer'
                                       }
                                   }}
                                   onFocus={handleFocus(geo.properties)}/>
                    );
                })}
            </Geographies>
        </ComposableMap>
    );
};

export {Map};