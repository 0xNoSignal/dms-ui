/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { useAccount } from "wagmi";
import {
  AppContext,
  MANAGEMENT_STATUS,
  startNewDms,
  switchToManage,
} from "../helpers/state";
import { NOT_CONNECTED } from "../helpers/toast";

export default function Intro() {
  return (
    <Box flex={1} px={{
      base: 4,
      md: 12,
    }} mb={12}>
      <Heading
        fontSize={{
          base: "3xl",
          md: 64,
        }}
      >
        DIE IN STYLE
      </Heading>
      <Text
        fontSize={{
          base: "1xl",
          md: 32,
        }}
        fontWeight="light"
      >
        A cryptograpghic Dead Man's Switch that releases data when you die -
        your will, a note to your ex or hot kompromat as life insurance
      </Text>
    </Box>
  );
}

export const CardWrapper = ({ children, maxW, w, display }: any) => (
  <Flex
    borderRadius={{
      base: "25px 25px 0 0",
      md: 39,
    }}
    zIndex={25}
    border="1px solid #04724D"
    overflow="hidden"
    overflowY="scroll"
    boxShadow="0px 2px 50px rgba(0,0,0, 0.13732);"
    bottom={0}
    pos={{ base: "absolute", md: "relative" }}
    display={display}
    w={{
      base: "100%",
      md: "auto",
    }}
    alignItems={"center"}
    justifyContent="center"
    maxH={{
      base: "60%",
      md: "auto",
    }}
    color="black"
    bg="white"
    flex={1}
  >
    <Flex
      alignItems={"center"}
      justifyContent="center"
      px={{
        md: 4,
      }}
      overflowY="scroll"
      pos={"relative"}
      w={w || "100%"}
      maxW={maxW}
    >
      <Box
        py={12}
        px={{
          base: 0,
          md: 16,
        }}
        w={w || "100%"}
        maxW={maxW}
      >
        {children}
      </Box>
    </Flex>
  </Flex>
);

export const IntroPanel = () => {
  const { isConnected, address } = useAccount();
  const { dispatch } = useContext(AppContext);
  const toast = useToast();
  const start = useCallback(
    (state: MANAGEMENT_STATUS) => () => {
      if (isConnected && address) {
        if (state === "MANAGE") {
          dispatch(switchToManage());
        }
        if (state === "NEW") {
          dispatch(startNewDms(address));
        }
      } else {
        toast(NOT_CONNECTED);
      }
    },
    [dispatch, toast, isConnected, address]
  );

  return (
    <CardWrapper maxW={500} display={{
      base: "none",
      md: "flex"
    }}>
      <Heading
        textAlign={"center"}
        fontSize={{
          base: 16,
          md: 22,
        }}
        mb={{
          base: 8,
          md: 24,
        }}
      >
        Create a new Dead Man's Switch
        {/* Create a new Dead Man's Switch <br /> or manage an existing one */}
      </Heading>
      <Flex alignItems={"center"} flexDir={"column"}>
        <Button
          onClick={start("NEW")}
          fontWeight={"normal"}
          variant={"primary"}
        >
          Create new Dead Man's Switch
        </Button>
        {/* <Text my={3}>or</Text>
        <Button onClick={start("MANAGE")} variant={"secondary"}>
          Manage existing Dead Man's Switch
        </Button> */}
      </Flex>
    </CardWrapper>
  );
};
