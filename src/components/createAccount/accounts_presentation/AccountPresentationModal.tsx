import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Btn from "@/components/Btn";
import { AccountPresentationModalProps } from "@/types/types";
import Close from "@/components/icones/Close";

export default function AccountPresentationModal({
  show,
  onHide,
  requeriments,
  generalInfo,
  nextComponent,
  onClick,
  ...props
}: AccountPresentationModalProps) {
  //Case there is no modal content available
  if (!requeriments) {
    return null;
  }

  const handleModalHide = () => {
    onClick();
    onHide();
  };

  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      animation={true}
      centered
      dialogClassName="modal-70w"
    >
      <Modal.Header className="border-0 pb-4 mb-2 p-0 pb-md-4 mb-md-0 d-flex justify-content-end">
        <div className="modal-header-close">
          <Close onClick={onHide} />
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="text-center">
          <h3 className=" pb-2 mb-1 pb-md-3 m-md-0">
            {generalInfo && generalInfo.modal_title
              ? generalInfo.modal_title
              : "Conditions you must fulfil to open this account"}
          </h3>
          <span>
            {generalInfo && generalInfo.modal_description
              ? generalInfo.modal_description
              : "To open this account you must fulfil all the requirements. Read carefully our requirements and see if this is the account for you"}
          </span>
        </div>
        <div className="row pt-4 mt-2 pb-0 mb-2 pt-md-4 pb-md-5 mb-md-2 mt-md-0">
          {requeriments.map((req: any, i: number) => (
            <div key={i} className="col-md-6 pb-4 ">
              <h4 className="txt-secondary-600 pb-1">{req.title}</h4>
              <ul className="m-0">
                {req.topic.map((condition: any, index: number) => (
                  <li className="txt-primary-600" key={index}>
                    {condition.bullet_points}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className=" border-0 p-0 d-flex justify-content-between gap-3 gap-sm-0">
        <Btn btnClass="btn-modal btn btn-secondary" onClick={handleModalHide}>
          {generalInfo && generalInfo.dont_fulfil_btn
            ? generalInfo.dont_fulfil_btn
            : "I don´t fulfil all the requeriments"}
        </Btn>
        <Btn btnClass="btn-modal btn btn-primary" onClick={nextComponent}>
          {generalInfo && generalInfo.fulfil_btn
            ? generalInfo.fulfil_btn
            : "I fulfil all the requeriments"}
        </Btn>
      </Modal.Footer>
    </Modal>
  );
}
