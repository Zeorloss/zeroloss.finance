import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { simpleRpcProvider } from "./providers";
import BusdAbi from "../config/abi/busd.json"
import ZltSaleAbi from "../config/abi/zltSale.json"
import cfycSaleAbi from "../config/abi/cfySale.json";
import krlzltAbi from "../config/abi/krlzltAbi.json";

import { getBusdAddress, getCfycSaleAddress, getKrlAddress, getZltSaleAddress } from "./addressHelpers";
import bep20Abi from "../config/abi/erc20.json";


export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
    return new Contract(address, abi, signerOrProvider);
};

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export const getBusdContract = (signer?: Signer | Provider) => {
  return getContract(BusdAbi, getBusdAddress(), signer);
};

export const getZltContract = (signer?: Signer | Provider) => {
  return getContract(ZltSaleAbi, getZltSaleAddress(), signer);
};
export const getCfycSaleContract = (signer?: Signer | Provider) => {
  return getContract(cfycSaleAbi, getCfycSaleAddress(), signer);
};

export const getKRLZLTContract = (signer?: Signer | Provider) => {
  return getContract(krlzltAbi, getKrlAddress(), signer);
};

export const getBep20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(bep20Abi, address, signer);
};