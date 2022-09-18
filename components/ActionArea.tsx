import { Td } from "@chakra-ui/react";
import { OpenKompromat } from "./OpenKompromat";
import { SendHeartBeat } from "./SendHeartBeat";

export function ActionArea({ isYou, isDead, switchId, encryptData }: any) {
  if (encryptData?.version !== "0.2.0")
    return <Td />;
  if (encryptData?.version === "0.2.0" && isDead)
    return (
      <Td>
        <OpenKompromat encryptData={encryptData} />
      </Td>
    );

  if (!isYou)
    return <Td />;
  if (!isDead)
    return (
      <Td>
        <SendHeartBeat switchId={switchId} />
      </Td>
    );
  return <Td />;
}
