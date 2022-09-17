/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { CardWrapper } from "./Intro";
import DeleteModal from "./DeleteModal";
import { AppContext } from "../helpers/state";
import ChangeHeartBeatModal from "./ChangeHeartBeatModal";
import { useEnsName } from "wagmi";
import CreateDMSModal from "./CreateDMSModal";
import { AVG_BLOCKS_PER_DAY } from "../helpers/constants";

export function Overview() {
  const {
    appState: { interval, name, file, bucket, address },
  } = useContext(AppContext);

  const { data: ensname } = useEnsName({
    address,
  });

  const heartbeat = useMemo(() => {
    return interval * AVG_BLOCKS_PER_DAY * 7;
  }, [interval]);

  const {
    isOpen: isHeartbeatModalOpen,
    onOpen: onOpenHeartBeatModal,
    onClose: onCloseHeartBeatModal,
  } = useDisclosure();

  const {
    isOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const {
  isOpen: isCreateDMSModalOpen,
  onOpen: onOpenCreateDMSModal,
  onClose: onCloseCreateDMSModal,
} = useDisclosure();

  const displayAddress = useMemo(() => {
    if (ensname) {
      return ensname;
    }
    if (address) {
      return `${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )}`;
    }
    return null;
  }, [ensname, address]);

  return (
    <>
      <CardWrapper
        maxW={{
          base: 900,
        }}
        
      >
        <Box px={2} minW={{
          md: 500
        }}>
          <Box mb={16}>
            <Text
              variant={"header"}
              fontSize={{
                base: 12,
                md: 20,
              }}
            >
              Dead Man's Switch
            </Text>
            <Text variant="subline" fontSize={24}>
              {name}
            </Text>
          </Box>
          <Flex mx={-2} alignItems={"flex-end"} mb={6} flexWrap="wrap">
            <Box flex={1} mx={2}>
              <Text variant={"header"}>Files</Text>
              <Text variant="subline">{file?.name}</Text>
            </Box>
            <Box flex={1} mx={2} textAlign={{
                base: "end",
                md: "end",
              }}>
              <Text variant={"header"}>Stored on</Text>
              <Text variant="subline">{bucket}</Text>
            </Box>
            {/* <Box
              mx={2}
              textAlign={{
                base: "center",
                md: "end",
              }}
              flex={1}
            >
              <Button variant={"third"}>Manage Files / Permissions</Button>
            </Box> */}
          </Flex>
          <Flex mx={-2} alignItems={"flex-end"} mb={6} flexWrap="wrap">
            <Box flex={1} mx={2}>
              <Text variant={"header"}>Heartbeat</Text>
              <Text variant="subline">
                Every {heartbeat} blocks (~{interval} weeks)
              </Text>
            </Box>
            <Box
              mx={2}
              textAlign={{
                base: "end",
                md: "end",
              }}
              flex={1}
            >
              <Button variant={"third"} onClick={onOpenHeartBeatModal}>
                Change Heartbeat
              </Button>
            </Box>
          </Flex>
          <Flex mx={-2} alignItems={"flex-end"} mb={6} flexWrap="wrap">
            <Box mx={2} flex={1}>
              <Text variant={"header"}>Owner</Text>
              <Text variant="subline">{displayAddress || "🤷🏻‍♂️"}</Text>
            </Box>
            {/* <Box
              mx={2}
              textAlign={{
                base: "end",
                md: "end",
              }}
              flex={1}
            >
              <Button variant={"third"}>Change Owner</Button>
            </Box> */}
          </Flex>
          <Flex justifyContent={"center"} mx={4}>
            <Button variant={"primary"} onClick={onOpenCreateDMSModal}>Create Dead Man's Switch</Button>
          </Flex>
          <Flex justifyContent={"center"}>
            <Button fontSize={14} variant={"third"} onClick={onOpenDeleteModal}>
              Delete {name}
            </Button>
          </Flex>
        </Box>
      </CardWrapper>
      <DeleteModal isOpen={isOpen} onClose={onCloseDeleteModal} />
      <ChangeHeartBeatModal
        isOpen={isHeartbeatModalOpen}
        onClose={onCloseHeartBeatModal}
      />
      <CreateDMSModal isOpen={isCreateDMSModalOpen} onClose={onCloseCreateDMSModal} />
    </>
  );
}
