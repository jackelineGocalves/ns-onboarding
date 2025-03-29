"use client";
import { useCMSdata } from "@/store/useCMdataStore";
import LogoCompany from "./icones/LogoCompany";
import LogoCompanyResponsive from "./icones/LogoCompanyResponsive";
import Image from "next/image";

type HeaderProps = {
  bgTextClass: string;
  logoColor?: string;
};

export default function Header({ bgTextClass, logoColor }: HeaderProps) {
  let CMSdata: any = {};
  CMSdata = useCMSdata((state) => state.homepageData);

  return (
    <header>
      <div className="header-container container-fluid m-0">
        <div className="header-content d-flex justify-content-between align-items-center">
          <>
            <div className="logo-md ms-2 ms-xl-5 z-1">
              <div className={`logo-company ${logoColor ? "white" : ""}`}>
                {" "}
                {CMSdata ? (
                  <Image
                    src={CMSdata.header.logo_company}
                    alt="Logo"
                    width={0}
                    height={0}
                    className="logo-company"
                  />
                ) : (
                  <LogoCompany />
                )}
              </div>
            </div>

            <div className="logo-sm z-1">
              <div className={`logo-company ${logoColor ? "white" : ""}`}>
                {" "}
                {CMSdata ? (
                  <Image
                    src={CMSdata.header.logo_company_responsive}
                    alt="Logo responsive"
                    width={0}
                    height={0}
                    className="logo-company"
                  />
                ) : (
                  <LogoCompanyResponsive />
                )}
              </div>
            </div>
            <div className="header-text-container z-1">
              <div
                className={`text-header ${bgTextClass} d-flex align-items-center rounded-start-5 py-md-3`}
              >
                {CMSdata?.header.text ? CMSdata.header.text : "Open Account"}
              </div>
            </div>
          </>
        </div>
      </div>
    </header>
  );
}
