import pancakePairAbi from '../config/abi/PancakePairABI.json';
import { addresses } from "../config"; 
import { getContract } from "../utils/contractHelpers";
import useActiveWeb3React from "./useActiveWeb3React";
import { BigNumber } from "bignumber.js";
import { BIG_TEN } from "../utils/bignumber";
import BNBPriceAbi from "../config/abi/BNBprice.json";

  export default function useCalculateAPR(){

    const {library} = useActiveWeb3React();

    async function getBNBPriceUSD() {
      const priceContract = getContract(BNBPriceAbi, addresses.BNBPrice[56], library?.getSigner());
      const price = await priceContract.GetBNBCurrentPrice();
      const BNBPrice = new BigNumber(price._hex).div(BIG_TEN.pow(8)).toNumber();
      console.log("BNBPrice: " + BNBPrice);
      return BNBPrice;
    }
        
    // async function getLPPriceUSD(){
    //   const lpContract = getContract(pancakePairAbi, addresses.krlBNBLP[56], library?.getSigner());
    //   const [x, y, _temp] = await lpContract.getReserves();
    //   const reserve1 = new BigNumber(y._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
    //   const BNBPrice = await getBNBPriceUSD();
    //   const priceR1 = BNBPrice * reserve1;
    //   const LPValue = priceR1 * 2;
    //   const supply = await lpContract.totalSupply();
    //   const totalLPSupply = new BigNumber(supply._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
    //   return LPValue / totalLPSupply;
    // }

    async function getLPPriceUSD(){
      const lpContract = getContract(pancakePairAbi, addresses.krlzlt[56], library?.getSigner());
      const [x, y, _temp] = await lpContract.getReserves();
      const reserve0 = new BigNumber(x._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
      const ZLTPrice = await getZLTPriceUSD();
      const LPValue = (ZLTPrice * reserve0) * 2;
      const supply = await lpContract.totalSupply();
      const totalLPSupply = new BigNumber(supply._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
      console.log("lpvALUE: " + LPValue)
      console.log("total: " + totalLPSupply)
      return LPValue / totalLPSupply;

    }
    
    async function getZLTPriceUSD(){
      const lpContract = getContract(pancakePairAbi, addresses.krlBNBLP[56], library?.getSigner());
      const [x, y, _temp] = await lpContract.getReserves();
      const reserve0 = new BigNumber(x._hex).times(BIG_TEN.pow(18)).toNumber();// amount of ZLT in the LP CA
      const reserve1 = new BigNumber(y._hex).times(BIG_TEN.pow(18)).toNumber();// amount of BNB in the LP CA
      const BNBPrice = await getBNBPriceUSD();
      const priceR1 = BNBPrice * reserve1;
      return priceR1 / reserve0;
    }

    return {
      getLPPriceUSD,
      getZLTPriceUSD,
      getBNBPriceUSD,
    } 
  }





