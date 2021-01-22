# Configly React Library
> The React library for [Configly](https://www.config.ly): the modern config/static data key/value store.

![npm](https://img.shields.io/npm/v/configly-react)
![GitHub](https://img.shields.io/github/license/configly/react)

Table of Contents
=================

  * [What is Configly?](#what-is-configly)
     * [Core Features](#core-features)
  * [Getting Started](#getting-started)
     * [Get your API Key](#get-your-api-key)
     * [Library installation](#library-installation)
  * [Usage](#usage)
  * [Example](#example)
  * [License](#license)


## What is Configly?

[Configly](https://www.config.ly) is the place software developers put their static / config data&mdash;like
 copy, styling, and minor configuration values.
They can then update that data directly from [https://www.config.ly](https://www.config.ly/)
without having to wait for a deploy process / app store review. Their app or webapp receives the data near instantly.
Non-technical folks themselves can publish changes freeing developers to focus on hard software problems and not copy tweaks.

On the backend, [Configly](https://www.config.ly) provides a read-optimized static-data key/value store built
with the aim of being low-latency, and high-availability. The client libraries are made to be dead-simple, lean, and efficient 
(via enhancements like caching). There is a fancy [web UI called the Configulator](https://config.ly/config)
for setting and updating the configs as well as seeing things like change history. Configly is built for modern software development.

There are a host of other benefits to using Configly (
such as ensuring you do not have [data duplicated across clients](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), reducing load on your primary DB, and better tolerance for traffic spikes),
read more about the benefits at [Configly](config.ly).

### Core Features

- API to fetch Strings, JSON Blobs (arrays and objects), Booleans, and Numbers from the Configly backend
- [Web interface](https://www.config.ly/config) for modifying these values without having to deploy code (we call our beloved web interface _the Configulator_).
- High availability, high-throughput, low-latency backend.
- Smart caching on the client libraries to minimize server requests.
- Client libraries available in an expanding amount of languages.

## Getting Started

### Get your API Key

You'll need a [Configly](https://www.config.ly) account. Registration is lightning quick&mdash;you can register via
visiting [https://www.config.ly/signup](https://www.config.ly/signup).

After signing up, you can grab your API Key from [https://www.config.ly/register](https://www.config.ly/register).
You'll need your API Key to setup the API below.

### Library installation

```sh
npm install configly-react
```

## Usage

You will need to specify your API key using a ConfiglyContext Provider. This should be done at the root of your app.
```js
  import {ConfiglyText, ConfiglyDropdown, ConfiglyContext} from 'configly-react';
```
```html
  <ConfiglyContext.Provider value={{apiKey: 'MY_API_KEY'}}>
    <div className="App"></div>
  </ConfiglyContext.Provider>
```

You can then use the predefined components to display text or dropdowns

```html
<ConfiglyText prop="hello"/></ConfiglyText>
<ConfiglyDropdown prop="hello-dropdown"/>
```

To render a custom component, you will pass a render function to the ConfiglyComponent. It takes a single argument, which is the value returned by Configly.

```js
function renderCustom(value) {
  return(<span>
    <input type="checkbox" checked={value} />
  </span>);
}
```
```html
<ConfiglyComponent prop="hello-custom" render={renderCustom} />
```

## Example

You can run the sample app located in the `demo` folder for a working example.

## License

This repository is published under the [MIT](LICENSE.md) license.
