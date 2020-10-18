import React, { useEffect, useState, useContext } from 'react';

const CONFIGLY_SERVER_URL = "http://configly.herokuapp.com/api/v1/value";

interface props {
    prop: string,
    render: (value: string) => JSX.Element,
}

function loadConfiglyData(key: string, apiKey: string | null, onComplete: (data: string) => any) {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(`${apiKey}:`));
    fetch(`${CONFIGLY_SERVER_URL}?keys[]=${key}`, {method: 'GET', headers})
      .then(res => res.json())
      .then((result) => onComplete(result.data[key].value), (error) => {console.log(error)});
}

function BaseConfiglyComponent(props: props) {
    const [value, setValue] = useState(null);
    const config = useContext(ConfiglyContext);
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        if (!requestInProgress && !value) {
            loadConfiglyData(props.prop, config.apiKey, (value: any) => {setValue(value); setRequestInProgress(false);});
            setRequestInProgress(true);
        }
    }, [requestInProgress, value, props.prop]);

    if (value == null) {
        return(<span>Loading...</span>);
    }
    return(props.render(value || ''));
}

function ConfiglyComponent(props: props) {
    return (<BaseConfiglyComponent prop={props.prop} render={props.render} />);
}

function ConfiglyText(props: props) {
    return (<BaseConfiglyComponent prop={props.prop} render={(value: string) => { return (<span>{value}</span>)}} />);
}

function ConfiglyDropdown(props: props) {
    const renderDropdown =(value: string) => {
        const options = Object.keys(value).map((key) =>
            <option value={key}>{value[key]}</option>
        );

        return (<select>{options}</select>);
    }
    return (<BaseConfiglyComponent prop={props.prop} render={renderDropdown} />);
}

const ConfiglyContext = React.createContext({apiKey: null})

export {ConfiglyText, ConfiglyDropdown, ConfiglyContext, ConfiglyComponent as default};