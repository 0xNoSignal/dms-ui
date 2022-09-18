/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
// @ts-ignore
import { BigNumber } from "ethers";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo} from "react";
import {
  useAccount,
  useBlockNumber,
  useContractRead} from "wagmi";
import ABI from "../helpers/ABI";
import {
  CHAIN_ID,
  getContractAddress
} from "../helpers/constants";
import {
  AppContext,
  MANAGEMENT_STATUS,
  startNewDms,
  switchToManage
} from "../helpers/state";
import {
  ERROR_FETCHING_COUNTER,
  NOT_CONNECTED
} from "../helpers/toast";
import { DashboardDetailRow } from "./DashboardDetailRow";

export default function Dashboard({ address }: { address?: string }) {
  const { isConnected } = useAccount();
  const toast = useToast();
  const { dispatch } = useContext(AppContext);

  const start = useCallback(
    (state: MANAGEMENT_STATUS) => () => {
      if (isConnected && address) {
        if (state === "MANAGE") {
          dispatch(switchToManage());
        }
        if (state === "NEW") {
          dispatch(startNewDms(address));
        }
      } else {
        toast(NOT_CONNECTED);
      }
    },
    [dispatch, toast, isConnected, address]
  );
  const blockNumber = useBlockNumber({
    chainId: CHAIN_ID,
    watch: false,
  });

  const {
    data: counter,
    isError,
    isLoading,
    error,
  } = useContractRead({
    addressOrName: getContractAddress(CHAIN_ID),
    contractInterface: ABI,
    functionName: "counter",
    watch: true,
  });

  useEffect(() => {
    if (isError) {
      console.log("error", error);
      toast(ERROR_FETCHING_COUNTER);
    }
  }, [isError, toast, error]);

  const counterValue = useMemo(() => {
    return counter && counter.toNumber();
  }, [counter]);
  const bg = useColorModeValue("white", "brandGreen.900");
  const boxShadow = useColorModeValue(
    "0px 2px 50px rgba(0,0,0, 0.13732)",
    "0px 2px 10px rgba(255,255,255, 0.3)"
  );

  return (
    <Box
      boxShadow={boxShadow}
      overflowY={"scroll"}
      borderRadius={"25px 25px 0 0"}
      zIndex={12}
      bg={bg}
      mt={10}
      py={{
        base: 6,
        md: 14,
      }}
      px={{
        base: 4,
        md: 12,
      }}
      maxH={{
        base: "60%",
        md: "30%",
        lg: "30%",
      }}
      h="auto"
      pos="absolute"
      w="100%"
      bottom={{
        base: 0,
        // md: "auto",
      }}
    >
      <Button
        onClick={start("NEW")}
        fontWeight={"normal"}
        variant={"primary"}
        size="lg"
        w="100%"
        mb={4}
        display={{
          base: "block",
          md: "none",
        }}
      >
        Create new Dead Man's Switch
      </Button>
      <Box overflowY="scroll" maxH={"50%"}>
        <Heading>Dead Man's Switches</Heading>
        <Table
          size={{
            base: "sm",
            md: "md",
          }}
          variant={"simple"}
        >
          <Thead fontWeight={"light"}>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th> Name </Th>
              <Th
                display={{
                  base: "none",
                  md: "table-cell",
                }}
              >
                Owner
              </Th>
              <Th>Assumed dead In </Th>
              <Th
                display={{
                  base: "none",
                  md: "table-cell",
                }}
              >
                Last heartbeat{" "}
              </Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {isLoading && <Skeleton w="100%" height="20px" />}
            {!isLoading &&
              counterValue &&
              [...Array(counterValue)].map((_, index) => (
                <WrappedDetailRow
                  key={`detail-row-${index}`}
                  id={index}
                  blockNumber={blockNumber.data}
                  account={address}
                />
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}


const WrappedDetailRow = ({
  id,
  account,
  blockNumber,
}: {
  id: number;
  account?: string;
  blockNumber?: number;
}) => {
  const { data, isLoading } = useContractRead({
    addressOrName: getContractAddress(CHAIN_ID),
    contractInterface: ABI,
    functionName: "getSwitchForSwitchId",
    args: String(id),
    watch: true,
  });

  if (isLoading) return <Skeleton w="100%" height="20px" />;
  const { onlyOwner, fileUrl, cadence, blockHeartbeat } = data as any;

  return (
    <DashboardDetailRow
      id={id}
      owner={onlyOwner}
      cadence={cadence}
      lastHeartbeat={blockHeartbeat}
      blockNumber={blockNumber}
      account={account}
      fileUrl={fileUrl}
    />
  );
};

 
export const Name = ({ data }: { data?: any }) => {
  if (!data) {
    return (
      <Td>
        <Skeleton w="100%" height="20px" />
      </Td>
    );
  }
  if (data && data.name) {
    return <Td overflowX={"hidden"}>{`${data.name}`}</Td>;
  }

  return <Td />
};


