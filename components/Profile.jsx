import {
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  UnorderedList,
  ListItem,
  useToast,
  chakra,
  Icon,
  Badge,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../utils/userContext";
import { useRouter } from "next/router";
import { FiShoppingCart } from "react-icons/fi";
import { contextStore } from "../utils/Store";
import { useContext } from "react";
import Protected from "./Protected";
export default function UserProfileEdit() {
  const { state } = useContext(contextStore);
  const cartQty = state.cart.cartItems.length;
  const toast = useToast();
  const { user, userSignOut } = useUserAuth();
  const router = useRouter();
  const handelLogout = async () => {
    try {
      await userSignOut();
      router.push("/sign-in");
    } catch (error) {
      toast({
        title: "Signout Failed",
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <Protected>
      <Flex
        minH={"100vh"}
        minW={"100vh"}
        pl={3}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Stack
            pb={5}
            borderBottom={"1px solid #ccc"}
            direction={["column", "row"]}
            spacing={6}
          >
            <Center>
              <Avatar size="xl" src={user.photoURL}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  aria-label="remove Image"
                  icon={<AttachmentIcon />}
                />
              </Avatar>
              <chakra.a href={"/cart"} pl={5}>
                <Icon as={FiShoppingCart} h={12} w={12} />
                <Badge
                  variant="solid"
                  h={5}
                  borderRadius={"50%"}
                  colorScheme="red"
                >
                  {cartQty ? cartQty : "0"}
                </Badge>
              </chakra.a>
            </Center>
          </Stack>
          <UnorderedList styleType={"none"}>
            <ListItem>{user.displayName}</ListItem>
            <ListItem>{user.email}</ListItem>
            <Divider mt={3} mb={3}></Divider>
            <ListItem>
              <Link href={"/dashboard"} passHref>
                <a>Dashboard</a>
              </Link>
            </ListItem>
          </UnorderedList>
          <Button
            onClick={handelLogout}
            bg={"red.400"}
            color={"white"}
            w="50%"
            _hover={{
              bg: "red.500",
            }}
          >
            Logout
          </Button>
        </Stack>
      </Flex>
    </Protected>
  );
}
