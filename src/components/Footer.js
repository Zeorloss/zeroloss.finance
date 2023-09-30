import { Link } from "gatsby";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillMediumCircle } from "react-icons/ai";
import React, { useEffect } from "react";
import { BsDiscord, BsTelegram } from "react-icons/bs";

const Footer = () => {
  useEffect(() => {
    async function dynamicImportModule() {
      const DynamicModule = await import("boxicons");
    }

    dynamicImportModule();
  }, []);
  return (
    <footer className="text-white flex flex-col flex-wrap items-center p-5">
      <img
        className="max-w-[300px]"
        src="/images/tZeroloss-footer.png"
        alt="zeroloss foooter logo"
      />

      <div className="flex gap-10 flex-wrap text-xl p-10">
        <Link to="/swap">Swap</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="flex gap-10 p-16 my-10 border-solid border-slate-100 w-full border-t-[1px] border-b-[1px] justify-center items-center">
        <a rel="no-referrer no-follow" href="https://twitter.com/Zeroloss_defi">
          <AiFillTwitterCircle size="30px" />
        </a>
        <a rel="no-referrer no-follow" href="https://discord.gg/brUDkCb72M">
          <BsDiscord size="30px" />
        </a>
        <a
          rel="no-referrer no-follow"
          href="https://www.linkedin.com/company/zerolossorg"
        >
          <AiFillLinkedin size="30px" />
        </a>
        <a rel="no-referrer no-follow" href="https://zeroloss.medium.com/">
          <AiFillMediumCircle size="30px" />
        </a>
        <a rel="no-referrer no-follow" href="https://t.me/zerolossofficial">
          <BsTelegram size="30px" />
        </a>
      </div>

      <div className="flex flex-wrap gap-7 sm:gap-2 justify-evenly text-center">
        <p className="sm:basis-3/12">Made with ❤️ for the ZEROLOSS Community</p>
        <p className="sm:basis-3/12">
          For all marketing and advertising, please contact our Marketing{" "}
          <a rel="no-referrer no-follow" href="mailto:teammarketing@zeroloss.finance">
            <strong>teammarketing@zeroloss.finance</strong>
          </a>
        </p>
        <p className="sm:basis-3/12">
          For general inquiries, please{" "}
          <a rel="no-referrer no-follow" href="mailto:contactinfo@zeroloss.finance">
            <strong>contactinfo@zeroloss.finance</strong>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
