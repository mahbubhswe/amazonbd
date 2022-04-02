import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../utils/userContext";
export default function SignIn() {
  const router = useRouter();
  const { signIn, googleSignIn } = useUserAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn(email, password);
      router.push("/user-profile");
    } catch (error) {
      setError(error.message);
    }
  };
  const handelSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await googleSignIn();
      router.push("/user-profile");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            </Stack>
            <Alert
              style={{ display: error ? "block" : "none" }}
              status="info"
              borderRadius={"4px"}
            >
              <AlertTitle m={2}>
                {" "}
                <AlertIcon />
                {error}
              </AlertTitle>
            </Alert>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={handelSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text align={"center"}>OR</Text>
            <GoogleButton style={{ width: "100%" }} onClick={handelSignIn} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
