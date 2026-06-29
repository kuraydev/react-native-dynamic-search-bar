/* eslint-disable no-undef */
// `react-native-spinkit` is a native module with no JS implementation in the
// test environment. Mock it with a simple host component so the (optional)
// built-in spinner renders without a native binding.
jest.mock("react-native-spinkit", () => "Spinner");
