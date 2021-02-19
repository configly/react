Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CONFIGLY_SERVER_URL = "https://api.config.ly/api/v1/value";
function loadConfiglyData(key, apiKey, onComplete) {
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(apiKey + ":"));
    fetch(CONFIGLY_SERVER_URL + "?keys[]=" + key, { method: 'GET', headers: headers })
        .then(function (res) { return res.json(); })
        .then(function (result) { var _a; return onComplete((_a = result.data[key]) === null || _a === void 0 ? void 0 : _a.value); }, function (error) { console.log(error); });
}
function useConfigly() {
    var config = React.useContext(ConfiglyContext);
    var _a = React.useState(null), value = _a[0], setValue = _a[1];
    var _b = React.useState(false), requestInProgress = _b[0], setRequestInProgress = _b[1];
    var _c = React.useState(false), loaded = _c[0], setLoaded = _c[1];
    var onComplete = function (data) {
        setLoaded(true);
        setRequestInProgress(false);
        setValue(data);
    };
    var loadConfig = function (key) {
        if (!requestInProgress && !loaded) {
            loadConfiglyData(key, config.apiKey, onComplete);
            setRequestInProgress(true);
        }
    };
    return { loadConfig: loadConfig, value: value, requestInProgress: requestInProgress, loaded: loaded };
}
function BaseConfiglyComponent(props) {
    var _a = useConfigly(), loadConfig = _a.loadConfig, value = _a.value, loaded = _a.loaded;
    var emptyValue = value === null || value === undefined;
    loadConfig(props.prop);
    if (!loaded && !props.default) {
        return (React__default['default'].createElement(React__default['default'].Fragment, null, "LOADING..."));
    }
    else if ((!loaded || emptyValue) && props.default && props.render) {
        return (props.render(props.default));
    }
    else if (loaded && props.render && !emptyValue) {
        return (props.render(value || ''));
    }
    else {
        return (React__default['default'].createElement(React__default['default'].Fragment, null));
    }
}
function ConfiglyComponent(props) {
    return (React__default['default'].createElement(BaseConfiglyComponent, { prop: props.prop, render: props.render, default: props.default }));
}
function ConfiglyText(props) {
    return (React__default['default'].createElement(BaseConfiglyComponent, { prop: props.prop, render: function (value) { return (React__default['default'].createElement("span", null, value)); }, default: props.default }));
}
function ConfiglyDropdown(props) {
    var renderDropdown = function (value) {
        var options = Object.keys(value).map(function (key) {
            return React__default['default'].createElement("option", { key: key, value: key }, value[key]);
        });
        return (React__default['default'].createElement("select", null, options));
    };
    return (React__default['default'].createElement(BaseConfiglyComponent, { prop: props.prop, render: renderDropdown, default: props.default }));
}
var ConfiglyContext = React__default['default'].createContext({ apiKey: null });

exports.ConfiglyContext = ConfiglyContext;
exports.ConfiglyDropdown = ConfiglyDropdown;
exports.ConfiglyText = ConfiglyText;
exports.default = ConfiglyComponent;
exports.useConfigly = useConfigly;
//# sourceMappingURL=index.js.map
