import { Button, useToast } from "@chakra-ui/react";
import React, { useCallback } from "react";
import {
  useContractWrite,
  usePrepareContractWrite
} from "wagmi";
import ABI from "../helpers/ABI";
import {
  CHAIN_ID,
  getContractAddress
} from "../helpers/constants";
import {
  UPDATE_HEARTBEAT,
  UPDATE_HEARTBEAT_ERROR
} from "../helpers/toast";

export function SendHeartBeat({ switchId }: { switchId: number; }) {
  const toast = useToast();
  const { config } = usePrepareContractWrite({
    addressOrName: getContractAddress(CHAIN_ID),
    contractInterface: ABI,
    functionName: "heartbeat",
    args: [switchId],
    chainId: CHAIN_ID,
  });

  const { writeAsync } = useContractWrite(config);

  const sendHeartBeat = useCallback(() => {
    if (!writeAsync)
      return;
    writeAsync()
      .then(() => {
        toast(UPDATE_HEARTBEAT(switchId));
      })
      .catch(() => {
        toast(UPDATE_HEARTBEAT_ERROR);
      });
  }, [writeAsync, toast, switchId]);

  return (
    <Button
      fontWeight={"medium"}
      variant="ghost"
      onClick={sendHeartBeat}
      _hover={{ color: "brandGreen.400" }}
      size={{
        base: "sm",
        md: "md",
      }}
    >
      ❤️‍🔥 Send Heartbeat
    </Button>
  );
}
