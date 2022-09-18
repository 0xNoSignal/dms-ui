import { Skeleton, Td } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import React, {
  useEffect,
  useMemo,
  useState
} from "react";
import { secondsToDhms } from "../helpers";
import { ASSUMED_BLOCK_TIME } from "../helpers/constants";

interface IAssumedDeadIn {
  lastHeartbeat: BigNumber;
  cadence: BigNumber;
  blockNumber?: number;
  isDead?: boolean;
  id: number;
}


export function AssumedDeadIn({
  lastHeartbeat, cadence, blockNumber, isDead, id
}: IAssumedDeadIn) {
  const timeLeft = useMemo(() => {
    const wenDead = lastHeartbeat.add(cadence).toNumber();
    const blocksLeft = wenDead - (blockNumber ? blockNumber : 0);
    const timeLeft = blocksLeft * ASSUMED_BLOCK_TIME;

    return timeLeft;
  }, [cadence, lastHeartbeat, blockNumber]);


  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (timeLeft) {
      setSecondsLeft(timeLeft);
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);


  if (!blockNumber)
    return (
      <Td>
        <Skeleton h={"20px"} />
      </Td>
    );
  if (isDead || secondsLeft <= 0)
    return <Td>😵 Dead</Td>;
  return <Td>{secondsToDhms(secondsLeft)}</Td>;
}
