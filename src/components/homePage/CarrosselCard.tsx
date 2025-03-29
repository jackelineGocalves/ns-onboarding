import React, { useRef, useState } from "react";
import Image from "next/image";

type CarroselCardProps = {
  img: string;
  children: any;
  index?: number;
  isActive?: boolean;
  handleCLick?: () => void;
  classCard?: string;
};

export default function CarrosselCard({
  img,
  children,
  index,
  isActive,
  handleCLick,
  classCard,
  ...props
}: CarroselCardProps) {
  return (
    <>
      <div className="col-6 " onClick={handleCLick}>
        <div className={`carrossel-card ${classCard} `} {...props}>
          <h3>
            <span
              className={`carrossel-card-number ${index === 1 ? "first" : ""}`}
            >
              {" "}
              {index}{" "}
            </span>
          </h3>
          <div className="carrossel-card-img">
            <Image
              src={img}
              alt="Homepage Image"
              width={400}
              height={400}
              className="h-100 w-100 object-fit-cover img-fluid carrossel-img"
            />
          </div>
          <div className="carrossel-card-content">{children}</div>
        </div>
      </div>
    </>
  );
}
