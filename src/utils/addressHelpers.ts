import { addresses, ChainId } from "../config";
import { Address } from "../config/types";

export const getAddress = (address: Address): string => {
  const chainId = process.env.GATSBY_CHAIN_ID as unknown as keyof Address;
  return (address[chainId] ? address[chainId] : address[ChainId.MAINNET])!;
};

export const getKrlAddress = () => getAddress(addresses.krlzlt);
export const getKrlZltLPAddress = () => getAddress(addresses.zltkrlstakinglp);
export const getBusdAddress = () => getAddress(addresses.busd);
export const getZltSaleAddress = () => getAddress(addresses.zltSale);
export const getCfycSaleAddress = () => getAddress(addresses.cfycSale); 