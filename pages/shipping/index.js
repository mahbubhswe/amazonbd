import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Center,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import OrderProcessLayout from "../../components/OrderProcessLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { useUserAuth } from "../../utils/userContext";
import { contextStore } from "../../utils/Store";
export default function Shipping() {
  const { dispatch } = useContext(contextStore);
  const { setUpRecaptcha } = useUserAuth();
  // Inputs
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [confirmOtp, setConfirmOtp] = useState("");
  const router = useRouter();

  const sendOtp = async (e) => {
    setError("");
    e.preventDefault();
    if (name === "" || address === "" || number === "" || number.length < 11) {
      return setError("Please provide all information");
    }
    try {
      const res = await setUpRecaptcha(number);
      setConfirmOtp(res);
      setShow(true);
      dispatch({ type: "ORDER_INFO", payload: { name, address, number } });
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (otp === "" || otp == null) {
      return setError("Please inter otp to continue the next step");
    }
    try {
      await confirmOtp.confirm(otp);
      router.push("/billing");
    } catch (error) {
      setError("Sorry, you have inputted a invalid OTP");
    }
  };

  return (
    <OrderProcessLayout activeStep={0}>
      <Flex>
        <Stack mx={"auto"} maxW={"lg"} px={6}>
          <Box
            style={{ display: show ? "none" : "block" }}
            rounded={"lg"}
            p={8}
            border={"1px solid #ccc"}
          >
            <Stack spacing={4}>
              <Text style={{ display: error ? "block" : "none", color: "red" }}>
                {error}
              </Text>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Shipping Address</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <PhoneInput
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "5px",
                  }}
                  placeholder="Enter phone number"
                  value={number}
                  onChange={setNumber}
                  international={true}
                  defaultCountry="BD"
                  countryCallingCodeEditable={false}
                />
              </FormControl>
              <Text id="recaptcha-container"></Text>
            </Stack>
            <Button
              onClick={sendOtp}
              w={"full"}
              mt={3}
              background={"#F9B42D"}
              variant="outline"
            >
              Send OTP
            </Button>
          </Box>

          <Stack style={{ display: show ? "block" : "none" }}>
            <Center>
              <Alert status="success" variant="top-accent">
                <AlertIcon />
                We have sent OTP to {number}. Please check your message
              </Alert>
            </Center>
            <FormControl isRequired>
              <FormLabel>Enter OTP</FormLabel>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span>-</span>}
              />
            </FormControl>
            <Text style={{ display: error ? "block" : "none", color: "red" }}>
              {error}
            </Text>
            <Button
              w={"full"}
              onClick={verifyOtp}
              mt={3}
              background={"#F9B42D"}
              variant="outline"
            >
              Verify
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </OrderProcessLayout>
  );
}
