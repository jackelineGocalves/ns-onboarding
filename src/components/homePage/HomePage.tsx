import Btn from "../Btn";
import ArrowRight from "../icones/ArrowRight";
import UpLeftArrow from "../icones/UpLeftArrow";
import React from "react";

type HomePageProps = {
  tag: string;
  title: React.ReactNode;
  description: React.ReactNode;
  btnLink?: string;
  principalBtn?: string;
  secondBtn?: string;
  invitation_tag?: string;
  thirdBtn?: string;
  children?: React.ReactNode;
};

export default function HomePage(props: HomePageProps) {
  const {
    tag,
    title,
    description,
    principalBtn,
    secondBtn,
    invitation_tag,
    thirdBtn,
  } = props;

  //If the user clicks on open account, the process carried out is deleted and starts again
  const handleDeleteSessionStorageData = () => {
    sessionStorage.removeItem("contactFormData");
    sessionStorage.removeItem("ChoosenAccount");
    sessionStorage.removeItem("documentsReaded");
    sessionStorage.removeItem("multiHoldersData");
    sessionStorage.removeItem("OpenAccountCurrentProcess");
  };

  return (
    <>
      <div className="d-flex flex-column presentation">
        <div className="d-flex flex-column gap-3 gap-md-4">
          <div className="d-flex flex-column gap-2">
            {tag && <div className="caption txt-primary-600">{tag}</div>}
            {title && <h1 className="m-0">{title}</h1>}
          </div>
          {description && <span className="m-0"> {description}</span>}
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-start align-items-start gap-3 gap-md-4">
          {principalBtn && (
            <a href="/openaccount">
              <Btn
                btnClass="btn btn-primary"
                onClick={handleDeleteSessionStorageData}
              >
                {principalBtn}
              </Btn>
            </a>
          )}
          {secondBtn && (
            <a href="/openaccount">
              <Btn btnClass="btn btn-secondary gap-1">
                {" "}
                {secondBtn} <ArrowRight classimg="icon-btn-size16" />{" "}
              </Btn>
            </a>
          )}
        </div>
      </div>

      <div className="d-flex gap-md-3 gap-1 pt-3 mt-1 pt-md-4 mt-md-0 align-items-center">
        {invitation_tag && <p className="m-0">{invitation_tag}</p>}
        {thirdBtn && (
          <a href="">
            <Btn btnClass="btn btn-basic">
              {" "}
              {thirdBtn} <UpLeftArrow />{" "}
            </Btn>
          </a>
        )}
      </div>
    </>
  );
}
