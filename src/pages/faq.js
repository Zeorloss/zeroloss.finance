import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const faq = () => {
  return (
    <Layout>
      <section className="bg-black text-white text-4xl py-20 font-bold text-center">
        <div className="pb-1">
          <h2>FAQ</h2>
        </div>
      </section>

      <section className='px-4 bg-[#F5F9FF] mb-10' >
        <div className='max-w-sm block m-auto'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 text-sm'>
              <h3 className='font-bold text-3xl my-4'>General</h3>
              <div className='flex flex-col gap-4'>
                <div className='bg-white p-4 '>
                  <h4 className='py-4 text-md font-bold'>Introduction</h4>
                  <hr />
                  <p>A disruptive Defi2.0 dApp.</p>
                  <p>ZLT is the utility Token of ZEROLOSS digital platform and dApp that carries the store of value and interoperability</p>
                </div>

                <div className='bg-white p-4 '>
                  <h4 className='py-4 text-md font-bold'>Contact Us</h4>
                  <hr />
                  <p>Join our <Link className='text-primary-400' to="https://t.me/+ea-5HwPvFRcyM2Q0">Telegram group</Link> (ENG)</p>
                  <p>Join our <Link className='text-primary-400' to="https://t.me/ZerolossNews">Telegram News channel</Link></p>
                  <p>Follow our official Twitter: <Link className='text-primary-400' to='https://twitter.com/Zeroloss_defi'>Twitter Page</Link></p>
                  <p>Follow our official Reddit: <Link className='text-primary-400' to='https://www.reddit.com/user/ZeroLoss'>Reddit Page</Link></p>
                  <p>Follow our official Medium: <Link className='text-primary-400' to="https://zeroloss.medium.com">Medium Page</Link></p>
                </div>

                <div className='bg-white p-4 flex flex-wrap flex-col gap-5'>
                  <h4 className='py-4 text-md font-bold'>Light Paper</h4>
                  <p>ZEROLOSS Light Paper</p>
                  <p>PMM Algorithm is the core interoperability model of ZEROLOSS! ZLT is the utility Token of ZEROLOSS 
                    digital blockchain ledger that carries the store of value and interoperability,</p>
                  <p className='text-primary-400'><a download href='/litepaper.pdf'>Read more...</a></p>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <h3 className='font-bold text-3xl'>Transferring / Trading in general</h3>
              <p>ZLT Token can be bought, exchanged and stored in your wallet. Buy: <Link className='text-primary-400' to="/launchapp">Here</Link></p>
              <div className='flex flex-col gap-4 mt-4 '>
                <div className='bg-white p-4'>
                  <h4 className='py-4 text-md font-bold'>Exchange Listing, CEX and DEX</h4>
                  <hr />
                  <p>ZLT will be listed at TOP exchanges soon. check our website or at <Link className='text-primary-400' to="#">CMC</Link>, <Link className='text-primary-400' to="#">COINLIST</Link> or <Link className='text-primary-400' to="#">CoinGecko</Link></p>
                </div>

                <div className='bg-white p-4 flex flex-col gap-5'>
                  <h4 className='py-4 text-xl font-bold'>Smart Contract Address</h4>
                  <hr />

                  <p>Binance Smart Chain: Click <Link className='text-primary-400' to="https://bscscan.com/token/0x05d8762946fa7620b263e1e77003927addf5f7e6">here</Link> </p>
                  <p>Join our <Link to="https://t.me/ZerolossNews">Telegram News channel</Link></p>
                  <p className='text-bold'>Polygon Network Soon</p>
                  <p className='text-bold'>Solana Network Soon</p>
                </div>
                
                <div className='bg-white p-4'>
                  <h4 className='py-4 text-xl font-bold'>Bridge</h4>
                  <hr />
                  <p>ZEROLOSS Blockchain Cross-Chain Bridge coming soon</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <h3 className='font-bold text-3xl'>How TO Buy buy/sell</h3>
              <p>This is a guide to trade, either to buy or to sell, ZLT.</p>
              <div className='flex flex-col gap-4 mt4 '>
                <div className='bg-white p-4 flex flex-col gap-5'>
                  <h4 className='py-4 text-md font-bold'>How to Buy</h4>
                  <hr />
                  <p>If you are new to Crypto and DeFi, here's a guide on how to connect to Binance Smart Chain with Metamask or Trustwallet</p>

                  <span>
                    <p>Step 1. Metamask</p>
                    <p>Download <Link to="https://www.metamask.io/">Metamask Chrome Extension</Link> or</p>
                    <p>Download <Link to="https://www.metamask.io/">Metamask on your phone</Link></p>
                  </span>


                  <span>
                  <p>Add extension and then you will get two options:</p>
                  <p>1. Import Wallet 2. Create New Wallet.</p>
                  <p>if You want to create new wallet.</p>
                  <p>First Create Password</p>
                  </span>

                  <p>You will then be given your backup phrase. Write this down somewhere safe. Don't give out your Recovry phrase</p>
                  <p>Connect Your MetaMask With Binance Smart Chain</p>
                  <img src='/images/metamaskbsc-faq.png' alt='metamask app screenshoot' />
                  <p>Click the red circle icon in the top right hand corner and go down to Settings. Scroll down to select Networks and from the list select Add Network.</p>
                  <p>Add a new network</p>
                  <img src='/images/metamaskbsc1-faq.png' alt='metamask screenshot' />

                  <p>Click save and click the X to head back to main view. You will notice the units are no longer showing in ETH but are now showing BNB. Your wallet is now ready and connected to the Binance Smart Chain main net.</p>
                  <p>Step 2. Send BNB to your Metamask Wallet.</p>
                  <p>I will assume you already have a Binance account and have some BNB already. If not, register an account and buy some!</p>
                  <p>Go to your wallet, find BNB and click Withdraw.</p>

                  <span>
                  <p>Here you will need to enter your Metamask address into the recipients BNB address field. So head back to your Metamask wallet and hover over and click on Account 1 at the top of the page, this will copy your address.</p>
                  <p>Go back to your Binance withdrawal page and paste that address into the Recipient’s BNB Address field.</p>
                  <p>You then have two options for Transfer Network, you have to select Binance Smart Chain (BEP20).</p>
                  <p>Then lastly enter the amount of BNB you wish to send to your Metamask wallet and click submit.</p>
                  <p>It may take a couple of mins for your BNB to reach your Metamask wallet so don’t freak out if the balance in your wallet isn’t updated instantly.</p>
                  </span>

                  <p>Step 3. Buy ZLT on Pancakeswap</p>

                  <p>Go to ZLT’s page on Pancakeswap</p>

                  <p>On this page you will see a button saying Connect. Click on it and select Metamask.</p>
                  
                  <p>Enter how much BNB you would like to spend to buy ZLT.</p>
                  
                  <p>Click on the settings icon and adjust Slippage Tolerance to 1% and close settings. Then click Swap</p>
                  
                  <p>If you get an error message, go back to settings and adjust Slippage Tolerance to 5%. You have now purchased PROFIT. But it won’t show up in your wallet just yet.</p>

                  <p>Step 4. Get ZLT to show in your Metamask Wallet or Trust Wallet</p>

                  <p>Go back to Metamask/TrustWallet and on the main page click the Add Token button and the select Custom Token.</p>

                  <p>Then paste the token address into the Token address field.</p>

                  <p>The two remaining fields should be filled out for you once you paste in the token address.</p>

                  <p>Then click add token and once you have done that you will be able to see your PROFIT in your Metamask wallet or Trust Wallet.</p>

                  <p>Also keep in mind that exchanges differ on minimal deposit and withdrawal fee.</p>
                  
                  <p>For now, use a decentralised exchange to which you can connect a personal wallet on the BEP-20 network.</p>
                </div>

                <div className='bg-white p-4 flex flex-col gap-5'>
                  <h4 className='py-4 text-xl font-bold'>Personal Wallets</h4>
                  <hr />
                  <p>Personal wallets are used to store PROFIT (outside of exchanges) and to trade at decentralised exchanges.</p>
                  <p>Such wallets are <Link to="https://metamask.io/">MetaMask</Link>, <Link to="https://trustwallet.com/">Trust Wallet </Link>,<Link to="https://www.tronlink.org/">TronLink</Link> choose one that suits you.</p>
                  <p className='text-bold'>Polygon Network Soon</p>
                  <p className='text-bold'>Solana Network Soon</p>
                </div>
                
                <div className='bg-white p-4 flex flex-col gap-5'>
                  <h4 className='py-4 text-xl font-bold'>Trading on Centralized Exchanges</h4>
                  <hr />
                  <p className='font-bold'>How to buy/trade PROFIT</p>
                  <p clas>If you already own crypto’s, you can skip step 1.</p>
                  <p>[1]  Buy your first crypto (USDT, BTC, ETH, whatever is possible), either through (1) a bank transfer or (2) the use of a credit card.</p>
                  <p>This can be done via a variety of sites, Moonpay or Binance.</p>
                  <p>It is highly recommended, in my opinion, buy via Binance and in particular BNB COIN (Binance’s Native Token).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default faq

export const Head = () => (
  <SEO title="Faq | Zeroloss" />
)