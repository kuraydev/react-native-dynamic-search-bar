import * as fs from "fs";
import * as path from "path";

import * as React from "react";
import { Platform, Text } from "react-native";
import { render } from "@testing-library/react-native";

import SearchBar from "../index";

/**
 * Regression coverage for #98 / #102: a project running on react-native-web
 * (or Expo) without the optional `react-native-spinkit` native module must be
 * able to bundle and render the search bar — including with the built-in
 * spinner visible — without crashing.
 */
describe("<SearchBar /> on react-native-web", () => {
  const originalOS = Platform.OS;

  afterEach(() => {
    (Platform as { OS: typeof Platform.OS }).OS = originalOS;
  });

  it("never statically imports the native react-native-spinkit module", () => {
    const source = fs.readFileSync(
      path.join(__dirname, "..", "SearchBar.tsx"),
      "utf8",
    );
    // No top-level `import ... from "react-native-spinkit"` (a static import
    // would be eagerly resolved by web bundlers and crash when absent).
    expect(source).not.toMatch(/^\s*import[^\n]*["']react-native-spinkit["']/m);
  });

  it("renders on web with the search icon when the spinner is hidden", () => {
    (Platform as { OS: string }).OS = "web";
    const { getByPlaceholderText, getByLabelText } = render(<SearchBar />);
    expect(getByPlaceholderText("Search here...")).toBeTruthy();
    expect(getByLabelText("Search")).toBeTruthy();
  });

  it("renders on web without touching spinkit when the spinner is visible", () => {
    (Platform as { OS: string }).OS = "web";
    expect(() =>
      render(<SearchBar spinnerVisibility />),
    ).not.toThrow();
  });

  it("still honors a custom spinnerComponent on web", () => {
    (Platform as { OS: string }).OS = "web";
    const { getByTestId } = render(
      <SearchBar
        spinnerVisibility
        spinnerComponent={<Text testID="custom-web-spinner">Loading</Text>}
      />,
    );
    expect(getByTestId("custom-web-spinner")).toBeTruthy();
  });
});
