import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { IModalWrapper } from "./interfaces";

const border = "1px solid rgba(255, 255, 255, 0.3)"

function ModalWrapper({ children, header, isOpen, onClose }: IModalWrapper) {
  const bg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(0,0,0,0.5)");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      <ModalContent backdropFilter={"blur(5px)"} boxShadow={"0 4px 30px rgba(0, 0, 0, 0.1)"} borderRadius={16} border={border} bg={bg} py={4}>
        <ModalCloseButton />
        <ModalHeader fontWeight={"bold"}>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalWrapper
