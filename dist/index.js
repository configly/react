Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CONFIGLY_SERVER_URL = "http://configly.herokuapp.com/api/v1/value";
var CONFIGLY_API_KEY = 'hq0t7YiT3NwEnoknH4fp6EHL66pOcDjv';
function loadConfiglyData(key, onComplete) {
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(CONFIGLY_API_KEY + ":"));
    fetch(CONFIGLY_SERVER_URL + "?keys[]=" + key, { method: 'GET', headers: headers })
        .then(function (res) { return res.json(); })
        .then(function (result) { return onComplete(result.data[key].value); }, function (error) { console.log(error); });
}
function BaseConfiglyComponent(props) {
    var _a = React.useState(null), value = _a[0], setValue = _a[1];
    var _b = React.useState(false), requestInProgress = _b[0], setRequestInProgress = _b[1];
    React.useEffect(function () {
        if (!requestInProgress && !value) {
            loadConfiglyData(props.prop, function (value) { setValue(value); setRequestInProgress(false); });
            setRequestInProgress(true);
        }
    }, [requestInProgress, value, props.prop]);
    if (value == null) {
        return (React__default['default'].createElement("span", null, "Loading..."));
    }
    return (props.render(value || ''));
}
function ConfiglyComponent(props) {
    return (React__default['default'].createElement(BaseConfiglyComponent, { prop: props.prop, render: props.render }));
}
function ConfiglyText(props) {
    return (React__default['default'].createElement(BaseConfiglyComponent, { prop: props.prop, render: function (value) { return (React__default['default'].createElement("span", null, value)); } }));
}
function ConfiglyDropdown(props) {
    var renderDropdown = function (value) {
        var options = Object.keys(value).map(function (key) {
            return React__default['default'].createElement("option", { value: key }, value[key]);
        });
        return (React__default['default'].createElement("select", null, options));
    };
    return (React__default['default'].createElement(BaseConfiglyComponent, { prop: props.prop, render: renderDropdown }));
}

exports.ConfiglyDropdown = ConfiglyDropdown;
exports.ConfiglyText = ConfiglyText;
exports.default = ConfiglyComponent;
//# sourceMappingURL=index.js.map
