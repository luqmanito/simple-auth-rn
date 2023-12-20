import {
  Button,
  Center,
  ButtonText,
  Box,
  VStack,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Container from "../../Components/elements/Container";
import cache from "../../Utils/cache";
import useAlert from "../../Hooks/useAlert";
import ReusableInput from "../../Components/ReusableInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../models/RootStackParamList";
import { Credentials } from "../../models/Credential";
import { isNotEmpty } from "../../Utils/validation";

export type SignInProps = {
  navigation?: NativeStackNavigationProp<RootStackParamList, "SignInScreen">;
};

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const alert = useAlert();
  const [savedCredentials, setSavedCredentials] = useState<Credentials[]>([]);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    async function getCredentials() {
      const savedCredentials = await cache.get("loginData");
      setSavedCredentials(savedCredentials);
    }
    if (isFocused) {
      getCredentials();
    }
  }, [isFocused]);

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleLogin = () => {
    if (!isNotEmpty(formState.email) || !isNotEmpty(formState.password)) {
      alert.showAlert("error", "Email or password can't be empty");
      return;
    }

    const matchedCredential = savedCredentials.find(
      (credential) =>
        credential.username === formState.email &&
        credential.password === formState.password
    );

    if (matchedCredential) {
      alert.showAlert("success", "Login Successfully ");
      navigation?.navigate("DashboardScreen");
    } else {
      alert.showAlert("error", "Wrong email or password");
    }
  };

  return (
    <Container>
      <Box
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
      >
        <VStack space="xl">
          <Center>
            <Text size="2xl">Sign In</Text>
          </Center>
        </VStack>
        <ReusableInput
          label="Email"
          type="text"
          value={formState.email}
          onChange={(text) => setFormState({ ...formState, email: text })}
        />
        <ReusableInput
          label="Password"
          type="password"
          value={formState.password}
          onChange={(text) => setFormState({ ...formState, password: text })}
          isPasswordVisible={showPassword}
          onTogglePasswordVisibility={handleState}
        />
        <Button mt={"$4"} onPress={handleLogin}>
          <ButtonText color="$white">Login</ButtonText>
        </Button>
      </Box>

      <Center mt={"$4"}>
        <Pressable onPress={() => navigation?.navigate("SignUpScreen")}>
          <Text bold color={"$blue500"}>
            Dont have an account? register here
          </Text>
        </Pressable>
      </Center>
    </Container>
  );
};

export default SignIn;
