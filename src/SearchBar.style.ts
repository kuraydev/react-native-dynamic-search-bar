import { ViewStyle, ImageStyle, TextStyle, StyleSheet } from "react-native";

interface Style {
  searchContainer: ViewStyle;
  searchIconImageStyle: ImageStyle;
  clearIconImageStyle: ImageStyle;
  clearIconContainer: ViewStyle;
  spinnerContainer: ViewStyle;
}
export const _container = (darkMode: boolean): ViewStyle => ({
  height: 40,
  width: "90%",
  borderRadius: 12,
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: darkMode ? "#19191a" : "#fdfdfd",
  shadowColor: darkMode ? "#19191a" : "#757575",
  shadowRadius: 8,
  shadowOpacity: 0.3,
  shadowOffset: {
    width: 0,
    height: 3,
  },
});

export const _textInputStyle = (darkMode: boolean): TextStyle => ({
  width: "80%",
  marginLeft: 12,
  color: darkMode ? "#fdfdfd" : "#19191a",
});

export default StyleSheet.create<Style>({
  searchContainer: {
    marginLeft: 12,
  },
  searchIconImageStyle: {
    width: 18,
    height: 18,
  },
  clearIconImageStyle: {
    width: 15,
    height: 15,
  },
  clearIconContainer: {
    marginRight: 12,
    marginLeft: "auto",
  },
  spinnerContainer: {
    marginLeft: 12,
  },
});
