import { View } from "react-native";
import { useState } from "react";
import Container from "../../Components/elements/Container";
import { Box, ButtonText, Center, Text, Button } from "@gluestack-ui/themed";
import useCredentials from "../../Hooks/useCredential";
import ReusableInput from "../../Components/ReusableInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../models/RootStackParamList";
import {
  areAllFieldsValid,
  doPasswordsMatch,
  isEmailValid,
  isPasswordValid,
} from "../../Utils/validation";

export type SignUpProps = {
  navigation?: NativeStackNavigationProp<RootStackParamList, "SignInScreen">;
};

const SignUp: React.FC = () => {
  const { setCredentials, credentials, saveCredentials } = useCredentials();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleShowPwd = () => {
    setShowPasswordConfirmation((showState) => {
      return !showState;
    });
  };

  return (
    <Container>
      <View>
        <Center>
          <Text size="2xl">Sign Up</Text>
          <Text size="lg" style={{ marginVertical: 10 }}>
            Create an account to get started
          </Text>
        </Center>
        <Box>
          <ReusableInput
            label="Email"
            type="text"
            value={credentials.username}
            onChange={(text) =>
              setCredentials({ ...credentials, username: text })
            }
            isError={!isEmailValid(credentials.username)}
            errorMessage="This is not a valid email format"
          />
          <ReusableInput
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(text) =>
              setCredentials({ ...credentials, password: text })
            }
            isPasswordVisible={showPassword}
            onTogglePasswordVisibility={handleState}
            isError={!isPasswordValid(credentials.password)}
            errorMessage="Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one symbol"
          />
          <ReusableInput
            label="Password Confirmation"
            type="password"
            value={credentials.password_confirmation}
            onChange={(text) =>
              setCredentials({ ...credentials, password_confirmation: text })
            }
            isPasswordVisible={showPasswordConfirmation}
            onTogglePasswordVisibility={handleShowPwd}
            isError={
              !doPasswordsMatch(
                credentials.password,
                credentials.password_confirmation
              )
            }
            errorMessage="Password do not match"
          />
          <Button
            mt={"$10"}
            isDisabled={!areAllFieldsValid(credentials)}
            onPress={saveCredentials}
          >
            <ButtonText color="$white">Save</ButtonText>
          </Button>
        </Box>
      </View>
    </Container>
  );
};

export default SignUp;
