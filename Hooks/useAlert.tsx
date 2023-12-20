import {
  Toast,
  ToastDescription,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
type AlertType = "success" | "info" | "warning" | "error";

const useAlert = () => {
  const toast = useToast();

  const getBackground = (type: AlertType) => {
    switch (type) {
      case "success":
        return "success";
      case "info":
        return "info";
      case "warning":
        return "attention";
      case "error":
        return "error";
      default:
        return "info";
    }
  };

  const showAlert = (type: AlertType, message: string) => {
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast
            nativeID={toastId}
            action={getBackground(type)}
            variant="solid"
          >
            <VStack space="xs">
              <ToastDescription>{message}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return {
    showAlert,
  };
};

export default useAlert;
