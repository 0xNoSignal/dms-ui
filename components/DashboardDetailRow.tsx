import { Td, Tr } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import {
  useEffect,
  useMemo,
  useState
} from "react";
import { useProvider } from "wagmi";
import { ActionArea } from "./ActionArea";
import { AssumedDeadIn } from "./AssumedDeadIn";
import {  Name } from "./Dashboard";


interface IDashboardDetailRow {
  id: number;
  fileUrl: string;
  owner: string;
  lastHeartbeat: BigNumber;
  cadence: BigNumber;
  blockNumber?: number;
  account?: string;
}

export function DashboardDetailRow({
  id, fileUrl, owner, lastHeartbeat, cadence, blockNumber, account,
}: IDashboardDetailRow) {
  const [data, setData] = useState();

  const provider = useProvider();

  const [timestamp, setTimeStamp] = useState<Date>();

  useEffect(() => {
    const run = async () => {
      console.log("GO fileUrl", fileUrl);
      const downloadUrl = "https://arweave.net/" + fileUrl;
      try {
        const data = await fetch(downloadUrl);
        const json = await data.json();
        if (json.name) {
          setData(json);
        }
      } catch (err) { }
    };

    if (fileUrl && fileUrl.length > 0) {
      run();
    }
  }, [fileUrl]);

  const isYou = useMemo(() => {
    if (!account)
      return;
    return account.toLowerCase() === owner.toLowerCase();
  }, [account, owner]);

  const isDead = useMemo(() => {
    if (!blockNumber)
      return;
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
    if (!timestamp)
      return;
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
        id={id} />
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
        switchId={id} />
    </Tr>
  );
}
