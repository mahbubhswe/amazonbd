import React, { useEffect, useState } from "react";
import { app } from "../utils/firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  IconButton,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  HStack,
  Button,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Img,
} from "@chakra-ui/react";
import FileBase64 from "react-file-base64";

import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
export default function Home() {
  const [resInfo, setResInfo] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({
    name: String,
    price: Number,
    category: String,
    img: String,
    qty: Number,
    isNew: false,
    numReview: 0,
    rating: 0,
  });
  const router = useRouter();
  const db = getFirestore(app);
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "store");
  const toast = useToast();
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  });

  const deleteProduct = async (id) => {
    const userDoc = doc(db, "store", id);

    if (confirm("This action going to delete this product.") == true) {
      await deleteDoc(userDoc);
      toast({
        title: "Success.",
        description: "This item successfully deleted.",
        status: "success",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  const setData = async (item) => {
    setProduct({
      ...item,
    });
    onOpen();
  };

  const update = async () => {
    const userDoc = doc(db, "store", product.id);
    if (confirm("Do you want to update?") == true) {
      try {
        await updateDoc(userDoc, { ...product });
        toast({
          title: "Success.",
          description: "This item successfully updated.",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
      } catch (error) {
        setResInfo(error.message);
      }
    }
  };

  return (
    <>
      <SimpleGrid minChildWidth="300px" mx="5px" spacingX={0}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>img</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Stoks</Th>
                <Th>Delete</Th>
                <Th>Update</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products
                ? products.map((x) => (
                    <Tr key={x.id}>
                      <Td>
                        <Image
                          width={150}
                          height={150}
                          src={x.img}
                          alt={x.name}
                        />
                      </Td>
                      <Td>{x.name}</Td>
                      <Td>{x.price}</Td>
                      <Td>{x.qty}</Td>
                      <Td>
                        <IconButton
                          onClick={() => deleteProduct(x.id)}
                          icon={<DeleteIcon />}
                        />
                      </Td>
                      <Td>
                        <IconButton
                          onClick={() => setData(x)}
                          icon={<EditIcon />}
                        />
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Update Product</Center>
            <Center>{resInfo ? resInfo : null}</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel required>Product Name</FormLabel>
              <Input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </FormControl>

            <HStack mt={4}>
              <Box>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <select
                    value={product.category}
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                  >
                    <option value="tshart">T-shart</option>
                    <option value="shart">Shart</option>
                    <option value="formalshose">Formal Shose</option>
                    <option value="casualshose">Casual Shose</option>
                    <option value="sari">Sari</option>
                    <option value="gohona">Gohona</option>
                    <option value="lehenga">Lehenga</option>
                    <option value="mobile">Mobile</option>
                    <option value="laptop">Laptop</option>
                    <option value="acssesory">Acssesory</option>
                  </select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>New?</FormLabel>
                  <select
                    value={product.isNew}
                    onChange={(e) =>
                      setProduct({ ...product, isNew: Boolean(e.target.value) })
                    }
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </FormControl>
              </Box>
            </HStack>

            <HStack mt={4}>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="amount">Price</FormLabel>
                  <NumberInput value={product.price} max={50} min={10}>
                    <NumberInputField
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </NumberInput>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="amount">Qty</FormLabel>
                  <NumberInput value={product.qty} max={50} min={10}>
                    <NumberInputField
                      onChange={(e) =>
                        setProduct({ ...product, qty: Number(e.target.value) })
                      }
                    />
                  </NumberInput>
                </FormControl>
              </Box>
            </HStack>
            <FormControl mt={5}>
              <Img
                src={product.img}
                height={90}
                width={90}
                alt={product.name}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Img</FormLabel>
              <FileBase64
                onDone={(x) => setProduct({ ...product, img: x.base64 })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={update} colorScheme="blue" mr={3}>
              Update
            </Button>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
