import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import LogoIcon from "./LogoIcon";
import BrandName from "./BrandName";
import { MyConnectButton } from "./ConnectButton";
import ModeSwitcher from "./ModeSwitcher";

export default function Header() {
  const fill = useColorModeValue("black", "white");

  return (
    <Flex
      justifyContent={"space-between"}
      flexWrap="wrap"
      px={{
        base: 5,
        md: 10,
        xl: 32,
      }}
    >
      <Flex
        alignItems={"center"}
        mb={2}
        justifyContent={{
          base: "center",
          md: "flex-start",
        }}
        flex={1}
      >
        <Box
          minW={30}
          w={{
            base: 50,
            md: 70,
          }}
          maxW={73}
        >
          <LogoIcon fill={fill} />
        </Box>
        <Box
          minW={200}
          w={{
            base: 200,
            md: 300,
            lg: 470,
          }}
          maxW={476}
          mx={6}
        >
          <BrandName fill={fill} />
        </Box>
      </Flex>
      <Flex
        mb={2}
        flex={1}
        justifyContent={{
          base: "center",
          md: "flex-end",
        }}
        alignItems="center"
      >
        <ModeSwitcher />
        <MyConnectButton />
      </Flex>
    </Flex>
  );
}
