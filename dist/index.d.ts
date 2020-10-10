/// <reference types="react" />
interface props {
    prop: string;
    render: (value: string) => void;
}
declare function ConfiglyComponent(props: props): void | JSX.Element;
declare function ConfiglyText(props: props): void | JSX.Element;
declare function ConfiglyDropdown(props: props): void | JSX.Element;
export { ConfiglyText, ConfiglyDropdown, ConfiglyComponent as default };
