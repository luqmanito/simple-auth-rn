import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Credentials } from "../models/Credential";

const useCredentials = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
    password_confirmation: "",
  });

  const navigation = useNavigation<NavigationProp<any>>();

  function saveCredentials() {
    navigation.navigate("OtpScreen", {
      registrationData: {
        username: credentials.username,
        password: credentials.password,
      },
    });
  }

  return {
    credentials,
    setCredentials,
    saveCredentials,
  };
};

export default useCredentials;
