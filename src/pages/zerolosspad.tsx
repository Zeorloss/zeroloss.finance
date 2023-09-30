import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Button from "../components/Buttons/Button";
import Layout from "../components/Layout";
import Section from "../components/Section";
import { Link } from "gatsby";
import { SEO } from "../components/Seo";
// import Button from '../components/Button'
// import {Button as tn} from "../components/Button";

function zerolosspad() {
  return (
    <Layout>
      <Section
        padding
        containerClass="bg-[#070124]"
        className="flex flex-wrap justify-between items-center text-white gap-10 text-center md:text-left"
      >
        <div className="max-w-mds w-full md:basis-5/12">
          <StaticImage
            src="../images/launchpadz-page-hero-image.png"
            alt="launchpadz-page-hero-image"
            layout="fullWidth"
            placeholder="blurred"
          />
        </div>
        <div className="md:basis-5/12 space-y-4">
          <h1 className="text-2xl">IDO LaunchPad</h1>
          <p>
            <b className="text-primary-400 text-2xl">Zeroloss</b> Launchpad is your
            ticket for early access to the best new crypto and DeFi tokens in
            the space. IZO projects are carefully chosen through vetting, from
            implementation capacities to the origins of the project teams and
            Doxing(legitimacy) into account.
          </p>
          <p>
            We facilitate the early stage funding of Metaverse projects and
            communities by amplifying them through Zeroloss POE culture.
          </p>
          <Link className="block mt-5" to="/swap">
            <Button>Buy ZLT for IDO</Button>
          </Link>
          <p>Apply to launch on Zeroloss</p>
          <a className="block mt-5" href="https://forms.gle/U2c724jmK1nBnpwt7">
            <Button>Apply</Button>
          </a>
        </div>
      </Section>
      <section className="px-4  text-white mt-32 text-center">
        <h2 className="text-3xl text-center lg:text-5xl font-bold mb-4">
          Cryptofy Digital
        </h2>
        <p>Get Started with Cryptofy Coin (CFYC)</p>
        <p className="my-4">
          Cryptofy bridges the virtual and the physial worlds offering and
          integrating Blockchain value between real world, lives and the virtual
          world.
        </p>
        <Link to="/cfyc">
          <Button className="p-2 my-4 m-auto rounded-lg text-white w-40 bg-primary-600">
            BUY CFYC
          </Button>
        </Link>
      </section>
      <Section containerClass="bg-white text-black text-center pt-32 pb-40" className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          No fees, Low risk, No rug polls, only rewards
        </h2>
        <p>
          Zero risk IDO enables promising projects to raise capital on the BSC.
          Investors are safe to invest in early-stage projects through our KYC
          system and strict due diligence. We make sure only audited, carefully
          vetted, and analyzed blockchain projects will be chosen for IDO.
        </p>
        <p>
          We make it easy, safe and secure to lock any BEP-20 based token in
          seconds protecting investors from ‘rug pulls’. Hold 10000 ZLT to get
          whitelisted for IZO
        </p>
      </Section>
      <Section containerClass="bg-white -mt-20">
        <img src="/images/launch2.png" alt="lauch page image" />
      </Section>
    </Layout>
  );
}

export default zerolosspad;

export const Head = () => <SEO title="Pad | Zeroloss" />;
