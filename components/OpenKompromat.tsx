import { Button } from "@chakra-ui/react";
import LitJsSdk from "lit-js-sdk";
import React, { useCallback, useMemo } from "react";
import { dataURItoBlob } from "../helpers";
import { CHAIN } from "../helpers/constants";

export function OpenKompromat({ encryptData: meData }: any) {
  const litNodeClient = useMemo(() => {
    const litNodeClient = new LitJsSdk.LitNodeClient();
    litNodeClient.connect();
    return litNodeClient;
  }, []);

  const download = useCallback(async () => {
    const {
      evmContractConditions, encryptedData, encryptedSymmetricKeyString,
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
}
