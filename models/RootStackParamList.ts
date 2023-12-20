export type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OtpScreen: { registrationData: { username: string; password: string } };
  DashboardScreen: undefined;
};
