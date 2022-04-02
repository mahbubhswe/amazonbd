import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";

import { useContext } from "react";
import { contextStore } from "../utils/Store";
import { FiShoppingCart } from "react-icons/fi";
import RatingNnumReview from "../Components/RatingNnumReviews";
import { useToast } from "@chakra-ui/react";
export default function ShowProduct({ product }) {
  const toast = useToast();
  const { dispatch } = useContext(contextStore);
  const AddToCart = (item) => {
    item.qty = 1;
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast({
      title: "Success",
      description: "Product added to cart",
      status: "success",
      duration: 500,
      isClosable: true,
    });
  };

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Image
          src={product.img}
          width={350}
          height={300}
          alt={`Picture of ${product.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {product.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {product.name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a onClick={() => AddToCart(product)} display={"flex"}>
                <Icon
                  as={FiShoppingCart}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                ></Icon>
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <RatingNnumReview
              rating={product.rating}
              numReviews={product.numReviews}
            />
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                $
              </Box>
              {product.price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
