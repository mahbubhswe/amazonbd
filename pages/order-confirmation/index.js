import { Center } from "@chakra-ui/react";
import React from "react";
import OrderProcessLayout from "../../components/OrderProcessLayout";

export default function Index() {
  return (
    <OrderProcessLayout activeStep={2}>
      <Center>Your order confirmed successfully</Center>
    </OrderProcessLayout>
  );
}
