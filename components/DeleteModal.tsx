import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { AppContext, reset } from "../helpers/state";
import { SUCCESS_DELETED } from "../helpers/toast";
import { IModalStandard } from "./interfaces";
import ModalWrapper from "./ModalWrapper";

function DeleteModal({ onClose, isOpen }: IModalStandard) {
  const {
    appState: { side, name },
    dispatch,
  } = useContext(AppContext);

  const toast = useToast();

  const deleteDMS = useCallback(() => {
    if (side === "NEW") {
      dispatch(reset());
      toast(SUCCESS_DELETED);
    }
  }, [side, dispatch, toast]);

  return (
    <ModalWrapper
      header="Delete Dead Man's Switch"
      onClose={onClose}
      isOpen={isOpen}
    >
      <Text mb={4}>
        Are you sure you want to delete <i>{name}</i>?
      </Text>
      <Checkout onClose={onClose} onClick={deleteDMS} onClickTitle="Delete" />
    </ModalWrapper>
  );
}

export function Checkout({
  onClose,
  onClick,
  onClickTitle
}: {
  onClose: () => void;
  onClick: () => void;
  onClickTitle: string;
}) {
  return (
    <Flex mt={4} mx={-1} alignItems={"center"} justifyContent={"flex-end"}>
      <Button variant={"secondary"} onClick={onClose} mx={1}>
        Cancel
      </Button>
      <Button variant={"primary"} mx={1} onClick={onClick}>
        {onClickTitle}
      </Button>
    </Flex>
  );
}

export default DeleteModal;
