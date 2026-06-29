# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

> **Recommended next release: `3.0.0` (major).** This release modernizes the
> build, makes the native spinner optional, and fixes a duplicate event bug.
> See the migration notes below.

### Added

- Function-component rewrite with `forwardRef` + `useImperativeHandle`. A `ref`
  now exposes `focus()`, `blur()`, `clear()`, and `getTextInput()` so you can
  drive the input imperatively and read its value (closes #97).
- New `spinnerComponent` prop to supply a custom (JS-only) spinner — ideal for
  Expo / New Architecture apps that avoid native modules (e.g.
  `react-native-animated-spinkit`).
- Accessibility roles/labels on the container, search icon (`Search`), clear
  icon (`Clear search`), and a `search` role on the input.
- Real unit test suite (Jest + React Native Testing Library).
- GitHub Actions CI (lint, typecheck, test, build on a Node 18/20/22 matrix),
  issue/PR templates, and a `CONTRIBUTING.md`.
- `react` and `react-native` are now declared as `peerDependencies`.
- ESM + CommonJS + TypeScript build outputs via `react-native-builder-bob`,
  with a proper `exports` map, `module`, `react-native`, `sideEffects`, and a
  `files` allowlist.

### Changed

- **BREAKING:** `react-native-spinkit` is now an **optional** peer dependency.
  It is required lazily, so apps that never use the built-in spinner (or run on
  Expo Go) no longer fail to build (closes #98, #102). Install it explicitly
  only if you use the built-in spinner with no `spinnerComponent`.
- **BREAKING:** Build output moved from `build/dist/SearchBar.js` to
  `react-native-builder-bob` output under `lib/`. The default import
  (`import SearchBar from "react-native-dynamic-search-bar"`) is unchanged.
- Source moved from `lib/` to `src/`; a named export `{ SearchBar }` and
  exported types (`ISearchBarProps`, `ISource`, `SpinnerType`,
  `SearchBarHandle`) are now available.

### Fixed

- **BREAKING (behavioral):** `onSubmitEditing` (and other `TextInputProps`) no
  longer fire twice. Props are now split explicitly — touchable props go to the
  outer container, `TextInputProps` go to the `TextInput` (closes #108).
- Replaced the dead `tslint` lint script with ESLint 9 flat config; fixed the
  `format`/`version` scripts that targeted a non-existent `src/` glob.
- Tightened types: removed `any` from `ImageComponent`/`spinnerType`, typed
  `spinnerType` as a `SpinnerType` union, replaced deprecated `React.ReactChild`
  with `React.ReactNode`, and aligned `ISource` with `ImageSourcePropType`.

### Removed

- Dead/abandoned devDependencies: `tslint` (script only),
  `react-native-typescript-transformer`, `@react-native-community/eslint-config`,
  `eslint-config-airbnb`, `@types/react-native` (RN ships its own types),
  `npm-post-install`, `prettier-format`.

## [2.0.0](https://github.com/kuraydev/react-native-dynamic-search-bar/tree/2.0.0) (2020-10-18)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.3.1...2.0.0)

**Merged pull requests:**

- Bump typescript from 3.9.7 to 4.0.2 [\#37](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/37) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

## [1.3.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.3.1) (2020-08-11)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.2.1...1.3.1)

**Closed issues:**

- Just Doesn't Work And Contains NODE\_MODULES [\#32](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/32)
- Documentation: Missing Props [\#27](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/27)

**Merged pull requests:**

- Bump lodash from 4.17.15 to 4.17.19 in /example [\#36](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/36) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump @types/react-native from 0.62.18 to 0.63.0 [\#35](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/35) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Bump react-native-vector-icons from 6.7.0 to 7.0.0 [\#34](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/34) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- feat: add documentation to missing properties of internal components that are [\#33](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/33) ([tiagostutz](https://github.com/tiagostutz))
- Bump react-native-dynamic-vector-icons from 0.2.2 to 1.0.0 [\#31](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/31) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

## [1.2.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.2.1) (2020-06-21)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.2.0...1.2.1)

## [1.2.0](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.2.0) (2020-05-29)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.1.0...1.2.0)

## [1.1.0](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.1.0) (2020-05-25)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.0.4...1.1.0)

## [1.0.4](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.0.4) (2020-05-24)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.0.2...1.0.4)

**Fixed bugs:**

- shadowStyle prop is not passed through [\#26](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/26)

**Closed issues:**

- NPM error trying to install expo version [\#30](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/30)
- Add instructions on how to run the Example [\#28](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/28)

**Merged pull requests:**

- Adds README with instructions on how to run the example [\#29](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/29) ([tiagostutz](https://github.com/tiagostutz))

## [1.0.2](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.0.2) (2020-04-23)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.0.1...1.0.2)

**Fixed bugs:**

- Expo version is not found [\#25](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/25)

**Merged pull requests:**

- Bump @types/react-native from 0.60.31 to 0.62.2 [\#24](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/24) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

## [1.0.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.0.1) (2020-04-11)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/1.0.0...1.0.1)

## [1.0.0](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/1.0.0) (2020-04-11)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.3.1...1.0.0)

**Fixed bugs:**

- \[Android\] Error while updating property 'backgroundColor' in shadow node of type: AndroidTextInpout [\#15](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/15)

**Closed issues:**

- Missing backgroundColor and fontFamily from configuration props [\#22](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/22)
- Module not found: Can't resolve '@expo/vector-icons/Fontisto'  [\#19](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/19)
- Expo install method is not working [\#18](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/18)

**Merged pull requests:**

- Typescript is here with full refactory 🥳 [\#23](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/23) ([WrathChaos](https://github.com/WrathChaos))
- Bump acorn from 5.7.3 to 5.7.4 in /example [\#20](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/20) ([dependabot[bot]](https://github.com/apps/dependabot))
- Revert "Updating Readme" [\#17](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/17) ([WrathChaos](https://github.com/WrathChaos))
- Updating Readme [\#16](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/16) ([abhishekdewan101](https://github.com/abhishekdewan101))

## [0.3.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.3.1) (2019-12-24)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.3.0...0.3.1)

**Implemented enhancements:**

- Adding onSubmitEditing listener [\#14](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/14) ([abhishekdewan101](https://github.com/abhishekdewan101))

**Closed issues:**

- How do you style the actual searchBar, I want to increase the height of the search bar. I don't see a prop like containerStyle  [\#12](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/12)
- react-native-iphone-x-helper module not found [\#8](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/8)

## [0.3.0](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.3.0) (2019-12-06)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.2.1...0.3.0)

**Closed issues:**

- Request To Add Product in Start React [\#10](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/10)

## [0.2.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.2.1) (2019-09-02)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.2.0...0.2.1)

**Implemented enhancements:**

- Extend length of Textfield to full length of search box...? [\#4](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/4)
- Make the extra margin on iPhone X devices optional [\#9](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/9) ([showcasecode](https://github.com/showcasecode))

**Merged pull requests:**

- Bump mixin-deep from 1.3.1 to 1.3.2 in /example [\#7](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/7) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump eslint-utils from 1.3.1 to 1.4.2 in /example [\#6](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/6) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump lodash from 4.17.11 to 4.17.14 in /example [\#5](https://github.com/WrathChaos/react-native-dynamic-search-bar/pull/5) ([dependabot[bot]](https://github.com/apps/dependabot))

## [0.2.0](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.2.0) (2019-07-09)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.1.11...0.2.0)

## [0.1.11](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.1.11) (2019-04-20)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.1.1...0.1.11)

**Closed issues:**

- on Android, there is no animation [\#1](https://github.com/WrathChaos/react-native-dynamic-search-bar/issues/1)

## [0.1.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.1.1) (2019-04-18)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.0.13...0.1.1)

## [0.0.13](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.0.13) (2019-04-02)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.0.12...0.0.13)

## [0.0.12](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.0.12) (2019-04-02)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.0.11...0.0.12)

## [0.0.11](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.0.11) (2019-04-02)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/0.0.1...0.0.11)

## [0.0.1](https://github.com/WrathChaos/react-native-dynamic-search-bar/tree/0.0.1) (2019-03-31)

[Full Changelog](https://github.com/WrathChaos/react-native-dynamic-search-bar/compare/53f0e9276ddb6a7edf52c5c70918b51d4c6f36b1...0.0.1)



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
