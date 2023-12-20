import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Box,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputSlot,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";

interface CustomFormControlProps {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: (text: string) => void;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  isError?: boolean;
  errorMessage?: string;
}

const ReusableInput: React.FC<CustomFormControlProps> = ({
  label,
  type,
  value,
  onChange,
  isPasswordVisible = false,
  onTogglePasswordVisibility,
  isError = false,
  errorMessage = "",
}) => {
  return (
    <FormControl
      size="md"
      mt={'$4'}
      isDisabled={false}
      isInvalid={isError}
      isReadOnly={false}
      isRequired={true}
    >
      <FormControlLabel mb="$1">
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          onChangeText={(text) => onChange(text)}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          value={value}
        />
        {type === "password" && onTogglePasswordVisibility && (
          <InputSlot pr="$3" onPress={onTogglePasswordVisibility}>
            <Ionicons
              size={20}
              color={"#0077e6"}
              name={isPasswordVisible ? "eye" : "eye-off"}
            />
          </InputSlot>
        )}
      </Input>
      {isError && (
        <FormControlError>
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default ReusableInput;
