import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding-top: 20px;
    text-align: center;
`;
const SourceLink = styled.a`
    color: rgb(0, 0, 0);
    text-decoration: underline;
`;

const Source = () => {
    return (
        <Container>
            Источник:&nbsp;
            <SourceLink href='https://obulantsev.carto.com/tables/russia_geojson_wgs84/public/map' target='_blank'>
                carto.com
            </SourceLink>
        </Container>
    );
};

export {Source};