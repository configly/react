import React from 'react';
interface props {
    prop: string;
    render?: (value: string) => JSX.Element;
    default?: any;
}
declare function useConfigly(): {
    loadConfig: (key: string) => void;
    value: null;
    requestInProgress: boolean;
    loaded: boolean;
};
declare function ConfiglyComponent(props: props): JSX.Element;
declare function ConfiglyText(props: props): JSX.Element;
declare function ConfiglyDropdown(props: props): JSX.Element;
interface ConfiglyContextType {
    apiKey: string | null;
}
declare const ConfiglyContext: React.Context<ConfiglyContextType>;
export { ConfiglyText, ConfiglyDropdown, ConfiglyContext, useConfigly, ConfiglyComponent as default };
