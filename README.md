<img alt="React Native Dynamic Search Bar" src="assets/logo.png" width="1050"/>

[![Battle Tested ✅](https://img.shields.io/badge/-Battle--Tested%20%E2%9C%85-03666e?style=for-the-badge)](https://github.com/kuraydev/react-native-dynamic-search-bar)
[![Fully customizable Dynamic Search Bar for React Native](https://img.shields.io/badge/-Fully%20customizable%20Dynamic%20Search%20Bar%20for%20React%20Native-lightgrey?style=for-the-badge)](https://github.com/kuraydev/react-native-dynamic-search-bar)

[![npm version](https://img.shields.io/npm/v/react-native-dynamic-search-bar.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-dynamic-search-bar)
[![npm](https://img.shields.io/npm/dt/react-native-dynamic-search-bar.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-dynamic-search-bar)
![expo-compatible](https://img.shields.io/badge/Expo-compatible-9cf.svg?style=for-the-badge)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <a href="https://freakycoder.com/react-native-library-dynamic-search-bar-c03fea9fae36">
    <img alt="React Native Dynamic Search Bar" src="assets/Wordmark_Black.png"/>
  </a>
</p>

<table>
  <tr>
    <td align="center">
      <img alt="React Native Dynamic Search Bar" src="assets/Screenshots/RN-Dynamic-SearchBar.gif" />
    </td>
    <td align="center">
    <img alt="React Native Dynamic Search Bar" src="assets/Screenshots/RN-Dynamic-SearchBar.png" />
    </td>
   </tr>
</table>

<h1 align="center"> Built-in Spinner </h1>
  <p align="center">
  <img alt="React Native Dynamic Search Bar" src="assets/Screenshots/RN-Dynamic-Search-Bar-Spinner.gif" />
</p>

A fully customizable, dynamic and animated **Search Bar** for React Native with
dark-mode support, a clearable input, custom icons, and an optional built-in
loading spinner. Pure JavaScript — works with the **New Architecture** and with
**Expo**.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [TypeScript](#typescript)
- [Imperative ref API](#imperative-ref-api)
- [Loading spinner](#loading-spinner)
- [Props](#props)
- [New Architecture & Expo](#new-architecture--expo)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Author](#author)
- [License](#license)

## Features

- 🎨 Fully customizable — styles, icons, colors, and your own `ImageComponent`
- 🌙 Built-in dark mode
- 🧹 Clearable input with a dedicated clear button
- ⏳ Optional loading spinner (built-in or bring your own)
- ⌨️ Inherits all of React Native's `TextInputProps`
- 🧭 Imperative `ref` API: `focus()`, `blur()`, `clear()`, `getTextInput()`
- 🧩 TypeScript types included
- 🚀 New Architecture compatible (pure JS, no native module in the package)

## Installation

```bash
npm install react-native-dynamic-search-bar @freakycoder/react-native-bounceable
```

or with yarn:

```bash
yarn add react-native-dynamic-search-bar @freakycoder/react-native-bounceable
```

### Optional: built-in spinner

The built-in spinner is powered by the native module
[`react-native-spinkit`](https://github.com/maxs15/react-native-spinkit), which
is now an **optional** peer dependency. Install it **only** if you want the
default spinner and are not passing your own `spinnerComponent`:

```bash
npm install react-native-spinkit
cd ios && pod install
```

> On **Expo Go** or the **New Architecture**, prefer a JS-only spinner via the
> [`spinnerComponent`](#loading-spinner) prop (e.g.
> [`react-native-animated-spinkit`](https://github.com/zeptodev/react-native-animated-spinkit))
> so you don't need any native module.

## Usage

```tsx
import React from "react";
import SearchBar from "react-native-dynamic-search-bar";

export default function App() {
  return (
    <SearchBar
      placeholder="Search here"
      onPress={() => console.log("onPress")}
      onChangeText={(text) => console.log(text)}
    />
  );
}
```

### Filtering a list

```tsx
import React, { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";

export default function Example({ data }) {
  const [query, setQuery] = useState("");

  return (
    <SearchBar
      darkMode
      placeholder="Search any item..."
      onChangeText={setQuery}
      onSearchPress={() => console.log("Search:", query)}
      onClearPress={() => setQuery("")}
    />
  );
}
```

## TypeScript

The package ships its own types. You can import the prop and ref types directly:

```tsx
import SearchBar, {
  ISearchBarProps,
  SearchBarHandle,
  SpinnerType,
} from "react-native-dynamic-search-bar";
```

## Imperative ref API

Attach a `ref` to control the input imperatively (resolves the long-standing
"how do I read the text / focus the bar" question):

```tsx
import React, { useRef } from "react";
import SearchBar, { SearchBarHandle } from "react-native-dynamic-search-bar";

export default function Example() {
  const searchRef = useRef<SearchBarHandle>(null);

  return (
    <SearchBar
      ref={searchRef}
      onSearchPress={() => searchRef.current?.focus()}
      onClearPress={() => searchRef.current?.clear()}
    />
  );
}
```

| Method           | Description                                  |
| ---------------- | -------------------------------------------- |
| `focus()`        | Focus the underlying `TextInput`             |
| `blur()`         | Blur the underlying `TextInput`              |
| `clear()`        | Clear the input text                         |
| `getTextInput()` | Get the underlying `TextInput` instance/ref  |

## Loading spinner

Toggle the built-in spinner with `spinnerVisibility`. When visible, it replaces
the search icon:

```tsx
const [loading, setLoading] = useState(false);

<SearchBar
  spinnerVisibility={loading}
  spinnerType="FadingCircleAlt"
  spinnerSize={15}
  spinnerColor="#fdfdfd"
  onChangeText={async (text) => {
    setLoading(true);
    await search(text);
    setLoading(false);
  }}
/>;
```

Prefer a JS-only spinner (no native dependency)? Pass your own component:

```tsx
import { FadingCircleAlt } from "react-native-animated-spinkit";

<SearchBar
  spinnerVisibility={loading}
  spinnerComponent={<FadingCircleAlt size={15} color="#fdfdfd" />}
/>;
```

## Props

The component also accepts **all** React Native [`TextInputProps`](https://reactnative.dev/docs/textinput#props)
(e.g. `value`, `autoFocus`, `returnKeyType`, `onSubmitEditing`, `keyboardType`)
and [`TouchableWithoutFeedbackProps`](https://reactnative.dev/docs/touchablewithoutfeedback).

| Property                | Type                  | Default             | Description                                                       |
| ----------------------- | --------------------- | ------------------- | ----------------------------------------------------------------- |
| `style`                 | `ViewStyle`           | default             | Style for the main search container                               |
| `darkMode`              | `boolean`             | `false`             | Enable dark mode                                                  |
| `placeholder`           | `string`              | `"Search here..."`  | Placeholder text                                                  |
| `placeholderTextColor`  | `string`              | theme-based         | Placeholder text color (defaults to the dark/light theme color)   |
| `onChangeText`          | `(text) => void`      | —                   | Called when the input text changes                                |
| `onPress`               | `() => void`          | —                   | Called when the bar is pressed (also focuses the input)           |
| `onSearchPress`         | `() => void`          | —                   | Called when the **search** icon is pressed                        |
| `onClearPress`          | `() => void`          | —                   | Called when the **clear** icon is pressed (also clears the input) |
| `onBlur`                | `() => void`          | —                   | Called when the input blurs                                       |
| `onFocus`               | `() => void`          | —                   | Called when the input focuses                                     |
| `textInputStyle`        | `TextStyle`           | default             | Style for the `TextInput`                                         |
| `searchIconImageStyle`  | `ImageStyle`          | default             | Style for the search icon image                                   |
| `clearIconImageStyle`   | `ImageStyle`          | default             | Style for the clear icon image                                    |
| `ImageComponent`        | `ComponentType`       | RN `Image`          | Custom Image component (e.g. `react-native-fast-image`)           |
| `searchIconComponent`   | `ReactNode`           | default icon        | Custom node for the **search** icon                               |
| `clearIconComponent`    | `ReactNode`           | default icon        | Custom node for the **clear** icon                                |
| `searchIconImageSource` | `ImageSourcePropType` | default asset       | Source for the search icon image                                  |
| `clearIconImageSource`  | `ImageSourcePropType` | default asset       | Source for the clear icon image                                   |
| `spinnerVisibility`     | `boolean`             | `false`             | Show the spinner (replaces the search icon)                       |
| `spinnerType`           | `SpinnerType`         | `"FadingCircleAlt"` | Built-in spinkit spinner type                                     |
| `spinnerSize`           | `number`              | `15`                | Spinner size                                                      |
| `spinnerColor`          | `string`              | theme-based         | Spinner color                                                     |
| `spinnerComponent`      | `ReactNode`           | —                   | Render a custom spinner instead of the built-in one              |

## New Architecture & Expo

This package contains **no native code** of its own — it's a pure-JavaScript
component, so it works with the **New Architecture (Fabric/TurboModules)** and
with **Expo** out of the box.

The only native dependency is the **optional** built-in spinner
(`react-native-spinkit`). If you target Expo Go or want to avoid native modules
entirely, skip installing it and pass your own JS spinner via
[`spinnerComponent`](#loading-spinner).

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and
make sure `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`
all pass before opening a pull request.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full release history and migration
notes (including the v3 changes around the optional spinner and the
`onSubmitEditing` fix).

## Author

FreakyCoder (Kuray Ogun) — kurayogun@gmail.com · [github.com/kuraydev](https://github.com/kuraydev)

## License

React Native Dynamic Search Bar is available under the MIT license. See the
[LICENSE](./LICENSE) file for more info.
