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
  useToast,
} from "@chakra-ui/react";
// @ts-ignore
import LitJsSdk from "lit-js-sdk";
import { BigNumber } from "ethers";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useAccount,
  useBlockNumber,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
} from "wagmi";
import { dataURItoBlob, secondsToDhms } from "../helpers";
import ABI from "../helpers/ABI";
import {
  ASSUMED_BLOCK_TIME,
  CHAIN,
  CHAIN_ID,
  getContractAddress,
} from "../helpers/constants";
import {
  ERROR_FETCHING_COUNTER,
  NOT_CONNECTED,
  UPDATE_HEARTBEAT,
  UPDATE_HEARTBEAT_ERROR,
} from "../helpers/toast";
import {
  AppContext,
  MANAGEMENT_STATUS,
  startNewDms,
  switchToManage,
} from "../helpers/state";

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
      overflow={"hidden"}
      borderRadius={"25px 25px 0 0"}
      zIndex={12}
      bg={bg}
      mt={10}
      pt={{
        base: 6,
        md: 14,
      }}
      px={{
        base: 4,
        md: 12,
      }}
      pos="absolute"
      w="100%"
      bottom={{
        base: 0,
        md: "auto",
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

interface IFeedbackSwitch {
  id: number;
  onlyOwner: string;
  fileUrl: string;
  cadence: BigNumber;
  blockHeartbeat: BigNumber;
  active: boolean;
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
  const { data, error, isLoading } = useContractRead({
    addressOrName: getContractAddress(CHAIN_ID),
    contractInterface: ABI,
    functionName: "getSwitchForSwitchId",
    args: String(id),
    watch: true,
  });

  if (isLoading) return <Skeleton w="100%" height="20px" />;
  const { onlyOwner, fileUrl, cadence, blockHeartbeat, active } = data as any;

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

interface IDashboardDetailRow {
  id: number;
  fileUrl: string;
  owner: string;
  lastHeartbeat: BigNumber;
  cadence: BigNumber;
  blockNumber?: number;
  account?: string;
}

const DashboardDetailRow = ({
  id,
  fileUrl,
  owner,
  lastHeartbeat,
  cadence,
  blockNumber,
  account,
}: IDashboardDetailRow) => {
  const [data, setData] = useState();

  const provider = useProvider();

  const [timestamp, setTimeStamp] = useState<Date>();

  useEffect(() => {
    const run = async () => {
      const downloadUrl = "https://arweave.net/" + fileUrl;
      try {
        const data = await fetch(downloadUrl);

        const encryptedData = JSON.parse(await data.text());
        if (encryptedData.name) {
          setData(encryptedData);
        }
      } catch (err) {}
    };

    if (fileUrl && fileUrl.length > 0) {
      run();
    }
  }, [fileUrl]);

  const isYou = useMemo(() => {
    if (!account) return;
    return account.toLowerCase() === owner.toLowerCase();
  }, [account, owner]);

  const isDead = useMemo(() => {
    if (!blockNumber) return;
    const wenDead = lastHeartbeat.add(cadence).toNumber();
    return wenDead < blockNumber;
  }, [lastHeartbeat, blockNumber, cadence]);

  useEffect(() => {
    if (provider) {
      const go = async () => {
        const date = await provider
          .getBlock(lastHeartbeat.toNumber())
          .then((block: any) => {
            return new Date(block.timestamp * 1000);
          });
        setTimeStamp(date);
      };

      go();
    }
  }, [lastHeartbeat, provider]);

  const timeStampeFormated = useMemo(() => {
    if (!timestamp) return;
    return (
      [
        timestamp.getMonth() + 1,
        timestamp.getDate(),
        timestamp.getFullYear(),
      ].join("/") +
      " " +
      [timestamp.getHours(), timestamp.getMinutes()].join(":")
    );
  }, [timestamp]);

  return (
    <Tr>
      <Td isNumeric>{id}</Td>
      <Name data={data} />
      <Td
        display={{
          base: "none",
          md: "table-cell",
        }}
      >
        {isYou
          ? "you"
          : `${owner.substring(0, 6)}...${owner.substring(owner.length - 4)}`}
      </Td>
      <AssumedDeadIn
        lastHeartbeat={lastHeartbeat}
        cadence={cadence}
        blockNumber={blockNumber}
        isDead={isDead}
      />
      <Td
        display={{
          base: "none",
          md: "table-cell",
        }}
      >
        {timeStampeFormated}
      </Td>
      <ActionArea
        encryptData={data}
        isYou={isYou}
        isDead={isDead}
        switchId={id}
      />
    </Tr>
  );
};

const Name = ({ data }: { data?: any }) => {
  if (!data) {
    const {name} = data;
    return (
      <Td>
        <Skeleton w="100%" height="20px" />
      </Td>
    );
  }
  return <Td overflowX={"hidden"}>{data?.name}</Td>;
};

const ActionArea = ({ isYou, isDead, switchId, encryptData }: any) => {
  if (encryptData?.version !== "0.2.0") return <Td />;
  if (encryptData?.version === "0.2.0" && isDead)
    return (
      <Td>
        <OpenKompromat encryptData={encryptData} />
      </Td>
    );

  if (!isYou) return <Td />;
  if (!isDead)
    return (
      <Td>
        <SendHeartBeat switchId={switchId} />
      </Td>
    );
  return <Td />;
};

const OpenKompromat = ({ encryptData: meData }: any) => {
  const litNodeClient = useMemo(() => {
    const litNodeClient = new LitJsSdk.LitNodeClient();
    litNodeClient.connect();
    return litNodeClient;
  }, []);

  const download = useCallback(async () => {
    const {
      evmContractConditions,
      encryptedData,
      encryptedSymmetricKeyString,
    } = meData;
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: CHAIN });
    const symmetricKey = await litNodeClient.getEncryptionKey({
      evmContractConditions: evmContractConditions,
      // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
      toDecrypt: encryptedSymmetricKeyString,
      chain: CHAIN,
      authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
      dataURItoBlob(encryptedData),
      symmetricKey
    );

    const originalFormat = atob(decryptedString);

    var a = document.createElement("a"); //Create <a>
    a.href = originalFormat; //Image Base64 Goes here
    a.download = `Image.png`; //File name Here
    a.click(); //Downloaded file
  }, [meData, litNodeClient]);

  return (
    <Button
      fontWeight={"medium"}
      variant="ghost"
      onClick={download}
      _hover={{ color: "brown" }}
      size={{
        base: "sm",
        md: "md",
      }}
    >
      🪦 Open Kompromat
    </Button>
  );
};

const SendHeartBeat = ({ switchId }: { switchId: number }) => {
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
    if (!writeAsync) return;
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
};

interface IAssumedDeadIn {
  lastHeartbeat: BigNumber;
  cadence: BigNumber;
  blockNumber?: number;
  isDead?: boolean;
}

const AssumedDeadIn = ({
  lastHeartbeat,
  cadence,
  blockNumber,
  isDead,
}: IAssumedDeadIn) => {
  const timeLeft = useMemo(() => {
    const wenDead = lastHeartbeat.add(cadence).toNumber();
    const blocksLeft = wenDead - (blockNumber ? blockNumber : 0);
    const timeLeft = blocksLeft * ASSUMED_BLOCK_TIME;

    return timeLeft;
  }, [cadence, lastHeartbeat, blockNumber]);

  const [secondsLeft, setSecondsLeft] = useState<number>(timeLeft);

  useEffect(() => {
    secondsLeft > 0 &&
      setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
  }, [secondsLeft]);
  if (!blockNumber)
    return (
      <Td>
        <Skeleton h={"20px"} />
      </Td>
    );
  if (isDead || secondsLeft <= 0) return <Td>😵 Dead</Td>;
  return <Td>{secondsToDhms(secondsLeft)}</Td>;
};
