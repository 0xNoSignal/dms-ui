/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Collapse,
  Fade,
  Flex,
  Heading,
  Icon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
// @ts-ignore
import { WebBundlr } from "@bundlr-network/client";
import { ethers, providers } from "ethers";
// @ts-ignore
import LitJsSdk from "lit-js-sdk";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction
} from "wagmi";
import {
  blobToDataURI,
  createEVMContractConditions
} from "../helpers";
import ABI from "../helpers/ABI";
import {
  AVG_BLOCKS_PER_DAY,
  CHAIN,
  CHAIN_ID,
  getContractAddress
} from "../helpers/constants";
import { AppContext, reset } from "../helpers/state";
import {
  BUNDLR_READY,
  ENCODE_FILE_ERROR,
  ENCRYPTING_FILE,
  ENCRYPTING_FILE_SUCCESS,
  FAILED_TO_FUND,
  FAILED_TO_MINT,
  FAILED_TO_UPDATE,
  FAIL_TO_UPLOAD,
  FUNDS_TO_LOW,
  MINTING,
  NOT_ENOUGH_FUNDS,
  SOMETHING_WENT_WRONG,
  START_FUND,
  SUCCESS_TO_FUND,
  SUCCESS_TO_MINT,
  SUCCESS_TO_UPDATE,
  SUCCESS_TO_UPLOAD,
  SWITCHED_NETWORK,
  SWITCHING_NETWORK,
  UPDATING_DMS
} from "../helpers/toast";
import TickIcon from "./TickIcon";

const border = "1px solid rgba(255, 255, 255, 0.3)";

const StepNumber = ({
  number,
  active,
}: {
  number: number;
  active: boolean;
}) => {
  return (
    <Flex mr={4} flexDir="column" alignItems={"center"}>
      <Text
        textAlign={"center"}
        p={1}
        w={8}
        h={8}
        bg="brandGreen.400"
        borderRadius={25}
        color="white"
      >
        {!active && number}

        <Fade in={active}>
          <Icon mt={0.5} as={TickIcon} w={5} h={5} />
        </Fade>
      </Text>
      <Box w={"1px"} h="100%" bg="brandGreen.400" my={2} />
    </Flex>
  );
};


type UPLOAD_STAGES =
  | "UPLOADING"
  | "ENCRYPTING"
  | "UPLOAD_SUCCESS"
  | "FUNDING"
  | "FUND_SUCCESS"
  | "INIT"
  | "DEFAULT";

export default function CreateDMSModal({ onClose, isOpen }: any) {
  const bg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(0,0,0,0.5)");
  const initialRef = useRef(null);
  const toast = useToast();
  const [switchId, setSwitchId] = useState<string>();
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [isUploading, setIsUploading] = useState<UPLOAD_STAGES>("DEFAULT");
  const [arweaveId, setArweaveId] = useState<string>();
  const loadingStages = useMemo(() => {
    switch (isUploading) {
      case "UPLOADING":
        return "Uploading";
      case "ENCRYPTING":
        return "Encrypting";
      case "UPLOAD_SUCCESS":
        return "Upload Success";
      case "FUNDING":
        return "Funding";
      case "FUND_SUCCESS":
        return "Funding Success";
      case "INIT":
        return "Initalizing Bundlr";
      default:
        return "Upload";
    }
  }, [isUploading]);

  const status = useMemo(() => {
    if (!switchId) {
      return 0;
    }
    if (!arweaveId) {
      return 1;
    }
    if (!isUpdated) {
      return 2;
    }
    return 3;
  }, [switchId, arweaveId, isUpdated]);

  const contractAddress = useMemo(() => {
    return getContractAddress(CHAIN_ID);
  }, []);

  const [imageFile, setImageFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const litNodeClient = useMemo(() => new LitJsSdk.LitNodeClient(), []);
  litNodeClient.connect();

  const {
    appState: { name, address, file, interval },
    dispatch,
  } = useContext(AppContext);

  const { address: mintaddress } = useAccount();
  const overrides = {
    from: mintaddress,
    value:
      mintaddress === "0x71093acAdD6Cf1Ef5F8CCf898F2d7fb3F42e151d"
        ? ethers.utils.parseEther("0")
        : ethers.utils.parseEther("6"),
  }

  const { config: mintDMSConfig, error } = usePrepareContractWrite({
    addressOrName: getContractAddress(CHAIN_ID),
    contractInterface: ABI,
    functionName: "mint",
    args: [address, Math.floor(AVG_BLOCKS_PER_DAY * interval * 7)],
    chainId: CHAIN_ID,
    overrides,
    onError(error) {
      toast(NOT_ENOUGH_FUNDS)
    },
  });


const  notEnoughFunds = useMemo(() => {
  if (error) {
    return true;
  }
  return false
}, [error])
  
  const { config: updateDMSconfig } = usePrepareContractWrite({
    addressOrName: getContractAddress(CHAIN_ID),
    contractInterface: ABI,
    functionName: "update",
    args: [switchId, arweaveId],
    chainId: CHAIN_ID,
  });

  const { data: mintData, writeAsync: mintDMS } = useContractWrite(mintDMSConfig);

  const { data: updateData, writeAsync: updateDMS } =
    useContractWrite(updateDMSconfig);

  /**
   * @description - This is the function that will be called when the user clicks on the mint button, it tracks the transaction and updates the state
   */
  useWaitForTransaction({
    hash: mintData?.hash,
    chainId: CHAIN_ID,
    onSuccess(data) {
      let abi = [
        "event SwitchMinted(uint256 switchId, uint256 blockHeartbeat, address owner)",
      ];
      let iface = new ethers.utils.Interface(abi);
      data.logs.forEach((log: any) => {
        try {
          let event = iface.parseLog(log);
          console.log("event", event);
          if (event.name === "SwitchMinted") {
            setSwitchId(event.args[0].toString());
            toast(SUCCESS_TO_MINT(event.args[0].toString()));
          }
        } catch (e) {}
      });
    },
  });

  useWaitForTransaction({
    hash: updateData?.hash,
    chainId: CHAIN_ID,
    onSuccess(data) {
      let abi = ["event SwitchUpdated(uint256 switchId)"];
      let iface = new ethers.utils.Interface(abi);
      data.logs.forEach((log: any) => {
        try {
          let event = iface.parseLog(log);
          console.log("event", event);
          if (event.name === "SwitchUpdated") {
            setIsUpdating(false);
            setIsUpdated(true);
            toast(SUCCESS_TO_UPDATE(event.args[0].toString()));
          }
        } catch (e) {}
      });
    },
  });

  /**
   * @description - This function is used to mint the DMS
   */
  const mintMyDMS = useCallback(async () => {
    if (notEnoughFunds) {
      toast(NOT_ENOUGH_FUNDS)
    }
    if (!mintDMS) return;
    setIsMinting(true);
    toast(MINTING);
    mintDMS().catch((e) => {
      setIsMinting(false);
      toast(FAILED_TO_MINT(e));
    });
  }, [mintDMS, toast, notEnoughFunds]);

  /**
   * @description - This function is used to update the DMS
   */
  const updateMyDMS = useCallback(async () => {
    if (!updateDMS || !switchId) return;
    setIsUpdating(true);
    toast(UPDATING_DMS(switchId));
    updateDMS().catch((e) => {
      setIsUpdating(false);
      toast(FAILED_TO_UPDATE(e));
    });
  }, [updateDMS, toast, switchId]);

  /**
   * Turns file into a data URI
   */
  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const dataURL = e?.target?.result;
      console.log("DataURL:", dataURL);
      setImageFile(dataURL);
    };
    fileReader.onerror = (e) => {
      toast(ENCODE_FILE_ERROR);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }, [file, toast]);

  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: 137,
  });
  const { chain } = useNetwork();

  const initBundlr = useCallback(async () => {
    if (window && switchNetworkAsync) {
      if (chain?.id !== 137) {
        toast(SWITCHING_NETWORK);
        await switchNetworkAsync()
          .then(() => {
            return toast(SWITCHED_NETWORK);
          })
          .catch(() => {
            setIsUploading("DEFAULT");
          });
      }

      /**
       * @TODO: This is a hack to get the bundlr instance to work
       */
      // @ts-ignore
      await window?.ethereum?.enable();

      // @ts-ignore
      const provider = new providers.Web3Provider(window?.ethereum);
      await provider._ready();

      const bundlr = new WebBundlr(
        "https://node1.bundlr.network",
        "matic",
        provider
      );
      await bundlr.ready();
      toast(BUNDLR_READY);

      return bundlr;
    }
  }, [chain, switchNetworkAsync, toast]);

  const evmContractConditions = useMemo(() => {
    if (!switchId || !contractAddress) return undefined;
    return createEVMContractConditions({
      switchId,
      chain: CHAIN,
      contractAddress,
    });
  }, [contractAddress, switchId]);

  const encryptInitalizeFundAndUpload = useCallback(async () => {
    if (!imageFile || !evmContractConditions || !switchNetworkAsync) return;
    try {
      setIsUploading("ENCRYPTING");
      toast(ENCRYPTING_FILE);
      const fileInBase64 = btoa(imageFile as string);
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: CHAIN,
      }).catch(() => {
        setIsUploading("DEFAULT");
      });

      // Visit here to understand how to encrypt static content
      // https://developer.litprotocol.com/docs/LitTools/JSSDK/staticContent
      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        fileInBase64
      );
      console.log("evmContractConditions", evmContractConditions);
      const encryptedSymmetricKey = await litNodeClient
        .saveEncryptionKey({
          // accessControlConditions: accessControlConditions,
          evmContractConditions: evmContractConditions,
          symmetricKey,
          authSig,
          chain: CHAIN,
        })
        .catch(() => {
          setIsUploading("DEFAULT");
        });

      console.log("encryptedSymmetricKey", encryptedSymmetricKey);
      const encryptedSymmetricKeyString = LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16"
      );
      console.log("encryptedSymmetricKeyString", encryptedSymmetricKeyString);

      console.log("encryptedString:", encryptedString);

      const encryptedStringInDataURI = await blobToDataURI(encryptedString);

      console.log("encryptedStringInDataURI:", encryptedStringInDataURI);
      toast(ENCRYPTING_FILE_SUCCESS);
      setIsUploading("INIT");
      const myBundlr = await initBundlr();
      if (!myBundlr) {
        setIsUploading("DEFAULT");
        return;
      }

      const packagedData = {
        encryptedData: encryptedStringInDataURI,
        evmContractConditions: evmContractConditions,
        encryptedSymmetricKeyString: encryptedSymmetricKeyString,
        name,
        version: "0.2.0",
      };

      console.log("packagedData:", packagedData);

      const packagedDataInString = JSON.stringify(packagedData);
      const balance = await myBundlr.getLoadedBalance();

      const tx = myBundlr.createTransaction(packagedDataInString);
      const size = tx.size;
      const cost = await myBundlr.getPrice(size);

      // If you don't have enough balance for the upload
      if (balance.isLessThan(cost)) {
        setIsUploading("FUNDING");
        toast(FUNDS_TO_LOW);
        // Fund your account with the difference
        // We multiply by 1.1 to make sure we don't run out of funds
        toast(START_FUND);
        await myBundlr
          .fund(cost)
          .then(async (res) => {
            toast(SUCCESS_TO_FUND(res));
            setIsUploading("UPLOADING");
            await tx.sign();
            await tx
              .upload()
              .then((res) => {
                setIsUploading("UPLOAD_SUCCESS");
                toast(SUCCESS_TO_UPLOAD(res));
                console.log("res?.data.id", res?.data.id);
                if (res?.data.id) {
                  setArweaveId(res.data.id);
                }
                setIsUploading("DEFAULT");
              })
              .catch((e) => {
                toast(FAIL_TO_UPLOAD(e));
                setIsUploading("DEFAULT");
              });
          })
          .catch((e) => {
            setIsUploading("DEFAULT");
            toast(FAILED_TO_FUND(e));
          });
      } else {
        setIsUploading("UPLOADING");
        await tx.sign();
        await tx
          .upload()
          .then((res) => {
            setIsUploading("UPLOAD_SUCCESS");
            toast(SUCCESS_TO_UPLOAD(res));
            console.log("res?.data.id", res?.data.id);
            if (res?.data.id) {
              setArweaveId(res.data.id);
            }
            setIsUploading("DEFAULT");
          })
          .catch((e) => {
            setIsUploading("DEFAULT");
            toast(FAIL_TO_UPLOAD(e));
          });
      }
    } catch (e) {
      setIsUploading("DEFAULT");
      toast(SOMETHING_WENT_WRONG(e));
    }
  }, [
    imageFile,
    toast,
    initBundlr,
    evmContractConditions,
    litNodeClient,
    switchNetworkAsync,
    name,
  ]);

  const byebye = useCallback(async () => {
    dispatch(reset());
    onClose();
  }, [onClose, dispatch]);

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay backdropFilter="blur(5px)" />

      <ModalContent
        backdropFilter={"blur(5px)"}
        boxShadow={"0 4px 30px rgba(0, 0, 0, 0.1)"}
        borderRadius={16}
        border={border}
        bg={bg}
        py={4}
      >
        <ModalHeader>CREATE A DMS</ModalHeader>
        <ModalCloseButton onClick={status === 3 ? byebye : onClose} />
        <ModalBody>
          <Flex>
            <StepNumber number={1} active={status > 0} />
            <Box w="100%">
              <Heading fontSize={22} as="h3" mb={2}>
                {" "}
                Mint the DMS token
              </Heading>
              <Collapse in={status === 0} animateOpacity>
                <Box w="100%">
                  <Text>
                    In order to move forward, you need to mint the DMS token.
                  </Text>
                  <Flex justifyContent="flex-end" p={4} w="100%">
                    <Button
                      variant="primary"
                      onClick={mintMyDMS}
                      loadingText={"Minting..."}
                      isLoading={isMinting}
                      isDisabled={isMinting}
                    >
                      Mint
                    </Button>
                  </Flex>
                </Box>
              </Collapse>
            </Box>
          </Flex>
          <Flex>
            <StepNumber number={2} active={status > 1} />
            <Box w="100%">
              <Heading fontSize={22} as="h3" mb={2}>
                Encrypt and upload file
              </Heading>
              <Collapse in={status === 1} animateOpacity>
                <Box w="100%">
                  <Text>
                    <UnorderedList>
                      <ListItem>Encrypt your file</ListItem>
                      <ListItem>Connect to bundlr node</ListItem>
                      <ListItem>Fund bundlr node</ListItem>
                      <ListItem>Upload file via bundlr to arweave</ListItem>
                    </UnorderedList>
                  </Text>
                  <Flex justifyContent="flex-end" p={4} w="100%">
                    <Button
                      disabled={isUploading !== "DEFAULT"}
                      isLoading={isUploading !== "DEFAULT"}
                      loadingText={loadingStages}
                      variant="primary"
                      onClick={encryptInitalizeFundAndUpload}
                    >
                      Start Process
                    </Button>
                  </Flex>
                </Box>
              </Collapse>
            </Box>
          </Flex>
          <Flex>
            <StepNumber number={3} active={status > 2} />
            <Box w="100%">
              <Heading fontSize={22} as="h3" mb={2}>
                Update your DMS
              </Heading>
              <Collapse in={status === 2} animateOpacity>
                <Box w="100%">
                  <Text>
                    In order to track your DMS, you need to update the DMS on
                    the contract level.
                  </Text>
                  <Flex justifyContent="flex-end" mx={-1} p={4} w="100%">
                    <Button
                      loadingText="Updating DMS..."
                      disabled={isUpdating}
                      isLoading={isUpdating}
                      mx={0.5}
                      variant="primary"
                      onClick={updateMyDMS}
                    >
                      Update DMS
                    </Button>
                  </Flex>
                </Box>
              </Collapse>
            </Box>
          </Flex>
          {status === 3 && (
            <Button onClick={byebye} w="100%" variant="primary">
              Congrats your DMS is live. Bye
            </Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
