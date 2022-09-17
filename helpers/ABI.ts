const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdPriceFeedAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ManIsUnfortunatelyAlreadyDead", type: "error" },
  { inputs: [], name: "SwitchNotReadyYet", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "switchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCadence",
        type: "uint256",
      },
    ],
    name: "ChangedCadence",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "switchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockHeartbeat",
        type: "uint256",
      },
    ],
    name: "HearBeatReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "switchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "switchId",
        type: "uint256",
      },
    ],
    name: "SwitchDeactivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "switchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockHeartbeat",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SwitchMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "switchId",
        type: "uint256",
      },
    ],
    name: "SwitchUpdated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_switchId", type: "uint256" },
      { internalType: "uint256", name: "_newCadence", type: "uint256" },
    ],
    name: "changeCadence",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_switchId", type: "uint256" },
      { internalType: "address", name: "_newOwner", type: "address" },
    ],
    name: "changeOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "counter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_switchId", type: "uint256" }],
    name: "deactiviateSwitch",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_switchId", type: "uint256" }],
    name: "getSwitchById",
    outputs: [
      {
        components: [
          { internalType: "address", name: "onlyOwner", type: "address" },
          { internalType: "uint256", name: "cadence", type: "uint256" },
          { internalType: "uint256", name: "blockHeartbeat", type: "uint256" },
          { internalType: "string", name: "fileUrl", type: "string" },
          { internalType: "bool", name: "active", type: "bool" },
        ],
        internalType: "struct DeadMansSwitch.Switch",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_switchId", type: "uint256" }],
    name: "getSwitchForSwitchId",
    outputs: [
      {
        components: [
          { internalType: "address", name: "onlyOwner", type: "address" },
          { internalType: "uint256", name: "cadence", type: "uint256" },
          { internalType: "uint256", name: "blockHeartbeat", type: "uint256" },
          { internalType: "string", name: "fileUrl", type: "string" },
          { internalType: "bool", name: "active", type: "bool" },
        ],
        internalType: "struct DeadMansSwitch.Switch",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUSD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_switchId", type: "uint256" }],
    name: "heartbeat",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_switchId", type: "uint256" }],
    name: "isActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_switchId", type: "uint256" }],
    name: "isAlive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_onlyOwner", type: "address" },
      { internalType: "uint256", name: "_cadence", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payday",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_switchId", type: "uint256" },
      { internalType: "string", name: "_fileUrl", type: "string" },
    ],
    name: "update",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default ABI;
