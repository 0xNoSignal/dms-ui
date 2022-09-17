/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Flex, Heading, Icon, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useContext } from "react";
import { CardWrapper } from "./Intro";
import { IoChevronBackOutline } from "react-icons/io5";
import { Overview } from "./Overview";
import { SetInterval } from "./SetInterval";
import { AppContext, setWebsite, STATE_OF_WEBSITE } from "../helpers/state";
import { SetName } from "./SetName";
import { SetPurpose } from "./SetPurpose";
import { SelectAFile } from "./SelectAFile";
import { SetBucket } from "./SetBucket";

export default function AppFlow() {
  const {
    appState: { website, file },
    dispatch,
  } = useContext(AppContext);

  const goOn = useCallback(
    (stat: STATE_OF_WEBSITE) => () => {
      dispatch(setWebsite(stat));
    },
    [dispatch]
  );

  return (
    <Flex
      flexDir={"column"}
      alignItems="center"
      justifyContent={"center"}
      w="100%"
    >
      <Heading
        fontSize={{ base: "medium", md: "large" }}
        mb={{ base: 4, md: 12 }}
      >
        Create a new Dead Man's Switch or <br /> Send a heartbeat to an existing
        one
      </Heading>
      {website === 1 && <SetName onClickBack={goOn(0)} setStatus={goOn(3)} />}
      {/* {website === 2 && (
        <SetPurpose onClickBack={goOn(1)} setStatus={goOn(3)} />
      )} */}
      {website === 3 && (
        <SetInterval onClickBack={goOn(1)} setStatus={goOn(4)} />
      )}
      {website === 4 && (
        <SelectAFile onClickBack={goOn(3)} setStatus={goOn(6)} />
      )}
      {/* {website === 5 && <SetBucket onClickBack={goOn(4)} setStatus={goOn(6)} />} */}
      {website === 6 && file && <Overview />}
    </Flex>
  );
}


export function SelectButton({
  children, condition, onClick, styleProps,
}: any) {
  const bg = useColorModeValue("white", "brandGreen.600");
  const color = useColorModeValue("black", "white");

  if (condition) {
    return (
      <Button
        {...styleProps}
        borderWidth={2}
        borderColor="brandGreen.600"
        variant={"select"}
        bg={bg}
        color={color}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button {...styleProps} onClick={onClick} variant={"select"}>
      {children}
    </Button>
  );
}

export function ApplowCardWrapper({
  children, header, number, maxW, w, onBackClick,
}: any) {
  return (
    <CardWrapper maxW={maxW} w={w}>
      {onBackClick && (
        <Flex px={{ base: 4, md: 24 }} pos={"absolute"} left={0} top={1}>
          <Button
            onClick={onBackClick}
            fontSize={14}
            mb={0.5}
            mx={-1}
            variant={"third"}
          >
            <Icon mx={1} as={IoChevronBackOutline} /> Back
          </Button>
        </Flex>
      )}
      <Flex maxW="90%">
        <Box>
          <Flex
            mt={-1}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={33}
            bg={"#EFF2C0"}
            w={33}
            h={33}
            mx={2}
            fontWeight={"bold"}
          >
            {number}
          </Flex>
        </Box>
        <Box textAlign={"center"}>
          <Heading mb={4} textAlign={"left"} fontSize={"large"}>
            {header}
          </Heading>
          {children}
        </Box>
      </Flex>
    </CardWrapper>
  );
}
