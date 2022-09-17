import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, setName } from "../helpers/state";
import { NO_EMPTY_SPACE } from "../helpers/toast";
import { ApplowCardWrapper } from "./AppFlow";
import { IBackAndForth } from "./interfaces";

export function SetName({
  setStatus,
  onClickBack,
}: IBackAndForth) {
  const toast = useToast();
  const [emptySpaceError, setEmptySpaceError] = useState(false);
  const {
    dispatch,
    appState: { name },
  } = useContext(AppContext);

  const handleChange = (event: any) => {
    if (!/^\S*$/.test(event.target.value)) {
      setEmptySpaceError(true);
    }
    if (/^\S*$/.test(event.target.value)) {
      setEmptySpaceError(false);
    }
    dispatch(setName(event.target.value));
  };

  useEffect(() => {
    if (emptySpaceError) {
      toast(NO_EMPTY_SPACE);
    }
  }, [emptySpaceError, toast]);

  const goOn = useCallback(() => {
    if (!emptySpaceError && name !== "") {
      setStatus();
    }
  }, [setStatus, name, emptySpaceError]);

  return (
    <ApplowCardWrapper
      onBackClick={onClickBack}
      w="auto"
      number={1}
      header="Name Dead Man's Switch"
    >
      <Input
        errorBorderColor="red.300"
        isInvalid={emptySpaceError}
        type="text"
        value={name}
        onChange={handleChange}
        borderColor="1px solid #07C586"
        _placeholder={{ color: "gray.400" }}
        mb={4}
        textAlign="center"
        placeholder="location-of-fortnox-gold"
        mt={6}
      ></Input>
      <Button
        onClick={goOn}
        disabled={emptySpaceError || name === ""}
        w={"100%"}
        variant={"primary"}
      >
        Continue
      </Button>
    </ApplowCardWrapper>
  );
}
