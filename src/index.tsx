import React, { useState, useContext } from 'react';

const CONFIGLY_SERVER_URL = "https://api.config.ly/api/v1/value";

interface props {
    prop: string,
    render?: (value: string) => JSX.Element,
    default?: any
}

function loadConfiglyData(key: string, apiKey: string | null, onComplete: (data: string) => any) {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(`${apiKey}:`));
    fetch(`${CONFIGLY_SERVER_URL}?keys[]=${key}`, {method: 'GET', headers})
      .then(res => res.json())
      .then((result) => onComplete(result.data[key]?.value), (error) => {console.log(error)});
}

function useConfigly() {
    const config = useContext(ConfiglyContext);
    const [value, setValue] = useState(null);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const onComplete = (data: any) => {
        setLoaded(true);
        setRequestInProgress(false);
        setValue(data);
    }
    const loadConfig = (key: string) => {
        if (!requestInProgress && !loaded) {
            loadConfiglyData(key, config.apiKey, onComplete);
            setRequestInProgress(true);
        }
    }
    return { loadConfig, value, requestInProgress, loaded };
}

function BaseConfiglyComponent(props: props) {
    const { loadConfig, value, loaded } = useConfigly();
    const emptyValue = value === null || value === undefined;

    loadConfig(props.prop);

    if (!loaded && !props.default) {
        return (<React.Fragment>LOADING...</React.Fragment>)
    } else if ((!loaded || emptyValue) && props.default && props.render) {
        return (props.render(props.default));
    } else if (loaded && props.render && !emptyValue) {
        return(props.render(value || ''));
    } else {
        return (<React.Fragment />);
    }
}

function ConfiglyComponent(props: props) {
    return (<BaseConfiglyComponent prop={props.prop} render={props.render} default={props.default} />);
}

function ConfiglyText(props: props) {
    return (<BaseConfiglyComponent prop={props.prop} render={(value: string) => { return (<span>{value}</span>) }} default={props.default} />);
}

function ConfiglyDropdown(props: props) {
    const renderDropdown =(value: string) => {
        const options = Object.keys(value).map((key) =>
            <option key={key} value={key}>{value[key]}</option>
        );

        return (<select>{options}</select>);
    }
    return (<BaseConfiglyComponent prop={props.prop} render={renderDropdown} default={props.default}/>);
}

interface ConfiglyContextType {
    apiKey: string | null
}

const ConfiglyContext = React.createContext<ConfiglyContextType>({apiKey: null})

export {ConfiglyText, ConfiglyDropdown, ConfiglyContext, useConfigly, ConfiglyComponent as default};