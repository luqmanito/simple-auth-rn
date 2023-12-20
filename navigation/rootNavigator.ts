import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

type RootParamList = {
  SignIn: 'SignInScreen';
  SignUp: 'SignUpScreen';
  Dashboard: 'DashboardScreen';
  Otp: 'OtpScreen';
};

export const navigationRef =
  React.createRef<NavigationContainerRef<RootParamList>>();

export const navigate = (name: keyof RootParamList, params?: any) => {
  if (navigationRef.current) {
    navigationRef.current.navigate({
      name: name,
      params: params,
    });
  }
};
