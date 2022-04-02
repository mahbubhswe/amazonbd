import {
  Center,
  Heading,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import OrderProcessLayout from "../../components/OrderProcessLayout";
import { contextStore } from "../../utils/Store";
import { deleteFromStorage } from "@rehooks/local-storage";
export default function Index() {
  const { dispatch } = useContext(contextStore);
  const [payment, setPayment] = useState();
  const router = useRouter();

  const processNow = async () => {
    if (payment === "ssl") {
      clearCart();
      router.push("/api/online-payment-by-ssl");
    } else {
      clearCart();
      router.push("/order-confirmation");
    }
  };

  function clearCart() {
    deleteFromStorage("amazonbd");
  }
  return (
    <OrderProcessLayout activeStep={1}>
      <Center w="100%">
        <UnorderedList listStyleType={"none"}>
          <ListItem mb={5}>
            <Heading>Select Payment Method</Heading>
          </ListItem>
          <ListItem>
            <input
              onChange={(e) => setPayment(e.target.value)}
              type="radio"
              id="ssl"
              name="payment"
              value="ssl"
            />
            <label htmlFor="ssl"> SSL(Bkash, Nogod, Roket and Others)</label>
            <br />
            <input
              onChange={(e) => setPayment(e.target.value)}
              type="radio"
              id="cod"
              name="payment"
              value="cod"
            />
            <label htmlFor="cod"> Cash on Delivery</label> <br />
          </ListItem>
          <ListItem>
            <Button
              w={"full"}
              onClick={processNow}
              mt={3}
              background={"#F9B42D"}
              variant="outline"
            >
              {payment == "ssl" ? "Payment" : "Confirm Order"}
            </Button>
          </ListItem>
        </UnorderedList>
      </Center>
    </OrderProcessLayout>
  );
}
