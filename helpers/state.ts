import { createContext } from "react";

export type STATE_OF_WEBSITE = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type MANAGEMENT_STATUS = "NEW" | "MANAGE";
export type Purpose = "Will" | "Kompromat" | "Notify";
export type Interval = 0.0009920634921 | 2 | 4 | 8;
export type Bucket = "arweave" | "gDrive";

export interface IState {
  name: string;
  purpose: Purpose;
  interval: Interval;
  bucket: Bucket;
  file: File | null;
  website: STATE_OF_WEBSITE;
  side: MANAGEMENT_STATUS;
  address?: string;
}

const initialState: IState = {
  name: "",
  purpose: "Will",
  interval: 2,
  bucket: "arweave",
  file: null,
  website: 0,
  side: "NEW",
  address: undefined
};

const SET_NAME_TYPE = "SET_NAME";
const SET_PURPOSE_TYPE = "SET_PURPOSE";
const SET_INTERVAL_TYPE = "SET_INTERVAL";
const SET_BUCKET_TYPE = "SET_BUCKET";
const SET_FILE_TYPE = "SET_FILE";
const SET_WEBSITE_TYPE = "SET_WEBSITE";
const SET_SIDE_TYPE = "SET_SIDE";
const RESET_TYPE = "RESET";
const SWITCH_TO_MANAGE_TYPE = "SWITCH_TO_MANAGE";
const START_NEW_DMS_TYPE = "START_NEW_DMS";
const SET_ADDRESS_TYPE = "SET_ADDRESS";

const setName = (name: string) => ({ type: SET_NAME_TYPE, payload: name });
const setPurpose = (purpose: Purpose) => ({
  type: SET_PURPOSE_TYPE,
  payload: purpose,
});
const setInterval = (interval: Interval) => ({
  type: SET_INTERVAL_TYPE,
  payload: interval,
});
const setBucket = (bucket: Bucket) => ({
  type: SET_BUCKET_TYPE,
  payload: bucket,
});
const setFile = (file: File) => ({ type: SET_FILE_TYPE, payload: file });
const setWebsite = (website: STATE_OF_WEBSITE) => ({
  type: SET_WEBSITE_TYPE,
  payload: website,
});
const setSide = (side: MANAGEMENT_STATUS) => ({
  type: SET_SIDE_TYPE,
  payload: side,
});
const reset = () => ({ type: RESET_TYPE });
const switchToManage = () => ({ type: SWITCH_TO_MANAGE_TYPE });
const startNewDms = (address: string) => ({ type: START_NEW_DMS_TYPE, payload: address });
const setAddress = (address: string) => ({
  type: SET_ADDRESS_TYPE,
  payload: address
})

function reducer(state: IState, action: any) {
  switch (action.type) {
    case SET_NAME_TYPE:
      return { ...state, name: action.payload };
    case SET_PURPOSE_TYPE:
      return { ...state, purpose: action.payload };
    case SET_INTERVAL_TYPE:
      return { ...state, interval: action.payload };
    case SET_BUCKET_TYPE:
      return { ...state, bucket: action.payload };
    case SET_FILE_TYPE:
      return { ...state, file: action.payload };
    case SET_WEBSITE_TYPE:
      return { ...state, website: action.payload };
    case SET_SIDE_TYPE:
      return { ...state, side: action.payload };
    case SET_ADDRESS_TYPE:
      return { ...state, address: action.payload };
    case RESET_TYPE:
      return initialState;
    case SWITCH_TO_MANAGE_TYPE:
      return { ...state, side: "MANAGE", website: 6 };
    case START_NEW_DMS_TYPE:
      return { ...initialState, website: 1, address: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext({
  appState: initialState,
  dispatch: (action: any) => {},
});

export {
  AppContext,
  initialState,
  startNewDms,
  setAddress,
  reducer,
  setName,
  setPurpose,
  setInterval,
  setBucket,
  setFile,
  setWebsite,
  setSide,
  reset,
  switchToManage,
};
