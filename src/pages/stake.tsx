import React, { Fragment, useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import { BigNumber as BigNumberEth, ethers } from 'ethers';
import useApproveToken from '../hooks/useApproveToken';
import { getContract, getKRLZLTContract, } from '../utils/contractHelpers';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { getKrlZltLPAddress } from '../utils/addressHelpers';
import ConnectWalletButton from '../components/Buttons/ConnectWalletButton';
import erc20 from "../config/abi/erc20.json";
import zltNftPool from "../config/abi/ZerolossNftPoolABI.json";
import zltkrllp from "../config/abi/zltkrlLPstaking.json";
import zltNftAbi from "../config/abi/ZltNftABI.json";
import { addresses } from '../config';
import { BIG_TEN } from '../utils/bignumber';
import BigNumber from "bignumber.js";
import { MaxUint256 } from "@ethersproject/constants";
import { TailSpin } from 'react-loader-spinner';
import useCalculateAPR from '../hooks/useCalculateAPR';

const stake = () => {

    const {getLPPriceUSD, getZLTPriceUSD} = useCalculateAPR();
    
    const [zltBal, setZltBal] = useState<number>(0);
    const [loadingApproveNFT, setLoadingApproveNFT] = useState<boolean>(false);
    const [loadingApproveToken, setLoadingApproveToken] = useState<boolean>(false);
    const [loadingUnStakeToken, setLoadingUnStakeToken] = useState<boolean>(false);
    const [loadingUnstakeNFT, setLoadingUnstakeNFT] = useState<boolean>(false);
    const [loadingStakeToken, setLoadingStakeToken] = useState<boolean>(false);
    const [loadingStakeNFT, setLoadingStakeNFT] = useState<boolean>(false);
    const [zltNFTBal, setZltNFTBal] = useState<number[]>([]);
    const [stakedBal, setStakedBal] = useState<number>(0);
    const [zltNFTStakedId, setZltNFTStakedId] = useState<number[]>([]);
    const [zltNFTToStakeId, setZltNFTToStakeId] = useState<number>(0);
    const [zltNFTToUnStakeId, setZltNFTToUnStakeId] = useState<number>(0);
    const [decimals, setDecimal] = useState<number>(9);
    const [allowance, setAllowance] = useState<number>(10);
    const [stakeAmount, setStakeAmount] = useState<string | number>(0);
    const [unStakeAmount, setUnStakeAmount] = useState<string | number>(0);
    const [stakeAmountInwei, setStakeAmountInwei] = useState<string | BigNumberEth>()
    const [unStakeAmountInwei, setUnStakeAmountInwei] = useState<string | BigNumberEth>()
    const [isApproving, setApproving]  = useState(false);
    const [nftApproval, setNftApproval] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [pendingReward, setPendingReward] = useState<number>(0);
    const [pendingNFTReward, setPendingNFTReward] = useState<number>(0);
    const [loadingHarvestToken, setLoadingHarvestToken] = useState<boolean>(false);
    const [loadingHarvestNFT, setLoadingHarvestNFT] = useState<boolean>(false);
    const [refreshBalances, setRefreshBalances] = useState<boolean>(false);
    const [stakeErrorMessage, setStakeErrorMessage] = useState<string>('');
    const [approveErrorMessage, setApproveErrorMessage] = useState<string>('');
    const [unstakeErrorMessage, setUnstakeErrorMessage] = useState<string>('');
    const [stakeNFTErrorMessage, setStakeNFTErrorMessage] = useState<string>('');
    const [unstakeNFTErrorMessage, setUnstakeNFTErrorMessage] = useState<string>('');
    const [APR, setAPR] = useState<number>(0);
    const [NFTAPR, setNFTAPR] = useState<number>(0);
    const [BNBBal, setBNBBal] = useState<number>(0);

    const { active, account, library } = useActiveWeb3React();

    const { onApprove } = useApproveToken(
        getKRLZLTContract(library?.getSigner()),
        getKrlZltLPAddress()
      );

    useEffect(()=>{
        const fetchBalance = async () => {
            try {
              const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/'); // Binance Smart Chain provider
                // @ts-expect-error
              const bnbBalance = await provider.getBalance(account);
              const formattedBalance = ethers.utils.formatEther(bnbBalance);
              const balanceNumber = parseFloat(formattedBalance);
        
              console.log(balanceNumber);
              setBNBBal(balanceNumber);
            } catch (error) {
              console.error('Error fetching BNB balance:', error);
            }
          };
    
          fetchBalance()
    }, [account]);

    const handleApprove = async () => {
        if (account && library) {
            setFetching(true);
            setLoadingApproveToken(true)
            try {
                await onApprove();
                setIsApproved(true);
                console.log("handleapprove success");
                return;
            } catch (e) {
                console.error(e);
                console.log("handleapprove failed");
                setIsApproved(false);
            } finally {
                setFetching(false);
                setLoadingApproveToken(false);
                console.log("handleapprove finally ");
            }
        }
    }
    // }, [onApprove, account, library]);

    useEffect(()=>{

        async function calculateTokenAPR(){
            const lpContract = getContract(zltkrllp, addresses.zltkrlstakinglp[56], library?.getSigner());
            const RPB = await lpContract.rewardPerBlock();
            const ar = new BigNumber(RPB._hex).toNumber();// amount of BNB in the LP CA
            console.log(ar)
            if(ar > 0 ){
                const AR  = ar * 10512000; 
                const pRT = await getZLTPriceUSD();
                const VAR = pRT * AR;
                const ts = await lpContract.totalStaked();

                if(ts > 0 ){
                    const pst = await getLPPriceUSD();
                    const tsv = ts * pst;
                    const APR = VAR / tsv * 100; 
                    setAPR(APR);
                }
            }
        }
        calculateTokenAPR();
    }, []);

    useEffect(()=>{
        async function calculateNFTAPR(){
            const contractNFT = getContract(zltNftPool, addresses.zltNftstaking[56], library?.getSigner());

            const RPB = await contractNFT.rewardPerBlock();
            const ar = new BigNumber(RPB._hex).toNumber();// amount of BNB in the LP CA
            console.log(ar)

            if(ar > 0 ){
                const AR  = ar * 10512000; 
                const pRT = await getZLTPriceUSD();
                const VAR = pRT * AR;
                const ts = await contractNFT.totalStaked();

                if(ts > 0 ){
                    const APR = VAR / ts * 100; 
                    console.log("apr: " + APR)
                    setNFTAPR(APR);
                    console.log(APR);
                } else{
                    console.log("ts: " + ts);

                }
            }else{
                console.log("ar: " + ar);
            }


        }
        calculateNFTAPR();
    }, []);



    useEffect(() => {
        (async () => {
          // setRequesting(true);
          if (account && library) {
            const krlzltContract = getContract(erc20, addresses.krlzlt[56], library?.getSigner());
            krlzltContract
              .allowance(account, getKrlZltLPAddress())
              .then(({ _hex }: any) => {
                if (MaxUint256.eq(_hex)) {
                    console.log("good");
                    setIsApproved(true);
                } else {
                    console.log("bad");
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
    //   }, [account, library, isApproved]);
      }, [account, library, isApproved, refreshBalances]);

    const handleApproveNFT = async() =>{
        setLoadingApproveNFT(true);
        if(zltNFTToStakeId == 0){
            setLoadingApproveNFT(false);
            setApproveErrorMessage("Select an NFT ID to approve!")
            setTimeout(()=>{
                setApproveErrorMessage("")
            }, 2000);
            return 
        }
        try{
            const contractNFT = getContract(zltNftAbi, addresses.zltnft[56], library?.getSigner());
            await contractNFT.approve(addresses.zltNftstaking[56], zltNFTToStakeId)
            .then((transaction:any)=>{
                console.log('transaction sent: ' + transaction.hash);
                return transaction.wait();
            })
            .then((response:any)=>{
                console.log('approving smart contract:' + response);
                setLoadingApproveNFT(false);
                setRefreshBalances(prev=>!prev);
            })
            
        } catch (error) {
            setRefreshBalances(prev=>!prev)
            setLoadingApproveNFT(false);
            console.error('Error approving smart contract:', error);
        }
    }

    const handleUnstakeNFT = ()=>{
        setLoadingUnstakeNFT(true)
        const contract = getContract(zltNftPool, addresses.zltNftstaking[56], library?.getSigner());
        console.log(zltNFTToUnStakeId);
        contract.unstake(zltNFTToUnStakeId)
        .then((transaction:any) => {
            return transaction.wait();
          })
        .then((ret:any) => {
            setLoadingUnstakeNFT(false);
            setRefreshBalances(prev=>!prev);
        })
        .catch((e: any) => {
            setLoadingUnstakeNFT(false);
            setRefreshBalances(prev=>!prev);
        });
    }

    const handleUnstake = ()=>{
        const MIN_UNSTAKE = 0.1;
        if(Number(unStakeAmount) < MIN_UNSTAKE){
            setUnstakeErrorMessage(`Unstake amount must be greater than ${MIN_UNSTAKE}`);
            setTimeout(()=>{
                setUnstakeErrorMessage('');
            },2000)
            return;
        }
        setLoadingUnStakeToken(true);
        const lpContract = getContract(zltkrllp, addresses.zltkrlstakinglp[56], library?.getSigner());
        const value = new BigNumber(unStakeAmount).times(BIG_TEN.pow(18)).toFixed();
        console.log("unstake: " + value)
        
        lpContract.withdraw(value)
        .then((transaction:any) => {
            // Transaction successfully sent
            console.log("Transaction sent:", transaction.hash);
      
            // Wait for the transaction to be confirmed
            return transaction.wait();
          })
          .then((ret:any) => {
              setUnStakeAmount(0)
              console.log("withdraw: " + ret);
              setRefreshBalances(prev=>!prev);
              setLoadingUnStakeToken(false);
            })
            .catch((e: any) => {
                console.log("error unsatke: " + e?.message);
                setRefreshBalances(prev=>!prev);
                setLoadingUnStakeToken(false);
                setUnstakeErrorMessage(e?.message);
                setTimeout(()=>{
                    setUnstakeErrorMessage('')
                },2000);
            });
        }
        
    const handleStake = async()=>{
        const MIN_STAKE = 0.1;

        if(!stakeAmount){
            setStakeErrorMessage(`Invalid Input`);
            setTimeout(()=>{
                setStakeErrorMessage('');
            }, 2000)
            return;
        }

        const DECIMAL_PART =stakeAmount.toString().split('.')[1];
        if(DECIMAL_PART?.length > 2){
            setStakeErrorMessage(`Stake Value greater than two decimal`);
            setTimeout(()=>{
                setStakeErrorMessage('');
            }, 2000)
            return;
        }


        if(Number(stakeAmount) < MIN_STAKE){
            setStakeErrorMessage(`Stake Amount must be greater than ${MIN_STAKE}`);
            setTimeout(()=>{
                setStakeErrorMessage('');
            }, 2000)
            return;
        }
        setLoadingStakeToken(true);
        
        const lpContract = getContract(zltkrllp, addresses.zltkrlstakinglp[56], library?.getSigner());
        const value = new BigNumber(stakeAmount).times(BIG_TEN.pow(18)).toFixed();
        console.log("stake: " + stakeAmount)
        console.log("Big Stake: " + value)

        await lpContract.deposit(value)
        .then((transaction:any) => {
            console.log("Transaction sent:", transaction.hash);
      
            return transaction.wait();
          })
        .then(()=>{
            setLoadingStakeToken(false);
            setStakeAmount(0); 
            console.log("stakeAMount set"); 
            setRefreshBalances(prev=>!prev);})
        .catch((e: any) => {
            console.log(e)
            setRefreshBalances(prev=>!prev);
            setLoadingStakeToken(false);
        });
    }

    
    const handleStakeNFT = ()=>{
        console.log(BNBBal);
        if(BNBBal< 0.008){
            setStakeNFTErrorMessage("Minimum BNB: 0.008");
            setTimeout(()=>{
                setStakeNFTErrorMessage('')
            },2000);

            return;
        }
        setLoadingStakeNFT(true);
        console.log(zltNFTToStakeId);
        // loadingStakeNFT
        const contractNFT = getContract(zltNftPool, addresses.zltNftstaking[56], library?.getSigner());
        contractNFT.stake(zltNFTToStakeId, { value: ethers.utils.parseEther('0.006') })
        .then((transaction:any) => {
            return transaction.wait();
          })
        .then((r:any)=>{ 
            console.log("stakeAMount set" + r );
            setRefreshBalances(prev=>!prev);
            setLoadingStakeNFT(false);
    })
        .catch((e: any) => {
            setRefreshBalances(prev=>!prev);
            setLoadingStakeNFT(false);
            setStakeNFTErrorMessage("Error Occurred");
            setTimeout(()=>{
                setStakeNFTErrorMessage('')
            },2000);
        });
    }

    useEffect(()=>{
        const lpContract = getContract(zltkrllp, addresses.zltkrlstakinglp[56], library?.getSigner());
        lpContract.pendingReward(account)
        .then((p: ethers.BigNumber) => {
        const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();

        console.log("pending reward: " + bal);
        setPendingReward(bal);
        })
        .catch((e: any) => {
        console.log("error" + e?.message);
        });

    }, [account, refreshBalances])

    // read amount staked
    useEffect(()=>{
        if(account && library){
            const getStakedAmount = async()=>{
                const cont = getContract(zltkrllp, addresses.zltkrlstakinglp[56], library?.getSigner());
                const [p, a] = await cont.userInfo(account);
                console.log("s"+ p)
                console.log( p)
                console.log("staked: " + p)
                30000000000000001
                30000000000000000
                const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
                setStakedBal(bal);
                console.log(bal);
                return bal;
            }
            getStakedAmount();
        }
    }, [account, library, stakeAmount, refreshBalances])
    
    // READ NFT AMOUNT STAKED
    useEffect(()=>{
        if(account && library){
            const getStakedAmount = async()=>{
                const cont = getContract(zltNftPool, addresses.zltNftstaking[56], library?.getSigner());
                const [bal, id, reward] = await cont.getUserPoolInfo(account)
                
                const valueToBig = new BigNumber(reward._hex).div(BIG_TEN.pow(18)).toNumber();
                console.log("x: " + bal);
                console.log("y: " + id);
                console.log("z: " + valueToBig);

                setPendingNFTReward(valueToBig);
                setZltNFTStakedId(id);
                handleSelectNFTToUnStake(id[0]);
            }
    
            getStakedAmount();
        }
    // }, [account, library]); ,.
    }, [account, library, refreshBalances]);

    
    const handleHarvest = async() =>{
        setLoadingHarvestToken(true);
        const lpContract = getContract(zltkrllp, addresses.zltkrlstakinglp[56], library?.getSigner());

        await lpContract.deposit(0)
        .catch(() => {
            console.log("error");
        })
        .finally(()=>{
            setRefreshBalances(prev=>!prev);
            setLoadingHarvestToken(false);
        });
    }
    
    const handleHarvestNFT = () =>{
        setLoadingHarvestNFT(true);
        const lpContract = getContract(zltNftPool, addresses.zltNftstaking[56], library?.getSigner());

        lpContract.claimReward()
        .then(() => {
            console.log("harvesting nft");
        })
        .catch(() => {
            console.log("error harvest NFT");
        })
        .finally(()=>{
            setRefreshBalances(prev=>!prev);
            setLoadingHarvestNFT(false);
        });
    }
    
    const handlePercentageOfTokenBal = (percent: number) =>{
        const amount = (percent/100) * zltBal;
        setStakeAmount(amount);
    }
    
    const handlePercentageOfStakedToken = (percent: number) =>{
        const amount = Number(stakedBal.toFixed(2)) * (percent/100) ;
        setUnStakeAmount(amount);
    }

    const handleSelectNFTToStake= (id:number)=>{
        setZltNFTToStakeId(id)
        const conn = getContract(zltNftAbi, addresses.zltnft[56], library?.getSigner());
        conn.getApproved(id)
        .then((approvedAddress:string)=>{

            if(approvedAddress.toLowerCase() == addresses.zltNftstaking[56].toLowerCase()){
                setNftApproval(true);
            }else{
                setNftApproval(false);
                console.log("not aproved");
            }
        }).
        catch((e:any)=>{
            console.log("error approval: "+ e)
        })
    }
    const handleSelectNFTToUnStake= (id:number)=>setZltNFTToUnStakeId(id);
    
    useEffect(()=>{
        // console.log(library);
       if(account && library){
        const handleGetBal = async ()=>{
            console.log(account)
        console.log("acct: " + account)
        const contract = getContract(erc20, addresses.krlzlt[56], library?.getSigner())
         await contract.balanceOf(account)
        .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toNumber();
            console.log("balances: " + bal.toFixed(2) );
            const balFixed = Number(bal.toFixed(2));
            setZltBal(balFixed);
            return;
        })
        .catch(() => {
            console.log("bal erro");
        setZltBal(0);
        });
        }

        handleGetBal();
       }
        
        



    // }, [account, library]);
    }, [account, library, refreshBalances]);

    //fetch NFT IN user account
    useEffect(()=>{
        if(account && library){
            const contractNFT = getContract(zltNftPool, addresses.zltNftstaking[56], library.getSigner());
            
            contractNFT.walletOfOwner(account)
            .then((ownedNfts:number[]) => {
                setZltNFTBal(ownedNfts);
                console.log("NFT fetch success");
                if (ownedNfts.length > 0) {
                    handleSelectNFTToStake(ownedNfts[0]);
                }
                return;
            })
            
            .catch((error:any) => {
                console.error("NFT fetch error: ", error);
                setZltNFTBal([]);
            });
        }
    }, [account, library, refreshBalances]);

    

  return (
    <Layout>
        <div className='p-4 text-white'>
            <div className='flex flex-wrap items-center justify-center'>
                <p className=' basis-full md:basis-5/12 text-lg'>
                    Our platform offers you a seamless and secure way to participate in staking, enabling you to unlock the potential of your digital investments.
                    Maximize your crypto assets and earn passive income by staking Zeroloss NFT, ZLT and KRL, ZLT and BUSD two powerful cryptocurrencies.
                </p>
                <img className='basis-full md:basis-5/12' src='/images/staking.png' alt='' />
            </div>

            <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS</p>
                        <p className='text-slate-400'>LP Mining</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full items-center justify-center'>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>{stakedBal} LP</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>{APR.toFixed(2)}%</span>
                            <p className='text-base font-bold'>APR</p>
                        </div>
                        <div className='my-4 grow basis-3/12 md:basis-3/12'>
                        <a href="https://pancakeswap.finance/add/0xF1288cF18B1FAaA35F40111c3E5d2f827e1E920E/0x05D8762946fA7620b263E1e77003927addf5f7E6">
                            <button className=' bg-[#f08c00] m-auto block text-white py-2 px-1'>Get LP</button>
                        </a>

                        </div>
                    </div>

                </div>

                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-2 text-xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        {/* Staking Token */}
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <div className='text-2xl font-semibold flex justify-between items-end'><span>Stake</span><span className='text-xs'>Balance: {zltBal.toFixed(2)} LP</span> </div>
                            {stakeErrorMessage && <p className="font-bold text-sm mt-3">{stakeErrorMessage}</p>}
                            <input
                                
                                onChange={(e) => {
                                    setStakeAmount(e.target.value);
                                    setStakeAmountInwei(
                                      ethers.utils.parseUnits(e.target.value, decimals)
                                    );
                                }}
                                
                                value={stakeAmount} className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span onClick={()=>handlePercentageOfTokenBal(25)} className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span onClick={()=>handlePercentageOfTokenBal(50)} className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span onClick={()=>handlePercentageOfTokenBal(100)} className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            {!active && (
                                <Fragment>
                                <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                <p className="text-sm text-center">Connect your wallet.</p>
                                </Fragment>
                            )}
                            {active && (
                            <button
                                disabled={isApproving}
                                onClick={isApproved ? handleStake : handleApprove}
                                className='bg-[#f08c00] p-3 rounded m-auto flex items-center gap-2 my-3'>{isApproved? "Stake" : "Approve"}{loadingApproveToken ? <TailSpin width={30} height={30} color="white" /> : loadingStakeToken ? <TailSpin width={30} height={30} color="white" /> :""}</button>
                            )}
                            {/* {active && isApproved && (
                            <button
                                disabled={isApproving}
                                onClick={isApproved ? handleStake : handleApprove}
                                className='bg-[#f08c00] p-3 rounded m-auto flex items-center gap-2 my-3'>{isApproved? "Stake" : "Approve"} {loadingApproveToken ? <TailSpin width={30} height={30} color="white" /> : loadingStakeToken ? <TailSpin width={30} height={30} color="white" /> :""}</button>
                            )} */}
                        </div>

                        {/* Unstake TOken */}
                        {stakedBal >0 && (
                            <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                                <div className='text-2xl font-semibold flex justify-between items-end'><span>Unstake </span><span className='text-xs'>Staked: {stakedBal} LP</span> </div>
                            {/* <p className='text-2xl font-semibold'>Unstake</p> */}
                            {/* <p>Staked: {stakedBal}</p> */}
                            {unstakeErrorMessage && <p className="font-bold text-sm mt-3">{unstakeErrorMessage}</p>}

                            <input
                                onChange={(e) => {
                                    setUnStakeAmount(e.target.value);
                                    setUnStakeAmountInwei(
                                      ethers.utils.parseUnits(e.target.value, decimals)
                                    );
                                }}
                                 value={unStakeAmount} placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' />
                            <div className='flex items-center justify-center gap-3'>
                                <span onClick={()=>handlePercentageOfStakedToken(25)} className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span onClick={()=>handlePercentageOfStakedToken(50)} className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span onClick={()=>handlePercentageOfStakedToken(100)} className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            {!active && (
                                <Fragment>
                                <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                <p className="text-sm text-center">Connect your wallet.</p>
                                </Fragment>
                            )}
                            {active && isApproved && (
                                <button 
                                    disabled={isApproving}
                                    onClick={handleUnstake}
                                    className='bg-[#f08c00] p-3 rounded m-auto flex items-center gap-2  my-4'>Unstake {loadingUnStakeToken ? <TailSpin width={30} height={30} color="white" /> : ""}</button>
                            )}

                        </div>
                        )}
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>{pendingReward.toFixed(2)} ZLT</p>
                        <button onClick={handleHarvest} className='px-4 py-3 rounded bg-white text-black font-bold m-auto flex items-center gap-2 my-4'>Harvest{loadingHarvestToken ? <TailSpin width={30} height={30} color="black" /> :""}</button>
                    </div>
                </div>
            </div>


            {/* Staking NFT */}
            <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS NFT</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full items-center justify-center'>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>{zltNFTBal.length}</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-3/12 md:basis-3/12'>
                            <span>{NFTAPR.toFixed(2)} %</span>
                            <p className='text-base font-bold'>APR</p>
                        </div>
                        <div className='basis-3/12 grow'>
                            <a href="https://galxe.com/Zeroloss/campaign/GCcfGUwa6P">
                                <button className=' bg-[#f08c00] m-auto block text-white py-2 px-1'>Get NFT</button>
                            </a>

                        </div>
                    </div>

                </div>
                    <div className='flex flex-wrap justify-between items-center'>
                        <div className='basis-full p-2 text-xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        {zltNFTStakedId.length<1 && 
                        (<div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                {true && (
                    <>
                                <div className='text-2xl font-semibold flex justify-between items-end'><span>Stake</span><span className='text-xs'>Balance: {zltNFTBal?.length}</span> </div>
                                {stakeNFTErrorMessage && <p className="text-sm font-bold mt-3">{stakeNFTErrorMessage} </p>}
                                
                                <div className='flex items-center justify-center gap-3'>
                                    {zltNFTBal?.map((nft, index)=>{
                                        return (

                                            <span onClick={()=>handleSelectNFTToStake(Number(nft.toString()))} key={index} className={`${zltNFTToStakeId==Number(nft.toString())?"bg-white text-black ":""} py-2 px-4 border border-solid border-slate-500'`}>{nft.toString()}</span>
                                        )

                                    })}
                                
                                </div>

                                {!active && (
                                    <Fragment>
                                    <ConnectWalletButton className="hover:bg-white bg-[#f08c00] my-3" />
                                    <p className="text-sm text-center">Connect your wallet.</p>
                                    </Fragment>
                                )}

                                {active  && (
                                <button
                                disabled={isApproving}
                                onClick={nftApproval ? handleStakeNFT: handleApproveNFT }
                                className='bg-[#f08c00] p-3 rounded m-auto  my-3 flex items-center gap-2 '>{nftApproval? "Stake" : "Approve"} {loadingApproveNFT? <TailSpin width={30} height={30} color='white' /> : ""} {loadingStakeNFT ? <TailSpin width={30} height={30} color='white' /> : '' }</button>
                                )}

                                {approveErrorMessage && (<p className="text-sm font-bold">Select an NFT ID to approve</p>)}
                            </>
                            )}
                                    
                            </div>
                            )}
                            
                            {zltNFTStakedId.length>0 && (
                            <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                                <p className='text-2xl text-center my-2 font-semibold'>Unstake</p>
                            {unstakeNFTErrorMessage && <p className="font-bold text-sm mt-3">{unstakeNFTErrorMessage}</p>}

                                {/* <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='number' /> */}
                                <div className='flex items-center justify-center gap-3'>
                                {zltNFTStakedId?.map((nft, index)=>{
                                        return (

                                            <span onClick={()=>handleSelectNFTToUnStake(Number(nft.toString()))} key={index} className='py-2 px-4 border border-solid border-slate-500'>{nft.toString()}</span>
                                        )

                                    })}
                                    
                                </div>
                                
                                {active  && (
                                <button
                                    disabled={isApproving}
                                    onClick={handleUnstakeNFT}
                                    className='bg-[#f08c00] p-3 rounded m-auto flex items-center gap-2 my-3'>UnStake {loadingUnstakeNFT? <TailSpin width={30} height={30} color='white' /> : ''}</button>
                                )}
                            </div>
                            )}
                        </div>
                        <div className='basis-full text-lg lg:basis-[30%] text-center'>
                            <p>Pending Reward</p>
                            <p className='font-bold my-2'>{pendingNFTReward.toString()} ZLT</p>
                            <button onClick={handleHarvestNFT} className='px-4 py-3 tounded bg-white text-black font-bold m-auto flex items-center gap-2 my-4'>Harvest {loadingHarvestNFT ? <TailSpin width={30} height={30} color="black" /> :""}</button>
                        </div>
                    </div>
                
            </div>

            <iframe width="100%" height="172" frameBorder="0" scrolling="no" src="https://coinbrain.com/coins/bnb-0x05d8762946fa7620b263e1e77003927addf5f7e6/ticker?theme=custom&background=ffffff&padding=16&type=medium&currency=USD&blocks=price%2CmarketCap%2Cvolume24h"></iframe>
        </div>
    </Layout>
  )
}

export default stake