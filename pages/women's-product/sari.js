import React, { useEffect, useState } from "react";
import { app } from "../../utils/firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import ShowProduct from "../../components/ShowProduct";
import Layout from "../../components/Layout";
import ShowProductSLider from "../../components/ShowProductSlider";
export default function Home() {
  const db = getFirestore(app);
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "store");
  const q = query(productsCollectionRef, where("category", "==", "sari"));
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(q);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  });

  return (
    <Layout>
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
      <ShowProductSLider></ShowProductSLider>
    </Layout>
  );
}
