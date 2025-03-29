import React, { useState } from 'react';
import Close from "./icones/Close";
import { AlertProps } from "@/types/types";

export default function Alert({ onClick, chooseAccountAlertContent, alertClass, isAlertOpen, ...props }: AlertProps) {

  return (
    <div className={`alert mx-3 ${alertClass} ${isAlertOpen ? 'slide-out-animation' : ''}`} {...props}>
      <div className="d-flex justify-content-between py-2 my-1 px-3">
        <div className="d-flex ">
          <div className="alert icon">
            {chooseAccountAlertContent.icon}
          </div>
          <div className="ms-3">
            <h4 className="txt-danger-400 m-0 pb-2">{chooseAccountAlertContent.title}</h4>
            <span>{chooseAccountAlertContent.text}</span>
          </div>
        </div>
        <div className="alert error close ms-4" onClick={onClick}>
          <Close />
        </div>
      </div>
    </div>
  );
}
