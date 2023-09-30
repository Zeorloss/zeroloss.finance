import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MaxUint256 } from "@ethersproject/constants";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useAppContext } from "../hooks/useAppContext";
import useApproveToken from "../hooks/useApproveToken";
import useToast from "../hooks/useToast";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import {
  getBep20Contract,
  getBusdContract,
  getCfycSaleContract,
  getContract,
} from "../utils/contractHelpers";
import {
  getAddress,
  getBusdAddress,
  getCfycSaleAddress,
} from "../utils/addressHelpers";
import CustomButton from "../components/Buttons/Button";
import { CallSignerType } from "../types";
import { BIG_TEN } from "../utils/bignumber";
import erc20 from "../config/abi/erc20.json";
import { addresses } from "../config";
import { ethers } from "ethers";
import { RefreshContext } from "../contexts/RefreshContext";
import { SEO } from "../components/Seo";
import erc20Abi from "../config/abi/erc20.json";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import queryString from "query-string";

interface SwapLogs {
  status: string;
  message: string;
  result: {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    blockHash: string;
    timeStamp: string;
    gasPrice: string;
    gasUsed: string;
    logIndex: string;
    transactionHash: string;
    transactionIndex: string;
  }[];
}

type Event = {
  data: ethers.utils.LogDescription;
};

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "inAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id3",
        type: "uint256",
      },
    ],
    name: "Swap",
    type: "event",
  },
];
const iface = new ethers.utils.Interface(abi);

export function arrayUnique(array: any[]) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}

const buyCfyc = async (amount: string, signer: CallSignerType) => {
  const contract = getCfycSaleContract(signer);
  const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toJSON();
  const tx = await contract.buyCFYC(value);
  const receipt = await tx.wait();
  return receipt.status;
};

const BuyPage = () => {
  const [fetching, setFetching] = useState(false);
  const {
    triggerFetchTokens,
    wallet: { balance },
  } = useAppContext();
  const { active, account, library } = useActiveWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [errorMsg, setErrorMsg] = useState("");
  const [amountToPay, setAmountToPay] = useState("0");
  const [isApproved, setIsApproved] = useState(false);
  const [contractBal, setContractBal] = useState("0");
  const [zltThreshold, setZltThreshold] = useState(10000);
  const [zltBal, setZltBal] = useState(0);
  const [records, setRecords] = useState<number[]>([]);

  const { onApprove } = useApproveToken(
    getBusdContract(library?.getSigner()),
    getCfycSaleAddress()
  );

  const { fast } = useContext(RefreshContext);

  useEffect(() => {
    (async () => {
      // setRequesting(true);
      if (account && library) {
        const contract = getBep20Contract(
          getBusdAddress(),
          library.getSigner(account)
        );
        contract
          .allowance(account, getCfycSaleAddress())
          .then(({ _hex }: any) => {
            if (MaxUint256.eq(_hex)) {
              setIsApproved(true);
            } else {
              setIsApproved(false);
            }
            return MaxUint256.eq(_hex); // return promise for finally to run
          })
          .finally(() => {
            // setRequesting(false);
          });
      } else {
        setIsApproved(false);
        // setIsRequesting(false);
      }
    })();
  }, [account, library, isApproved]);

  // ZLT Balance
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(
          erc20,
          getAddress(addresses.zlt),
          library.getSigner()
        );
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
            setZltBal(bal);
          })
          .catch(() => {
            // console.error(e, "Error getting balance");
            setZltBal(0);
          });
      } else {
        setZltBal(0);
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, fast, active]);

  useEffect(() => {
    const fetchCurrentThreshold = async () => {
      if (library) {
        const contract = getCfycSaleContract(library.getSigner());
        const result = await contract.ZerolossThreshold();
        const threshold = new BigNumber(result._hex)
          .div(BIG_TEN.pow(18))
          .toNumber();
        setZltThreshold(threshold);
      }
    };
    fetchCurrentThreshold();
  }, [library]);

  const handleApprove = useCallback(async () => {
    if (account && library) {
      setFetching(true);
      try {
        await onApprove();
        setIsApproved(true);
      } catch (e) {
        console.error(e);
        toastError(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
        setIsApproved(false);
      } finally {
        setFetching(false);
      }
    }
  }, [onApprove, account, library, toastError]);

  const handleBuyCfyc = useCallback(async () => {
    if (library) {
      setFetching(true);
      try {
        await buyCfyc(amountToPay, library.getSigner());
        toastSuccess("CFYC has been sent to your wallet.");
        triggerFetchTokens();
      } catch (err) {
        console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to perform the transaction."
        );
      } finally {
        setFetching(false);
      }
    }
  }, [library, amountToPay]);

  const handleInputChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      async (e) => {
        const val = e.currentTarget.value.replace(/,/g, ".");
        const pattern = /^[0-9]*[.,]?[0-9]{0,18}$/g;
        if (!pattern.test(val)) return;

        const amount = new BigNumber(val);
        const bal = new BigNumber(balance);
        if (amount.isGreaterThan(bal)) {
          setErrorMsg("Insufficient funds in your wallet");
        } else {
          setErrorMsg("");
        }
        setAmountToPay(val);
      },
      [balance]
    );

  useEffect(() => {
    const contract = getContract(erc20Abi, getAddress(addresses.cfyc));
    contract
      .balanceOf("0xe4B81318EFb567317d14eea9E34FA2B17b6380bb") // hard coded dev wallet
      .then((p: ethers.BigNumber) => {
        const bal = new BigNumber(p._hex).div(BIG_TEN.pow(2)).toJSON();
        const toNum = Number(bal);
        const percentBal = (((20000000 - toNum) / 20000000) * 100).toFixed(2);
        setContractBal(percentBal);
      })
      .catch((e: any) => {
        console.error(e, "Error getting balance");
      });
  }, []);

  // Swap events
  useEffect(() => {
    const getSwapLogs = async function () {
      if (library && account) {
        const contractBsc = getCfycSaleContract(library.getSigner(account));
        const eventFilter = contractBsc.filters.Swap(account);

        const currentBlock = await library.getBlockNumber();

        const { address, topics } = eventFilter;
        if (address && topics) {
          const requestParams = {
            module: "logs",
            action: "getLogs",
            fromBlock: 25549795,
            toBlock: currentBlock,
            address: address,
            topic0: topics[0],
            topic1: topics[1],
            apikey: "",
          };
          const stringified = queryString.stringifyUrl({
            url: "https://api.bscscan.com/api",
            query: requestParams,
          });
          fetch(stringified)
            .then(async (res) => {
              const logs = (await res.json()) as SwapLogs;
              // console.log(logs)

              if (Array.isArray(logs.result)) {
                const events: Event[] = logs.result.map((log) => {
                  return {
                    data: iface.parseLog(log),
                  };
                });

                const eventLogs = events.map(({ data }) => {
                  const { id1, id2, id3 } = data.args;
                  return [
                    new BigNumber(id1._hex).toNumber(),
                    new BigNumber(id2._hex).toNumber(),
                    new BigNumber(id3._hex).toNumber(),
                  ];
                });
                // setRecord(eventLogs);
                setRecords((p) => arrayUnique(p.concat(...eventLogs)));
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      }
    };

    getSwapLogs();
  }, [library, account]);

  const addTokenToMetaMask = async() =>{
    try {
    const { ethereum } = window
    // @ts-expect-error
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: "0x03B6119662292b6BBecFc432B799a82Ae9157f12",  
          symbol: `CFYC`,
          decimals: 18,
          image: "https://zeroloss.finance/cdn/Logo%20CRYPTOFY.png"
        },
      },
    })
  } catch (ex) {
    console.error(ex)
  }
  }

  return (
    <Layout>
      <div className="flex justify-center items-center mt-10">
        <section className="bg-white p-5 md:p-10 w-full max-w-screen-md">
          <section className="text-[#1E50BC] px-8 md:max-w-[80%] m-auto py-10">
            <h1 className="text-5xl text-center font-bold mb-10 leading-slug">
              Cryptofy Private Sale.
            </h1>
            <section className="text-center space-y-5 relative text-xl">
              <div className="space-y-5 relative">
                <p className="max-w-lg mx-auto font-bold">BUY $CFYC</p>
                <button className="w-30 m-auto p-3 rounded-full text-base hover:bg-white bg-[#1E50BC] text-white hover:text-black" onClick={()=> addTokenToMetaMask()}>Add CFYC Token</button>

                <p>
                  <span className="font-bold">Max Buy</span> 5000 BUSD
                </p>
                <p>
                  <span className="font-bold">Min Buy</span> 500 BUSD
                </p>
                <p className="text-sm">
                  Hold 10000 ZLT to get whitelisted for Cryptofy private sale.
                </p>
                {zltBal < zltThreshold && (
                  <Link
                    to="/swap"
                    className="text-base underline hover:no-underline transition-all duration-300"
                  >
                    Insufficient ZLT, get some!
                  </Link>
                )}
                <div className="bg p-5 max-w-sm space-y-3 mx-auto rounded">
                  {active && isApproved && (
                    <TextInput
                      errorMsg={errorMsg}
                      onChangeHandler={handleInputChange}
                      value={amountToPay}
                      onSubmit={handleBuyCfyc}
                      trx={fetching}
                      isDisabled={
                        fetching ||
                        errorMsg.length > 0 ||
                        Number.isNaN(Number.parseFloat(amountToPay)) ||
                        Number.parseFloat(amountToPay) === 0
                      }
                    />
                  )}
                  {active && !isApproved && (
                    <CustomButton
                      onClick={handleApprove}
                      className="!block mx-auto uppercase text-base hover:bg-white bg-[#1E50BC]"
                      disabled={fetching}
                      loading={fetching}
                    >
                      Approve BUSD
                    </CustomButton>
                  )}
                  {!active && (
                    <Fragment>
                      <ConnectWalletButton className="hover:bg-white bg-[#1E50BC]" />
                      <p className="text-sm">Connect your wallet.</p>
                    </Fragment>
                  )}
                </div>
              </div>
              {contractBal && (
                <>
                  <p className="font-bold">Token Sale Progress.</p>
                  <div className="relative h-7 w-full md:w-6/12 m-auto bg-white overflow-hidden  rounded-lg">
                    <div
                      className={`h-full absolute top-0 px-4 bg-[#1E50BC]`}
                      style={{ width: `${contractBal}%` }}
                    ></div>
                    <p className="text-black text-center block m-auto font-bold">{`${contractBal}%`}</p>
                  </div>
                </>
              )}
              {records.length > 0 && (
                <div className="mt-10 pt-10">
                  <h2 className="font-bold my-5">Token Vesting Schedule</h2>
                  <div className="flex justify-center gap-4 flex-wrap max-w-screen-md">
                    {records.map((id, index) => (
                      <p key={id} className="p-1 text-sm">
                        Vesting {index + 1}:{" "}
                        <a
                          href={`https://safe.kimberlite.rocks/56/${id}`}
                          className="underline text-base font-bold transition-all hover:no-underline hover:scale-110"
                          target="_blank"
                        >
                          View
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </section>
        </section>
      </div>
    </Layout>
  );
};

interface TextInputProps {
  errorMsg: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  value: string;
  isDisabled: boolean;
  trx: boolean; // transaction
}

const TextInput = ({
  onChangeHandler,
  onSubmit,
  errorMsg,
  value,
  isDisabled,
  trx,
}: TextInputProps) => {
  const [cfycBal, setCfycBal] = useState("0");

  const { fast } = useContext(RefreshContext);
  const { active, account, library } = useActiveWeb3React();

  const hasError = errorMsg.length > 0;
  const {
    wallet: { balance },
  } = useAppContext();

  // CFYC Balance
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(erc20, getAddress(addresses.cfyc));
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(2)).toJSON();
            setCfycBal(bal);
          })
          .catch(() => {
            setCfycBal("0");
          });
      } else {
        setCfycBal("0");
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, fast, active]);

  return (
    <div className="w-full space-y-2 mx-auto">
      <div className="p-3 rounded-lg transition-transform duration-200 ease-linear">
        <div>
          <div className="mb-2 text-xs font-light text-left">Amount</div>
          <div className="relative flex items-center justify-between space-x-1">
            <div className="w-full">
              <input
                type="text"
                className={classNames(
                  "placeholder-gray-400 outline-none border border-[#7B8BA5] font-medium",
                  "transition-all duration-200 text-gray-700 p-2 disabled:opacity-70 text-xl",
                  "disabled:cursor-not-allowed block bg-transparent w-full leading-none",
                  "bg-primary/20 rounded",
                  {
                    "text-red-400": hasError,
                  }
                )}
                placeholder="0"
                value={value}
                onChange={onChangeHandler}
              />
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>CFYC Balance</span>
                <span>{cfycBal} CFYC</span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span className="text-left">BUSD Bal.</span>
                <span className="text-right">
                  {hasError ? errorMsg : balance}
                </span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>You will receive</span>
                <span>
                  {new BigNumber(value || 0).times(10).times(0.1).toJSON()} CFYC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        onClick={onSubmit}
        className="block mx-auto w-full"
        disabled={isDisabled}
        loading={trx}
        variant="primary"
      >
        Buy CFYC
      </CustomButton>
      <p className="text-sm">{`90% (${new BigNumber(value * .9 || 0).times(1065).toJSON()} CFYC)  of ${new BigNumber(value || 0).times(1065).toJSON()} CFYC will be vested`}</p>

    </div>
  );
};

export default BuyPage;

export const Head = () => <SEO title="Buy CFY | Cryptofy" />;
