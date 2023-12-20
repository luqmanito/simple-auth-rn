import React, { useState, useEffect } from "react";
import { View, Text, ButtonText, Button } from "@gluestack-ui/themed";
import ReusableOtpInput from "../../Components/ReusableOtpInput";
import { RouteProp } from "@react-navigation/native";
import Container from "../../Components/elements/Container";
import { RootStackParamList } from "../../models/RootStackParamList";
import cache from "../../Utils/cache";
import useAlert from "../../Hooks/useAlert";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type OtpScreenProps = {
  navigation?: NativeStackNavigationProp<RootStackParamList, "OtpScreen">;
  route?: RouteProp<RootStackParamList, "OtpScreen">;
};

const OTPScreen: React.FC<OtpScreenProps> = ({ navigation, route }) => {
  const [timer, setTimer] = useState(30);
  const [state, setState] = useState("");
  const [isCorrectStateHandled, setIsCorrectStateHandled] = useState(false);
  const registrationData = route?.params.registrationData;
  const alert = useAlert();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
  };

  useEffect(() => {
    const handleCorrectState = async () => {
      if (state === "111111" && !isCorrectStateHandled) {
        const existingCredentials = (await cache.get("loginData")) || [];
        await cache.store("loginData", [
          ...existingCredentials,
          registrationData,
        ]);
        alert.showAlert("success", "Successfully Registered");
        navigation?.navigate("SignInScreen");
        setIsCorrectStateHandled(true);
      } else if (
        state.length === 6 &&
        state !== "111111" &&
        !isCorrectStateHandled
      ) {
        alert.showAlert("error", "Invalid OTP input");
      }
    };

    handleCorrectState();
  }, [state, isCorrectStateHandled]);

  return (
    <Container>
      <Text>Enter OTP:</Text>
      <View mt={"$4"}>
        <ReusableOtpInput onChangeText={(text) => setState(text)} />
      </View>
      <Text mt={"$6"}>Time remaining: {timer} seconds</Text>
      <Button mt={"$4"} onPress={handleResend} isDisabled={timer > 0}>
        <ButtonText color="$white">Resend</ButtonText>
      </Button>
    </Container>
  );
};

export default OTPScreen;
