import { Button, Text } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { AppContext, Interval, setInterval } from "../helpers/state";
import { ApplowCardWrapper, SelectButton } from "./AppFlow";
import { IBackAndForth } from "./interfaces";

export function SetInterval({ setStatus, onClickBack }: IBackAndForth) {
  const {
    appState: { interval },
    dispatch,
  } = useContext(AppContext);

  const setInt = useCallback(
    (int: Interval) => {
      dispatch(setInterval(int));
    },
    [dispatch]
  );

  return (
    <ApplowCardWrapper
      number={2}
      maxW={600}
      header="How often do you want to signal that you are still alive?"
      w="auto"
      onBackClick={onClickBack}
    >
      <Text fontSize={14} mb={6} textAlign="left">
        If the Dead Man’s Switch does not receive a heartbeat within the given
        timeframe, the switch assume you are dead and release the files
        according to your settings.
      </Text>
      <HeartBeats interval={interval} setInterval={setInt} />

      <Button mt={6} w={"100%"} variant={"primary"} onClick={setStatus}>
        {interval < 1
          ? `Continue with 10 minutes`
          : `Continue with ${interval} week interval`}
      </Button>
    </ApplowCardWrapper>
  );
}

export function HeartBeats({
  setInterval,
  interval,
}: {
  interval: Interval;
  setInterval: (int: Interval) => void;
}) {
  return (
    <>
      <SelectButton
        onClick={() => setInterval(0.0009920634921)}
        condition={interval === 0.0009920634921}
      >
        Every ~10 minutes
      </SelectButton>
      <SelectButton onClick={() => setInterval(2)} condition={interval === 2}>
        Every ~2 weeks
      </SelectButton>
      <SelectButton onClick={() => setInterval(4)} condition={interval === 4}>
        Every ~4 weeks
      </SelectButton>
      <SelectButton onClick={() => setInterval(8)} condition={interval === 8}>
        Every ~8 weeks
      </SelectButton>
    </>
  );
}
