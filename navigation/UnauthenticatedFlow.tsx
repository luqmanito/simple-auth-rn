import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/RootStackParamList";
import SignIn, { SignInProps } from "../app/Auth/Sign-in";
import SignUp, { SignUpProps } from "../app/Auth/Sign-up";
import Otp, { OtpScreenProps } from "../app/Auth/Otp-confirmation";
import Dashboard, { DashboardScreenProps } from "../app/Dashboard/Dashboard";

const Stack = createNativeStackNavigator<RootStackParamList>();

type ScreenConfig = {
  name: keyof RootStackParamList;
  component:
    | React.ComponentType<SignInProps>
    | React.ComponentType<SignUpProps>
    | React.ComponentType<OtpScreenProps>
    | React.ComponentType<DashboardScreenProps>;
};

const stackScreens: ScreenConfig[] = [
  { name: "SignInScreen", component: SignIn },
  { name: "SignUpScreen", component: SignUp },
  { name: "OtpScreen", component: Otp },
  { name: "DashboardScreen", component: Dashboard },
];
const UnauthenticatedFlow = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{ headerShown: false }}
    >
      {stackScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name as keyof RootStackParamList}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default UnauthenticatedFlow;
