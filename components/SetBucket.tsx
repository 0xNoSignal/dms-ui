import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { FaGoogleDrive } from "react-icons/fa";
import ArweaveLogo from "./ArweaveLogo";
import { ApplowCardWrapper, SelectButton } from "./AppFlow";
import { IBackAndForth } from "./interfaces";
import { AppContext, setBucket } from "../helpers/state";

export function SetBucket({ setStatus, onClickBack }: IBackAndForth) {
  const {
    appState: { bucket },
    dispatch,
  } = useContext(AppContext);

  const bucketName = useMemo(() => {
    if (bucket === "arweave") {
      return "Arweave";
    }
    return "Google Drive";
  }, [bucket]);

  return (
    <ApplowCardWrapper
      w="auto"
      number={5}
      header="Where should your files be stored?"
      maxW={600}
      onBackClick={onClickBack}
    >
      <Text fontSize={14} mb={6} textAlign="left">
        Tbd some info text about arweave / gdrive
      </Text>
      <Flex>
        <SelectButton
          styleProps={{
            mx: 1,
            px: 1,
          }}
          onClick={() => dispatch(setBucket("arweave"))}
          condition={bucket === "arweave"}
        >
          <Icon mr={1} as={ArweaveLogo} />
          Arweave
        </SelectButton>
        <SelectButton
          styleProps={{
            mx: 1,
            px: 1,
          }}
          onClick={() => dispatch(setBucket("gDrive"))}
          condition={bucket === "gDrive"}
        >
          <Icon mr={1} as={FaGoogleDrive} />
          Google Drive
        </SelectButton>
      </Flex>

      <Button mt={6} w={"100%"} variant={"primary"} onClick={setStatus}>
        Continue with {bucketName}
      </Button>
    </ApplowCardWrapper>
  );
}
