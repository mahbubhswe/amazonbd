import { Center } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import product from "../public/img/hps.gif";
export default function HomeProductSLider() {
  return (
    <Center mt={120}>
      <Image src={product} alt="slider" />
    </Center>
  );
}
