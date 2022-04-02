import { Center } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import product from "../public/img/ops.gif";
export default function ShowProductSLider() {
  return (
    <Center mt={120}>
      <Image src={product} alt="slider" />
    </Center>
  );
}
