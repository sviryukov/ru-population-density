import {CloseButton} from "./Close";

const Legend = props => {
    return (
        <div style={{display: 'flex', width: '100%', height: '100px', justifyContent: 'center'}}>
                <div style={{width: '250px'}}>
                    {props.breakpoints && props.breakpoints.map(breakpoint => (
                        <div style={{display: 'flex'}}>
                            <div style={{width: '30px', height: '30px', backgroundColor: `hsl(${props.colorHue}, 50%, ${breakpoint.colorValue}%)`}}/>
                            <div style={{lineHeight: '24px', paddingLeft: '10px'}}>
                                {breakpoint.name} чел./км<sup>2</sup>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{width: '400px', lineHeight: '30px'}}>
                    {props.selectedSubject ? (
                        <div style={{
                            position: 'relative',
                            width: 'fit-content',
                            padding: '20px',
                            border: '1px solid rgb(230, 230, 230)',
                            borderRadius: '5px',
                            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                        }}>
                            <b>
                                {props.selectedSubject.full_name}
                            </b>
                            <br/>
                            Плотность населения: {props.selectedSubject.density} чел./км<sup>2</sup>
                            <br/>
                            Численность населения: {props.selectedSubject.population} человек
                            <br/>
                            Площадь: {props.selectedSubject.square} км<sup>2</sup>
                            <div style={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}}
                                 onClick={() => props.setSelectedSubject(false)}>
                                <CloseButton/>
                            </div>
                        </div>
                    ) : 'Нажмите на субъект для просмотра подробной информации'}
                </div>
        </div>
    );
};

export {Legend};