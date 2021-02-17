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
    var _a = React.useState(null), configValue = _a[0], setConfigValue = _a[1];
    var onComplete = function (data) { return setConfigValue(data); };
    return function (key) {
        loadConfiglyData(key, config.apiKey, onComplete);
        return configValue;
    };
}
function BaseConfiglyComponent(props) {
    var _a = React.useState(null), value = _a[0], setValue = _a[1];
    var _b = React.useState(false), loaded = _b[0], setLoaded = _b[1];
    var config = React.useContext(ConfiglyContext);
    var _c = React.useState(false), requestInProgress = _c[0], setRequestInProgress = _c[1];
    var emptyValue = value === null || value === undefined;
    React.useEffect(function () {
        if (!requestInProgress && !loaded) {
            loadConfiglyData(props.prop, config.apiKey, function (value) { setValue(value); setLoaded(true); setRequestInProgress(false); });
            setRequestInProgress(true);
        }
    }, [requestInProgress, value, props.prop]);
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
            return React__default['default'].createElement("option", { value: key }, value[key]);
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
