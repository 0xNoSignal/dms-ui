/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import Header from "../components/Header";
import { useCallback, useContext, useState } from "react";
import Intro, { IntroPanel } from "../components/Intro";
import DMSImage from "../images/DeadManPicture.png";
import Image from "next/image";
import AppFlow from "../components/AppFlow";
import {
  AppContext,
  MANAGEMENT_STATUS,
  startNewDms,
  switchToManage,
} from "../helpers/state";
import Dashboard from "../components/Dashboard";
import { useAccount } from "wagmi";
import { NOT_CONNECTED } from "../helpers/toast";

const Home: NextPage = () => {
  const {
    appState: { website },
    dispatch,
  } = useContext(AppContext);

  const { address, isConnected } = useAccount();
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
console.log(website,address)
  return (
    <Box pt={6} h="100vh" w="100%" overflow={{ base: "hidden", md: "auto" }}>
      <Header />
      <Flex
        alignItems={"center"}
        justifyContent="center"
        pt={{
          base: 6,
          md: 24,
        }}
        w="100%"
        flexWrap="wrap"
        mb={{ base: 0, md: 30 }}
        px={{
          base: 0,
          md: 10,
          xl: 32,
        }}
      >
        {website === 0 && (
          <>
            <Intro />
            {!isConnected && <Button
              onClick={start("NEW")}
              fontWeight={"normal"}
              variant={"primary"}
              zIndex={4}
              size="lg"
              display={{
                base: "block",
                md: "none",
              }}
            >
              Create new Dead Man's Switch
            </Button>}
            <IntroPanel />
          </>
        )}
        {website > 0 && <AppFlow />}
        {website === 0 && (
        <Box pos={"absolute"} opacity={0.5} left={10} bottom={20} zIndex={3}>
          <Image src={DMSImage} alt="Picture of a dead person" />
        </Box>
      )}
      </Flex>
  

      {website === 0 && address && <Dashboard address={address} />}
    </Box>
  );
};

export default Home;
