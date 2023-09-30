import React from "react";
import CardItem from "./CardItem";
import { item } from "../data/content";

const Cards = () => {
  return (
    <section className="text-center px-4 py-10 bg-white">
      <div className="flex flex-wrap items-stretch gap-10 sm:gap-[3vw] lg:gap-1 justify-evenly">
        {item.map((item, index) => (
          <CardItem key={index} content={item} />
        ))}
      </div>
    </section>
  );
};

export default Cards;
