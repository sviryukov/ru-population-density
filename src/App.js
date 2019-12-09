import {useState} from 'react';
import {Header} from "./components/Header";
import {Legend} from './components/Legend';
import {Map} from './components/Map';

const COLOR_HUE = 270;

const App = () => {
    const [selectedSubject, setSelectedSubject] = useState(false);
    const [breakpoints, setBreakpoints] = useState(false);
    return (
        <div style={{width: '1280px', height: '900px', margin: 'auto', padding: '20px 0px', fontFamily: 'sans-serif'}}>
            <Header/>
            <Legend breakpoints={breakpoints}
                    selectedSubject={selectedSubject}
                    setSelectedSubject={setSelectedSubject}
                    colorHue={COLOR_HUE}/>
            <Map setBreakpoints={setBreakpoints}
                 selectedSubject={selectedSubject}
                 setSelectedSubject={setSelectedSubject}
                 colorHue={COLOR_HUE}/>
        </div>
    );
};

export default App;