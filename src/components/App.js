import React, {useState} from 'react';
import styled from "styled-components";
import {Header} from "./Header";
import {Info} from './Info';
import {Map} from './Map';
import {Source} from "./Source";

const COLOR_HUE = 270;

const Container = styled.div`
    width: 1280px;
    height: 938px;
    margin: auto;
    padding: 20px 0px;
    font-family: sans-serif;
`;

const App = () => {
    const [selectedSubject, setSelectedSubject] = useState(false);
    const [breakpoints, setBreakpoints] = useState(false);
    return (
        <Container>
            <Header/>
            <Info breakpoints={breakpoints}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  colorHue={COLOR_HUE}/>
            <Map setBreakpoints={setBreakpoints}
                 selectedSubject={selectedSubject}
                 setSelectedSubject={setSelectedSubject}
                 colorHue={COLOR_HUE}/>
            <Source/>
        </Container>
    );
};

export {App};