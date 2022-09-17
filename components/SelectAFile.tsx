/* eslint-disable react/no-unescaped-entities */
import { Button, Text, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AppContext, setFile } from "../helpers/state";
import { ApplowCardWrapper } from "./AppFlow";
import { IBackAndForth } from "./interfaces";


export function SelectAFile({
  setStatus,
  onClickBack,
}: IBackAndForth) {
  const fileTypes = ["PNG"];
  const toast = useToast();

  const {
    appState: { file },
    dispatch,
  } = useContext(AppContext);

  const handleChange = (file: File) => {
    toast({
      title: "File selected",
      description: `File name: ${file.name}`,
      status: "info",
      duration: 2500,
      isClosable: true,
      position: "bottom-right",
    });
    dispatch(setFile(file));
  };

  return (
    <ApplowCardWrapper
      number={3}
      header="Select a file for your Dead Man's Switch"
      w="auto"
      maxW={600}
      onBackClick={onClickBack}
    >
      <Text fontSize={14} mb={6} textAlign="left">
        The file will be released to the public if you don't trigger the dead
        man's switch within a specific timefrime. Choose wisely - this file is
        your life insurance.
      </Text>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <Button
        disabled={!file}
        mt={6}
        w={"100%"}
        variant={"primary"}
        onClick={setStatus}
      >
        {file ? `Continue with ${file?.name}` : "Continue"}
      </Button>
    </ApplowCardWrapper>
  );
}
