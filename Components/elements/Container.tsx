import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  SafeAreaView,
} from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Container(props: Props) {
  const containerStyle = StyleSheet.flatten([
    styles.container,
    props.style,
  ]) as ViewStyle;
  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          ...containerStyle,
          padding: 16,
        }}
      >
        <View style={containerStyle}>{props.children}</View>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
});
