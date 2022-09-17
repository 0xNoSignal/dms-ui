const DMS_ADDRESS_RINKEBY = "0x2daFA768EF9846B31FB196efBD25ce14Fd266AFe";
const DMS_CHAIN_ID = 4;

const DMS_ADDRESS_LOCALHOST = "0xA5Ebf7dE4DB31eb8B31Bf4264deFc27C95bfc655";
// const DMS_POLYGON_ADDRESS = "0x68f45C1de82deBa2106C67aCb715e6410C686414";
const DMS_POLYGON_ADDRESS = "0x2aB4616ac194bCF04a57A14143eCFD15E7ec73F4";


const chainToContract = {
  4: DMS_ADDRESS_RINKEBY,
  31337: DMS_ADDRESS_LOCALHOST,
  137: DMS_POLYGON_ADDRESS,
} as any;

export const getContractAddress = (id: number): string => {
  return chainToContract[id];
};

export const CHAIN = "polygon";
export const CHAIN_ID = 137;
export const ASSUMED_BLOCK_TIME = 2.05;
export const AVG_BLOCKS_PER_DAY = Math.floor(
  (60 * 60 * 24) / ASSUMED_BLOCK_TIME
);
