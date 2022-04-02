import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  orModeValue,
  Center,
  useDisclosure,
  Modal,
  Lorem,
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
  MenuButton,
  useColorModeValue,
  MenuList,
  MenuItem,
  MenuDivider,
  useCol,
} from "@chakra-ui/react";
import DashboardHome from "../components/DashboardHome";
import { AddIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../utils/userContext";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { app } from "../utils/firebase-config";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import Link from "next/link";

export default function Index() {
  const db = getFirestore(app);
  const docRef = collection(db, "store");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, userSignOut } = useUserAuth();
  const [resInfo, setResInfo] = useState();
  const [product, setProduct] = useState({
    name: String,
    price: Number,
    category: String,
    img: String,
    qty: Number,
    isNew: Boolean,
    numReview: 0,
    rating: 0,
  });

  const handelSub = async () => {
    setResInfo("");
    try {
      await addDoc(docRef, { ...product });
      setResInfo("Product added successfully");
    } catch (err) {
      setResInfo(err.message);
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.900", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box color={"white"}>Amazonbd</Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              Add Product
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={user ? user.photoURL : null} />
              </MenuButton>
              <MenuList>
                <MenuItem isDisabled>{user ? user.displayName : null}</MenuItem>
                <MenuItem>
                  <Link href={"/user-profile"} passHref>
                    <a>Profile</a>
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={userSignOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Box p={4} pt={10}>
        <Center>
          <DashboardHome></DashboardHome>
        </Center>
      </Box>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Add New Product</Center>
            <Center>{resInfo ? resInfo : null}</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel required>Product Name</FormLabel>
              <Input
                type="text"
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
                  <NumberInput max={50} min={10}>
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
                  <NumberInput max={50} min={10}>
                    <NumberInputField
                      onChange={(e) =>
                        setProduct({ ...product, qty: Number(e.target.value) })
                      }
                    />
                  </NumberInput>
                </FormControl>
              </Box>
            </HStack>
            <FormControl mt={4}>
              <FormLabel>Img</FormLabel>
              <FileBase64
                onDone={(x) => setProduct({ ...product, img: x.base64 })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handelSub} colorScheme="blue" mr={3}>
              Save
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
