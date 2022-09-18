export const blobToDataURI = (blob: any) => {
  return new Promise<string>((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = (e) => {
      var data = e?.target?.result;
      if (typeof data === "string") resolve(data);
    };
    reader.readAsDataURL(blob);
  });
};

export const accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "polygon",
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "10000000000000", // 0.000001 ETH
    },
  },
];

export const createEVMContractConditions = ({
  switchId,
  contractAddress,
  chain,
}: {
  switchId: string;
  contractAddress: string;
  chain: string;
}) => {
  return [
    {
      contractAddress,
      functionName: "isAlive",
      functionParams: [switchId],
      functionAbi: {
        inputs: [
          {
            internalType: "uint256",
            name: "_switchId",
            type: "uint256",
          },
        ],
        name: "isAlive",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      chain,
      returnValueTest: {
        key: "",
        comparator: "=",
        value: "false",
      },
    },
  ];
};


export function secondsToDhms(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + "d" : "";
  var hDisplay = h > 0 ? h + "h": "";
  var mDisplay = m > 0 ? m + "m" : "";
  var sDisplay = s > 0 ? s + "s" : "";
  const buildEndProduct = [dDisplay, hDisplay, mDisplay, sDisplay].reduce(
    (acc, cur) => {
      if (acc.length > 0 && cur.length > 0) {
        return acc + ", " + cur;
      }
      return acc + cur;
    },
    ""
  );
  return buildEndProduct;
}

export  const dataURItoBlob = (dataURI: any) => {


  
  var byteString = window.atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  
  var blob = new Blob([ab], {type: mimeString});

  return blob;
}


export function countdown(s:number) {

  const d = Math.floor(s / (3600 * 24));

  s  -= d * 3600 * 24;

  const h = Math.floor(s / 3600);

  s  -= h * 3600;

  const m = Math.floor(s / 60);

  s  -= m * 60;

  const tmp = [];

  (d) && tmp.push(d + 'd');

  (d || h) && tmp.push(h + 'h');

  (d || h || m) && tmp.push(m + 'm');

  tmp.push(s + 's');

  return tmp.join(' ');
}