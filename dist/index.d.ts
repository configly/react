import React from 'react';
interface props {
    prop: string;
    render: (value: string) => JSX.Element;
}
declare function ConfiglyComponent(props: props): JSX.Element;
declare function ConfiglyText(props: props): JSX.Element;
declare function ConfiglyDropdown(props: props): JSX.Element;
declare const ConfiglyContext: React.Context<{
    apiKey: null;
}>;
export { ConfiglyText, ConfiglyDropdown, ConfiglyContext, ConfiglyComponent as default };
