import { Input, View, InputField } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
export default function ReusableOtpInput({
  onChangeText = () => {},
}: {
  onChangeText: (text: string) => void;
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs: any = [];
  useEffect(() => {
    onChangeText(otp.join(""));
    return () => {
      onChangeText("");
    };
  }, [otp]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (!otp[index] && index > 0) {
      inputs[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <Input key={index} style={styles.box}>
          <InputField
            key={index}
            keyboardType={"numeric"}
            maxLength={1}
            ref={(input) => {
              inputs[index] = input;
            }}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            type={"text"}
            style={styles.inputField}
          />
        </Input>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderWidth: 1,
    width: 45,
    height: 45,
    margin: 10,
    borderRadius: 10,
    padding: 0,
  },
  inputField: {
    textAlign: "center",
  },
});
