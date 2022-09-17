/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from "@chakra-ui/react";
import {
  useCallback,
  useContext
} from "react";
import { AppContext, Purpose, setPurpose } from "../helpers/state";
import { ApplowCardWrapper, SelectButton } from "./AppFlow";
import { IBackAndForth } from "./interfaces";

export function SetPurpose({
  setStatus,
  onClickBack,
}: IBackAndForth) {
  const {
    appState: { purpose },
    dispatch,
  } = useContext(AppContext);

  const setP = useCallback(
    (p: Purpose) => () => {
      dispatch(setPurpose(p));
    },
    [dispatch]
  );

  return (
    <ApplowCardWrapper
      w="auto"
      maxW={600}
      number={2}
      header="What should happen when you die?"
      onBackClick={onClickBack}
    >
      <Text fontSize={14} mb={6} textAlign="left">
        If the Dead Man's Switch does not receive a heartbeat within the given
        timeframe, the switch assume you are dead and release the files
        according to your settings.
      </Text>
      <SelectButton onClick={setP("Will")} condition={purpose === "Will"}>
        Will: Release files to a few select people
      </SelectButton>
      <SelectButton
        onClick={setP("Kompromat")}
        condition={purpose === "Kompromat"}
      >
        Kompromat: Release files the public
      </SelectButton>
      <SelectButton onClick={setP("Notify")} condition={purpose === "Notify"}>
        Notify my ex: Send a message
      </SelectButton>
      <Button mt={6} w={"100%"} variant={"primary"} onClick={setStatus}>
        Continue with {purpose}
      </Button>
    </ApplowCardWrapper>
  );
}
