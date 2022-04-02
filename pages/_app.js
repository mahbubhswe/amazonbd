import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { ReactNotifications } from "react-notifications-component";
import { UserAuthContextProvider } from "../utils/userContext";
import StoreProvider from "../utils/Store";
function MyApp({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <StoreProvider>
        <ChakraProvider>
          <ReactNotifications></ReactNotifications>
          <Component {...pageProps} />
        </ChakraProvider>
      </StoreProvider>
    </UserAuthContextProvider>
  );
}

export default MyApp;
