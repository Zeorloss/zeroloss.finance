import { parseUnits } from "ethers/lib/utils";

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: "https://bscscan.com",
  [ChainId.TESTNET]: "https://testnet.bscscan.com",
};
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET];

export const addresses = {
  zltSale: {
    56: "0x02f49F484da3c594576622a1116c05E295F47D1d",
    97: "",
  },
  busd: {
    56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    97: "",
  },
  zlt: {
    56: "0x05D8762946fA7620b263E1e77003927addf5f7E6",
    97: ""
  },
  krlBNBLP: {
    56: "0xAb168a06623eDe1b6b590733952cca4d7123f1F5",
    97: ""
  },
  cfycSale: {
    56: "0xa600214DeD3243C810e15Bbc484C98D02A7b66ea",
    97: ""
  },
  cfyc: {
    56: "0x03B6119662292b6BBecFc432B799a82Ae9157f12",
    97: ''
  },
  krlzlt: {
    97: "",
    56: "0x4951Afc961EA8cdbF536cA0afce91cA3eaa27768",
  },
  krl: {
    97: "",
    56: "0xF1288cF18B1FAaA35F40111c3E5d2f827e1E920E",
  },
  zltkrlstakinglp: {
    97: "",
    56: "0x7d9127869d26090e44cCcdb8Ff246DD8Fc28b4E8",
  },
  zltNftstaking: {
    97: "",
    56: "0xa40984640D83230EE6Fa1d912E2030f8485b9eFc",
  },
  zltnft: {
    97: "",
    56: "0x1d1C02F9fcff7EE2073a72181caE53563C82879C",
  },

  BNBPrice: {
    97: "",
    56: "0x0fd54afa334f843687449cf6e6241cff5f271fe6"
  }


};

export const networkList = {
  1: {
    url: "https://etherscan.io/",
    name: "Ethereum Mainnet",
  },
  2: {
    url: "https://mordenexplorer.ethernode.io/",
    name: "Morden",
  },
  3: {
    url: "https://ropsten.etherscan.io/",
    name: "Ropsten",
  },
  4: {
    url: "https://rinkeby.etherscan.io/",
    name: "Rinkeby",
  },
  42: {
    url: "https://kovan.etherscan.io/",
    name: "Kovan",
  },
  56: {
    url: "https://bsc-dataseed.binance.org/",
    name: "Binance Smart Chain",
  },
  97: {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    name: "Binance Smart Chain - Testnet",
  },
  43114: {
    url: "https://api.avax.network/ext/bc/C/rpc",
    name: "Avalanche",
  },
};

export enum GAS_PRICE {
  default = "5",
  fast = "6",
  instant = "7",
  testnet = "10",
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, "gwei").toString(),
  fast: parseUnits(GAS_PRICE.fast, "gwei").toString(),
  instant: parseUnits(GAS_PRICE.instant, "gwei").toString(),
  testnet: parseUnits(GAS_PRICE.testnet, "gwei").toString(),
};
