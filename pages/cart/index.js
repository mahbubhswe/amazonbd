import Link from "next/link";
import React, { useState, useContext } from "react";
import {
  Text,
  Select,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { contextStore } from "../../utils/Store";
import Protected from "../../Components/Protected";
import { DeleteIcon, MinusIcon, AddIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Cart() {
  const { state, dispatch } = useContext(contextStore);
  const cartInfo = state.cart.cartItems;
  const [deliveryCharge, setDeliveryCharge] = useState(50);
  const router = useRouter();
  let total = 0;

  const goNext = () => {
    dispatch({ type: "ORDER_PRICE", payload: total });
    router.push("/shipping");
  };
  if (!cartInfo.length) {
    return (
      <div
        style={{
          width: "99%",
          margin: "auto",
          textAlign: "center",
          fontSize: "25px",
          marginTop: "120px",
        }}
      >
        Sorry, Your cart is empty. Go to{" "}
        <Link href="/" passHref>
          <a style={{ color: "#FBD705" }}>shopping</a>
        </Link>
      </div>
    );
  }

  return (
    <Protected>
      <Table
        width={"98%"}
        margin={"10px auto"}
        variant="simple"
        background={"#F6F8FA"}
      >
        <Thead>
          <Tr>
            <Th>Img</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Qty</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cartInfo
            ? cartInfo.map((x) => (
                <Tr key={x.id}>
                  <Td>
                    <Image src={x.img} alt={x.name} height={50} width={50} />
                  </Td>
                  <Td>{x.name}</Td>
                  <Td>{x.price}</Td>
                  <Td>
                    <MinusIcon
                      onClick={() =>
                        dispatch({ type: "CART_MINUS", payload: x })
                      }
                      style={{
                        color: "#FFFFFF",
                        background: "black",
                        borderRadius: "50%",
                        padding: "3px",
                        cursor: "pointer",
                      }}
                    />
                    {x.qty}
                    <AddIcon
                      onClick={() =>
                        dispatch({ type: "CART_PLUS", payload: x })
                      }
                      style={{
                        color: "#FFFFFF",
                        background: "black",
                        borderRadius: "50%",
                        padding: "3px",
                        cursor: "pointer",
                      }}
                    />
                  </Td>
                  <Td>
                    <DeleteIcon
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: x })
                      }
                      cursor={"pointer"}
                      color={"red"}
                    ></DeleteIcon>
                  </Td>
                </Tr>
              ))
            : "Loadding..."}
        </Tbody>
      </Table>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "12px",
          width: "50%",
          margin: "auto",
          borderRadius: "4px",
          textAlign: "left",
        }}
      >
        <Text py={2}>
          Product Price: {cartInfo.reduce((a, c) => a + c.price * c.qty, 0)} tk
        </Text>
        Shipping Charge: {deliveryCharge} tk
        <Select
          onChange={(e) => setDeliveryCharge(Number(e.target.value))}
          mb={"5px"}
        >
          <option selected value="50">
            Inside of Dhaka 50 tk
          </option>
          <option value="100">Outside of Dhaka 100 tk</option>
        </Select>
        <Text py={2}>
          Total:{" "}
          {
            (total =
              cartInfo.reduce((a, c) => a + c.price * c.qty, 0) +
              deliveryCharge)
          }
        </Text>
        <Button
          onClick={goNext}
          w={"full"}
          mt={3}
          background={"#F9B42D"}
          variant="outline"
        >
          Checkout
        </Button>
      </div>
    </Protected>
  );
}
