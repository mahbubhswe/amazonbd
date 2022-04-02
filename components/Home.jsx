import React, { useEffect, useState } from "react";
import { app } from "../utils/firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import ShowProduct from "./ShowProduct";
import HomeProductSLider from "../components/HomeProductSLider";
export default function Home() {
  const db = getFirestore(app);
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "store");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     
    };

    getProducts();
  });

  return (
    <>
   
      <Center mt={10}>
        <Heading>Products List</Heading>
       </Center>

      <SimpleGrid minChildWidth="300px" mx="5px" spacingX={0}>
        {products.map((x) => (
          <Box key={x.id}>
       
            <ShowProduct product={x}></ShowProduct>
          </Box>
        ))}
      </SimpleGrid>
      <HomeProductSLider></HomeProductSLider>
    </>
  );
}
