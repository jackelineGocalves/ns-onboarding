'use client'
import { useCMSdata } from "@/store/useCMdataStore";
import LogoCompany from "./icones/LogoCompany";
import LogoCompanyResponsive from "./icones/LogoCompanyResponsive";

type FooterProps = {
  logoCompany?: React.ReactElement;
  logoCompanyResponsive?: React.ReactElement;
  firstText?: string;
  firstTextLink?: string;
  secondText?: string;
  secondTextLink?: string;
};

export default function Footer({
  logoCompany,
  logoCompanyResponsive,
  firstText,
  firstTextLink,
  secondText,
  secondTextLink,
}: FooterProps) {
  const CMSdata = useCMSdata((state) => state.homepageData);

  const contentListTest = {
    LogoCompany: <LogoCompany />,
    logoCompanyResponsive: <LogoCompanyResponsive />,
    firstText: "Privacy",
    firstTextLink: "",
    secondText: "Legal Information",
    secondTextLink: "",
  };

  return (
    <>
      {CMSdata && (
        <footer className="pt-5 mt-2">
          <div className="bgc-primary-50 d-flex">
            <div className="container-xl">
              <div className="row g-5 g-lg-0 m-0 py-5 ">
                <div className="col-lg-6 m-0">
                  <div className="logo-company-footer m-0">
                    {contentListTest.LogoCompany}
                  </div>
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-end gap-3 ">
                  <a
                    className="btn-font txt-primary-800"
                    href={contentListTest.firstTextLink}
                  >
                    {contentListTest.firstText}
                  </a>
                  <a
                    className="btn-font txt-primary-800"
                    href={contentListTest.secondTextLink}
                  >
                    {contentListTest.secondText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
     )}
    </>
  );
}
