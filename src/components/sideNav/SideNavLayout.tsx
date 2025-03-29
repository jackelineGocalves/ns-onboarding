"use client";
import LogoCompany from "../icones/LogoCompany";
import LogoCompanyResponsive from "../icones/LogoCompanyResponsive";
import NavElementContainer from "./NavElementContainer";
import { SideNavLayoutProps } from "@/types/types";


export default function SideNavLayout({
  displayClass,
  navElementsList,
  sideBarText,
  handleSideNav,
  stepsCompleated,
  subStepsCompleated,
  goToChooseAccountPhase,
  goToMultiholdersPhase,
  goToValidateIdentityPhase,
  goToConclusionPhase,
  goToIDcardValidation,
  goToAddressValidation,
  goToValidateJobSituation,
  goToVideoCall,
  processHistory,
  openAccountCurrentProcess,
}: SideNavLayoutProps) {
  
  return (
    <>
      {/*SIDE NAV MOBILE*/}

      <div className="side-nav-mobile d-block d-lg-none">
        <div className={`side-nav-bg  ${displayClass}`}>
          <div className="logo-md">
            <div className="logo-layout d-sm-none d-lg-block">
              <div className="logo-company white img-fluid">
                <LogoCompanyResponsive />
              </div>
            </div>
          </div>

          {openAccountCurrentProcess.currentSideBarSection == "Contacts" && (
            <div className="principal-section text-sm-center">
              <h3 className="m-0">
                {sideBarText && sideBarText.title
                  ? sideBarText.title
                  : "Choose your account SUPAFAST!"}
              </h3>
              <span>
                {" "}
                {sideBarText && sideBarText.text
                  ? sideBarText.text
                  : "Open an online account in minutes"}
              </span>
            </div>
          )}
          {openAccountCurrentProcess.currentSideBarSection ==
            "Create Account" && (
            <div>
              <NavElementContainer
                openAccountCurrentProcess={openAccountCurrentProcess}
                handleSideNav={handleSideNav}
                navElementsList={navElementsList}
                stepsCompleated={stepsCompleated}
                subStepsCompleated={subStepsCompleated}
                processHistory={processHistory}
                goToChooseAccountPhase={goToChooseAccountPhase}
                goToMultiholdersPhase={goToMultiholdersPhase}
                goToValidateIdentityPhase={goToValidateIdentityPhase}
                goToIDcardValidation={goToIDcardValidation}
                goToAddressValidation={goToAddressValidation}
                goToValidateJobSituation={goToValidateJobSituation}
                goToVideoCall={goToVideoCall}
                goToConclusionPhase={goToConclusionPhase}
              />
            </div>
          )}
        </div>
      </div>

      {/*SIDE NAV DESKTOP*/}

      <div className="side-nav-md d-none d-lg-block h-100">
        <div className="side-nav-bg">
          <div className="logo-md">
            <div className="logo-layout">
              <div className="logo-company-side-nav white img-fluid">
                <LogoCompany />
              </div>
            </div>
          </div>

          {openAccountCurrentProcess.currentSideBarSection == "Contacts" && (
            <div className="principal-section">
              <h3 className="m-0">
                {" "}
                {sideBarText && sideBarText.title
                  ? sideBarText.title
                  : "Choose your account SUPAFAST!"}
              </h3>
              <span>
                {" "}
                {sideBarText && sideBarText.text
                  ? sideBarText.text
                  : "Open an online account in minutes"}
              </span>
            </div>
          )}

          {openAccountCurrentProcess.currentSideBarSection ==
            "Create Account" && (
            <div>
              <NavElementContainer
                openAccountCurrentProcess={openAccountCurrentProcess}
                navElementsList={navElementsList}
                stepsCompleated={stepsCompleated}
                subStepsCompleated={subStepsCompleated}
                processHistory={processHistory}
                goToChooseAccountPhase={goToChooseAccountPhase}
                goToMultiholdersPhase={goToMultiholdersPhase}
                goToValidateIdentityPhase={goToValidateIdentityPhase}
                goToIDcardValidation={goToIDcardValidation}
                goToAddressValidation={goToAddressValidation}
                goToValidateJobSituation={goToValidateJobSituation}
                goToVideoCall={goToVideoCall}
                goToConclusionPhase={goToConclusionPhase}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
