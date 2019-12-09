import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    text-align: center;
`;

const Header = () => {
    return (
        <Container>
            <h1>
                Плотность населения субъектов Российской Федерации
            </h1>
        </Container>
    );
};

export {Header};