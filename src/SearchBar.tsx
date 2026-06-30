import * as React from "react";
import {
  View,
  Image,
  Platform,
  TextInput,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleProp,
  Insets,
  ActivityIndicator,
  AccessibilityRole,
  ImageSourcePropType,
  TextInputProps,
  TouchableWithoutFeedbackProps,
} from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";

/**
 * `@freakycoder/react-native-bounceable` has shipped slightly different prop
 * shapes across its `0.2.x` (peer floor) and `1.x` releases. We type it locally
 * so this component compiles against any supported version while keeping the
 * historical `bounceEffect` prop at runtime (still honored on the `>=0.2.2`
 * peer range).
 */
type BounceableProps = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  bounceEffect?: number;
  bounceEffectIn?: number;
  bounceEffectOut?: number;
  onPress?: () => void;
  hitSlop?: Insets | number | null;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}>;

const Bounceable = RNBounceable as unknown as React.ComponentType<BounceableProps>;
/**
 * ? Local Imports
 */
import styles, { _container, _textInputStyle } from "./SearchBar.style";

const defaultSearchIcon = require("./local-assets/search-icon.png");
const whiteSearchIcon = require("./local-assets/search-icon-white.png");
const defaultClearIcon = require("./local-assets/clear-icon.png");
const whiteClearIcon = require("./local-assets/clear-icon-white.png");

type SpinKitComponent = React.ComponentType<{
  size?: number;
  type?: string;
  color?: string;
  isVisible?: boolean;
}>;

let cachedSpinKit: SpinKitComponent | null | undefined;

/**
 * `react-native-spinkit` is a native module and is declared as an *optional*
 * peer dependency. We never import it at module top: it is required lazily, on
 * demand, and only the first time the built-in spinner is actually rendered.
 *
 * On `react-native-web` / Expo web the native module simply does not exist, so
 * we short-circuit before the `require` ever runs — this keeps the web bundle
 * free of any spinkit reference and avoids a Metro/webpack resolution crash.
 * The `Platform.OS === "web"` guard is web-only, so the native code path
 * (require + cache) is byte-for-byte unchanged.
 */
function resolveSpinKit(): SpinKitComponent | null {
  if (Platform.OS === "web") {
    return null;
  }
  if (cachedSpinKit !== undefined) {
    return cachedSpinKit;
  }
  try {
    const mod = require("react-native-spinkit");
    cachedSpinKit = (mod && (mod.default || mod)) ?? null;
  } catch {
    cachedSpinKit = null;
  }
  return cachedSpinKit ?? null;
}

/**
 * The spinner type values accepted by `react-native-spinkit`.
 */
export type SpinnerType =
  | "CircleFlip"
  | "Bounce"
  | "Wave"
  | "WanderingCubes"
  | "Pulse"
  | "ChasingDots"
  | "ThreeBounce"
  | "Circle"
  | "9CubeGrid"
  | "WordPress"
  | "FadingCircle"
  | "FadingCircleAlt"
  | "Arc"
  | "ArcAlt";

export type ISource = ImageSourcePropType;

export interface ISearchBarProps
  extends Omit<TouchableWithoutFeedbackProps, "rejectResponderTermination">,
    TextInputProps {
  darkMode?: boolean;
  placeholder?: string;
  ImageComponent?: React.ComponentType<{
    source?: ImageSourcePropType;
    resizeMode?: string;
    style?: StyleProp<ImageStyle>;
  }>;
  spinnerType?: SpinnerType;
  spinnerSize?: number;
  spinnerColor?: string;
  spinnerVisibility?: boolean;
  /**
   * Render your own spinner instead of the built-in `react-native-spinkit`
   * one. Useful for Expo / New Architecture setups that avoid native modules
   * (e.g. `react-native-animated-spinkit`).
   */
  spinnerComponent?: React.ReactNode;
  placeholderTextColor?: string;
  searchIconComponent?: React.ReactNode;
  clearIconComponent?: React.ReactNode;
  searchIconImageSource?: ISource;
  clearIconImageSource?: ISource;
  style?: ViewStyle | Array<ViewStyle> | undefined;
  textInputStyle?: TextStyle | Array<TextStyle>;
  searchIconImageStyle?: ImageStyle | Array<ImageStyle>;
  clearIconImageStyle?: ImageStyle | Array<ImageStyle>;
  onBlur?: () => void;
  onFocus?: () => void;
  onPress?: () => void;
  onSearchPress?: () => void;
  onClearPress?: () => void;
}

/**
 * Imperative handle exposed via `ref`. Backwards compatible with the previous
 * class component, which surfaced the underlying `TextInput` through its
 * internal `inputRef`; `focus()` and `clear()` are now provided directly.
 */
export interface SearchBarHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  /** The underlying React Native `TextInput` instance. */
  getTextInput: () => TextInput | null;
}

const SearchBar = React.forwardRef<SearchBarHandle, ISearchBarProps>(
  (props, ref) => {
    const {
      style,
      onBlur,
      onFocus,
      onPress,
      darkMode = false,
      onSearchPress,
      onClearPress,
      textInputStyle,
      searchIconComponent,
      clearIconComponent,
      searchIconImageStyle,
      clearIconImageStyle,
      ImageComponent = Image,
      placeholder = "Search here...",
      placeholderTextColor,
      spinnerSize = 15,
      spinnerType = "FadingCircleAlt",
      spinnerColor = darkMode ? "#fdfdfd" : "#19191a",
      spinnerVisibility = false,
      spinnerComponent,
      searchIconImageSource = darkMode ? whiteSearchIcon : defaultSearchIcon,
      clearIconImageSource = darkMode ? whiteClearIcon : defaultClearIcon,
      // Touchable-only props consumed by the outer container.
      accessibilityLabel,
      accessibilityHint,
      hitSlop,
      // Everything else (the `TextInputProps`) is forwarded to the input only.
      ...textInputProps
    } = props;

    const inputRef = React.useRef<TextInput | null>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        clear: () => inputRef.current?.clear(),
        getTextInput: () => inputRef.current,
      }),
      [],
    );

    const handleSearchBarPress = React.useCallback(() => {
      inputRef.current?.focus();
      onPress?.();
    }, [onPress]);

    const handleOnClearPress = React.useCallback(() => {
      inputRef.current?.clear();
      onClearPress?.();
    }, [onClearPress]);

    const resolvedPlaceholderTextColor =
      placeholderTextColor ?? (darkMode ? "#fdfdfd" : "#19191a");

    const renderSpinner = () => {
      if (spinnerComponent) {
        return <View style={styles.spinnerContainer}>{spinnerComponent}</View>;
      }
      const SpinKit = resolveSpinKit();
      if (SpinKit) {
        return (
          <View style={styles.spinnerContainer}>
            <SpinKit
              size={spinnerSize}
              type={spinnerType}
              color={spinnerColor}
              isVisible={spinnerVisibility}
            />
          </View>
        );
      }
      /**
       * `react-native-spinkit` is unavailable — typically react-native-web /
       * Expo without the optional native module installed. Fall back to RN's
       * cross-platform `ActivityIndicator` so the spinner slot still renders
       * (and the bundle never crashes) instead of showing nothing.
       */
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator
            size="small"
            color={spinnerColor}
            animating={spinnerVisibility}
          />
        </View>
      );
    };

    const renderSearchIcon = () => (
      <Bounceable
        style={styles.searchContainer}
        accessibilityRole="button"
        accessibilityLabel="Search"
        onPress={onSearchPress}
      >
        {searchIconComponent || (
          <ImageComponent
            resizeMode="contain"
            source={searchIconImageSource}
            style={[styles.searchIconImageStyle, searchIconImageStyle]}
          />
        )}
      </Bounceable>
    );

    const renderTextInput = () => (
      <TextInput
        accessibilityRole="search"
        placeholderTextColor={resolvedPlaceholderTextColor}
        {...textInputProps}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={inputRef}
        style={[_textInputStyle(darkMode), textInputStyle]}
        placeholder={placeholder}
      />
    );

    const renderClearIcon = () => (
      <Bounceable
        bounceEffect={0.8}
        style={styles.clearIconContainer}
        accessibilityRole="button"
        accessibilityLabel="Clear search"
        onPress={handleOnClearPress}
      >
        {clearIconComponent || (
          <ImageComponent
            resizeMode="contain"
            source={clearIconImageSource}
            style={[styles.clearIconImageStyle, clearIconImageStyle]}
          />
        )}
      </Bounceable>
    );

    return (
      <Bounceable
        bounceEffect={0.97}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        hitSlop={hitSlop}
        style={[_container(darkMode), style]}
        onPress={handleSearchBarPress}
      >
        {spinnerVisibility ? renderSpinner() : renderSearchIcon()}
        {renderTextInput()}
        {renderClearIcon()}
      </Bounceable>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
