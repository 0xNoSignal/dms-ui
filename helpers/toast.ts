import { RenderProps, UseToastOptions } from "@chakra-ui/react";

const STANDARD = {
  duration: 2500,
  isClosable: true,
  position: "bottom-right",
};

export const NOT_CONNECTED = {
  title: "Not connected",
  description: `Please connect your wallet to our website first.`,
  status: "error",
  ...STANDARD,
} as UseToastOptions;

export const SUCCESS_DELETED = {
  title: "Deleted",
  description: "Successfully deleted Dead Man's Switch.",
  status: "success",
  ...STANDARD,
} as UseToastOptions;

export const NO_EMPTY_SPACE = {
  title: "Name cannot contain empty spaces.",
  status: "error",
  ...STANDARD,
} as UseToastOptions;

export const INTERVAL_CHANGED = {
  title: "Interval changed",
  status: "info",
  ...STANDARD
} as UseToastOptions;

export const ENCODE_FILE_ERROR = {
  title: "Could not encode selected file",
  status: "error",
  ...STANDARD
} as UseToastOptions;

export const FUNDS_TO_LOW = {
  title: "Funds to low",
  description: "We need to fund the bundlr node with MATIC",
  status: "info",
  ...STANDARD
} as UseToastOptions;

export const FAILED_TO_FUND = (e: any) => ({
  title: "Failed to fund",
  description: e.data?.message || e.message,
  status: "error",
  ...STANDARD,
}) as UseToastOptions;

export const SUCCESS_TO_FUND = (res: any) => ({
  status: "success",
  title: `Funded ${res?.target}`,
  description: ` tx ID : ${res?.id}`,
  ...STANDARD,
}) as UseToastOptions;

export const SOMETHING_WENT_WRONG = (e: any) => ({
  title: "Something went wrong",
  description: e.data?.message || e.message,
  status: "error",
  ...STANDARD,
}) as UseToastOptions;

export const START_FUND = {
  title: "Funding...",
  status: "info",
  description: "Please wait while we fund the bundlr node. This can take up to 2 minutes.",
  ...STANDARD,
  duration: 20000
} as UseToastOptions;

export const ENCRYPTING_FILE = {
  title: "Encrypting file...",
  status: "info",
  ...STANDARD
} as UseToastOptions;

export const ENCRYPTING_FILE_SUCCESS = {
  title: "File encrypted",
  status: "success",
  ...STANDARD
} as UseToastOptions;

export const SWITCHING_NETWORK = {
  title: "Switching network...",
  status: "info",
  ...STANDARD
} as UseToastOptions;


export const SWITCHED_NETWORK = {
  title: "Switched network",
  status: "info",
  ...STANDARD
} as UseToastOptions;

export const BUNDLR_READY = {
  title: "Bundlr ready",
  status: "success",
  ...STANDARD
} as UseToastOptions;

export const SUCCESS_TO_UPLOAD = (res: any ) => ({
  status: res?.status === 200 || res?.status === 201 ? "success" : "error",
  title: res?.status === 200 || res?.status === 201 ? "Successful!" : `Unsuccessful! ${res?.status}`,
  description: res?.data.id ? `https://arweave.net/${res.data.id}` : undefined,
  ...STANDARD,
  duration: 15000,
}) as UseToastOptions;

export const FAIL_TO_UPLOAD = (e: any) => ({ status: "error", title: `Failed to upload - ${e}`, ...STANDARD }) as UseToastOptions;
export const FAILED_TO_MINT = (e: any) => ({ status: "error", title: `Failed to mint`, description: `${e}`, ...STANDARD }) as UseToastOptions;
export const MINTING = { status: "info", title: `Minting...`, ...STANDARD } as UseToastOptions;
export const SUCCESS_TO_MINT = (id: string) => ({ status: "success", title: `Minted`, description: `You successfully minted dms #${id}`, ...STANDARD }) as UseToastOptions;

export const FAILED_TO_UPDATE = (e: any) => ({ status: "error", title: `Failed to update switch`, description: `${e}`, ...STANDARD }) as UseToastOptions;
export const UPDATING_DMS = (id: string) => ({ status: "info", title: `Updating DMS #${id}...`, ...STANDARD }) as UseToastOptions;
export const SUCCESS_TO_UPDATE = (id: string) => ({ status: "success", title: `Updated Switch`, description: `You successfully updated DMS #${id}`, ...STANDARD }) as UseToastOptions;

export const ERROR_FETCHING_COUNTER = {
  title: "Something went wrong",
  status: "error",
  ...STANDARD
} as UseToastOptions;

export const UPDATE_HEARTBEAT = (id: number) => ({
  title: `SWITCH #${id} is ALIVE`,
  description: `Heartbeat updated`,
  status: "success",
  ...STANDARD
}) as UseToastOptions;

export const UPDATE_HEARTBEAT_ERROR = {
  title : "Could not update heartbeat",
  description: "Please try again later",
  status: "error",
  ...STANDARD
} as UseToastOptions;

export const NOT_ENOUGH_FUNDS = {
  title: "Not enough funds",
  description: "Please fund your wallet with at least 6 MATIC",
  status: "error",
  ...STANDARD,
  duration: 15000
} as UseToastOptions;