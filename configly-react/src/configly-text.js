import React, { useEffect, useState } from 'react';

const CONFIGLY_SERVER_URL = "http://configly.herokuapp.com/api/v1/value";
const CONFIGLY_API_KEY = 'yikes';

function loadConfiglyData(key, onComplete) {
    fetch(`${CONFIGLY_SERVER_URL}?keys[]=${key}&apiKey=${CONFIGLY_API_KEY}`, {method: 'GET'})
      .then(res => res.json())
      .then((result) => onComplete(result.data[key].value), (error) => {console.log(error)});
}

function BaseConfiglyComponent(props, renderFunction) {
    const [value, setValue] = useState(null);
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        if (!requestInProgress && !value) {
            loadConfiglyData(props.prop, (value) => {setValue(value); setRequestInProgress(false);});
            setRequestInProgress(true);
        }
    }, [requestInProgress, value, props.prop]);

    if (value === null) {
        return(<span>Loading...</span>);
    } else { 
        return(renderFunction(value));
    }
}

function ConfiglyComponent(props) {
    const {render} = props;
    return BaseConfiglyComponent(props, (value) => render(value));
}

function ConfiglyText(props) {
    return BaseConfiglyComponent(props, (value) => {return(<span>{value}</span>)});
}

function ConfiglyDropdown(props) {
    return BaseConfiglyComponent(props, (value) => {
        const options = Object.keys(value).map((key) =>
            <option value={key}>{value[key]}</option>
        );

        return (<select>
           {options}         
        </select>);
    })
}

export {ConfiglyText, ConfiglyDropdown, ConfiglyComponent as default};