import { useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useState } from "react";
import { AppContext, Interval, setInterval as setIntervalDispatch } from "../helpers/state";
import { INTERVAL_CHANGED } from "../helpers/toast";
import { Checkout } from "./DeleteModal";
import { IModalStandard } from "./interfaces";
import ModalWrapper from "./ModalWrapper";
import { HeartBeats } from "./SetInterval";

export default function ChangeHeartBeatModal({
  onClose,
  isOpen,
}: IModalStandard) {
  const {
    appState: { interval: intervalBefore },
    dispatch,
  } = useContext(AppContext);

  const [interval, setInterval] = useState<Interval>(intervalBefore);

  const toast = useToast();

  const onClick = useCallback(() => {
    if (interval !== intervalBefore) {
      dispatch(setIntervalDispatch(interval));
      toast(INTERVAL_CHANGED)
    }
    onClose();
  }, [interval, dispatch, onClose, intervalBefore, toast]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      header="Change Interval of Dead Man's Switch"
    >
      <HeartBeats interval={interval} setInterval={setInterval} />
      <Checkout onClose={onClose} onClick={onClick} onClickTitle="Change Heartbeat" />
    </ModalWrapper>
  );
}
