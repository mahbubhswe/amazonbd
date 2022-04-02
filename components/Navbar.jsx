import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  chakra,
  Badge,
  Link,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { contextStore } from "../utils/Store";
import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useUserAuth } from "../utils/userContext";
export default function WithSubnavigation() {
  const { user } = useUserAuth();
  const { state } = useContext(contextStore);
  const { isOpen, onToggle } = useDisclosure();
  const cartQty = state.cart.cartItems.length;
  return (
    <Box>
      <Flex
        bg="#232F3F"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color="#FFFFFF"
          >
            <Link href="/dashboard">
              Dashboard
            </Link>
          </Text>
         
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <chakra.a href={"/cart"} display={"flex"}>
            <Icon
              color={"#D48B27"}
              as={FiShoppingCart}
              h={7}
              w={7}
              alignSelf={"center"}
            />
            <Badge
              variant="solid"
              h={8}
              borderRadius={"50%"}
              colorScheme="#000000"
            >
              {cartQty ? cartQty : "0"}
            </Badge>
          </chakra.a>
          <Button
            style={{ display: user ? "none" : "block" }}
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/sign-in"}
            color={"#D48B27"}
            mt={2}
          >
            Sign In
          </Button>
       

          <Button
            style={{ display: user ? "block" : "none" }}
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            mt={2}
            href={"/user-profile"}
            color={"#D48B27"}
          >
            Profile
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("#FFFFFF", "#FFFFFF");
  const linkHoverColor = useColorModeValue("#F9B42D", "#F9B42D");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Man",
    children: [
      {
        label: "T-shart",
        subLabel: "Best quality T-shart for you",
        href: "/man's-product/t-shart",
      },
      {
        label: "Shart",
        subLabel: "Best quality T-shart for you",
        href: "/man's-product/shart",
      },
      {
        label: "Formal Shose",
        subLabel: "Best quality shose for you",
        href: "/man's-product/formal-shose",
      },
      {
        label: "Casual Shose",
        subLabel: "Best quality casual chose for you",
        href: "/man's-product/casual-shose",
      },
    ],
  },
  {
    label: "Women",
    children: [
      {
        label: "Sari",
        subLabel: "Best quality  for you",
        href: "/women's-product/sari",
      },
      {
        label: "Lehenga",
        subLabel: "Best quality Lehenga for you",
        href: "/women's-product/lehenga",
      },
      {
        label: "Gohona",
        subLabel: "Best quality Gohona for you",
        href: "/women's-product/gohona",
      },
    ],
  },
  {
    label: "Electronics",
    children: [
      {
        label: "Mobile",
        subLabel: "Best quality original products for you",
        href: "/electronics/mobile",
      },
      {
        label: "Laptop",
        subLabel: "Impotred from china",
        href: "/electronics/laptop",
      },
      {
        label: "Acssesory",
        subLabel: "Impotred from china",
        href: "/electronics/acssesory",
      },
    ],
  },

];
