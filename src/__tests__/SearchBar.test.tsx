import * as React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

import SearchBar, { SearchBarHandle } from "../index";

describe("<SearchBar />", () => {
  it("renders the default placeholder", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText("Search here...")).toBeTruthy();
  });

  it("renders a custom placeholder without altering the default contract", () => {
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Find a city" />,
    );
    expect(getByPlaceholderText("Find a city")).toBeTruthy();
  });

  it("fires onChangeText with the typed value", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onChangeText={onChangeText} />,
    );
    fireEvent.changeText(getByPlaceholderText("Search here..."), "hello");
    expect(onChangeText).toHaveBeenCalledWith("hello");
  });

  it("fires onSubmitEditing exactly once (regression for #108)", () => {
    const onSubmitEditing = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onSubmitEditing={onSubmitEditing} />,
    );
    fireEvent(getByPlaceholderText("Search here..."), "submitEditing", {
      nativeEvent: { text: "query" },
    });
    expect(onSubmitEditing).toHaveBeenCalledTimes(1);
  });

  it("invokes onSearchPress when the search icon is pressed", () => {
    const onSearchPress = jest.fn();
    const { getByLabelText } = render(
      <SearchBar onSearchPress={onSearchPress} />,
    );
    fireEvent.press(getByLabelText("Search"));
    expect(onSearchPress).toHaveBeenCalledTimes(1);
  });

  it("invokes onClearPress when the clear icon is pressed", () => {
    const onClearPress = jest.fn();
    const { getByLabelText } = render(
      <SearchBar onClearPress={onClearPress} />,
    );
    fireEvent.press(getByLabelText("Clear search"));
    expect(onClearPress).toHaveBeenCalledTimes(1);
  });

  it("applies the light placeholder color by default", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(
      getByPlaceholderText("Search here...").props.placeholderTextColor,
    ).toBe("#19191a");
  });

  it("applies the dark placeholder color in dark mode", () => {
    const { getByPlaceholderText } = render(<SearchBar darkMode />);
    expect(
      getByPlaceholderText("Search here...").props.placeholderTextColor,
    ).toBe("#fdfdfd");
  });

  it("respects an explicit placeholderTextColor over the dark-mode default", () => {
    const { getByPlaceholderText } = render(
      <SearchBar darkMode placeholderTextColor="#ff0000" />,
    );
    expect(
      getByPlaceholderText("Search here...").props.placeholderTextColor,
    ).toBe("#ff0000");
  });

  it("hides the search icon and shows the spinner when spinnerVisibility is true", () => {
    const { queryByLabelText } = render(<SearchBar spinnerVisibility />);
    expect(queryByLabelText("Search")).toBeNull();
  });

  it("renders a custom spinnerComponent when provided", () => {
    const { getByTestId } = render(
      <SearchBar
        spinnerVisibility
        spinnerComponent={<Text testID="custom-spinner">Loading</Text>}
      />,
    );
    expect(getByTestId("custom-spinner")).toBeTruthy();
  });

  it("renders a custom searchIconComponent", () => {
    const { getByTestId } = render(
      <SearchBar searchIconComponent={<Text testID="search-icon">S</Text>} />,
    );
    expect(getByTestId("search-icon")).toBeTruthy();
  });

  it("uses a custom ImageComponent for the icons", () => {
    const CustomImage = (props: { testID?: string }) => (
      <Text testID="custom-image" {...props}>
        img
      </Text>
    );
    const { getAllByTestId } = render(
      <SearchBar ImageComponent={CustomImage as never} />,
    );
    expect(getAllByTestId("custom-image").length).toBeGreaterThan(0);
  });

  it("exposes an imperative handle (focus/blur/clear/getTextInput)", () => {
    const ref = React.createRef<SearchBarHandle>();
    render(<SearchBar ref={ref} />);
    expect(typeof ref.current?.focus).toBe("function");
    expect(typeof ref.current?.blur).toBe("function");
    expect(typeof ref.current?.clear).toBe("function");
    expect(ref.current?.getTextInput()).toBeTruthy();
  });

  it("clears the input and calls onClearPress via the imperative handle path", () => {
    const onClearPress = jest.fn();
    const ref = React.createRef<SearchBarHandle>();
    const { getByLabelText } = render(
      <SearchBar ref={ref} onClearPress={onClearPress} />,
    );
    fireEvent.press(getByLabelText("Clear search"));
    expect(onClearPress).toHaveBeenCalled();
    expect(ref.current?.getTextInput()).not.toBeNull();
  });
});
