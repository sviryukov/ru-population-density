import React from 'react';
import styled, {css} from "styled-components";
import {CloseButton} from "./Close";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
`;
const Legend = styled.div`
    width: 250px;
`;
const LegendRow = styled.div`
    display: flex;
    line-height: 24px;
`;
const LegendMarker = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    
    ${props => css`
        background-color: hsl(${props.colorHue}, 50%, ${props.colorValue}%)
    `}
`;
const SubjectInfoCardContainer = styled.div`
    width: 400px;
    line-height: 30px;
`;
const SubjectInfoCard = styled.div`
    position: relative;
    width: fit-content;
    padding: 20px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;
const CloseButtonContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const Info = props => {
    return (
        <Container>
            <Legend>
                {props.breakpoints && props.breakpoints.map(breakpoint => (
                    <LegendRow>
                        <LegendMarker colorHue={props.colorHue} colorValue={breakpoint.colorValue}/>
                        <div>
                            {breakpoint.name} чел./км<sup>2</sup>
                        </div>
                    </LegendRow>
                ))}
            </Legend>
            <SubjectInfoCardContainer>
                {props.selectedSubject ? (
                    <SubjectInfoCard>
                        <b>
                            {props.selectedSubject.full_name}
                        </b>
                        <br/>
                        Плотность населения: {props.selectedSubject.density} чел./км<sup>2</sup>
                        <br/>
                        Численность населения: {props.selectedSubject.population} человек
                        <br/>
                        Площадь: {props.selectedSubject.square} км<sup>2</sup>
                        <CloseButtonContainer onClick={() => props.setSelectedSubject(false)}>
                            <CloseButton/>
                        </CloseButtonContainer>
                    </SubjectInfoCard>
                ) : 'Нажмите на субъект для просмотра подробной информации'}
            </SubjectInfoCardContainer>
        </Container>
    );
};

export {Info};