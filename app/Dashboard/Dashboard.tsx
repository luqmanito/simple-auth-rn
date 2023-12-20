import { Button, ButtonText, Text, Center } from "@gluestack-ui/themed";
import Container from "../../Components/elements/Container";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../models/RootStackParamList";

export type DashboardScreenProps = {
  navigation?: NativeStackNavigationProp<RootStackParamList, "DashboardScreen">;
};

const Dashboard: React.FC<DashboardScreenProps> = ({ navigation }) => {
  return (
    <>
      <Container>
        <Center>
          <Text size="4xl">Welcome!</Text>
        </Center>
        <Button onPress={() => navigation?.navigate("SignInScreen")} mt={"$4"}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </Container>
    </>
  );
};

export default Dashboard;
