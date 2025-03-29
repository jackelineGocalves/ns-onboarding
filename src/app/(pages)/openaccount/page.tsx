"use client";
import PersonalInfoForm from "@/components/createAccount/personal-info-form/PersonalInfoForm";
import Close from "@/components/icones/Close";
import LogoCompanyResponsive from "@/components/icones/LogoCompanyResponsive";
import NavElement from "@/components/sideNav/NavELement";
import SideNavLayout from "@/components/sideNav/SideNavLayout";
import { useEffect, useState } from "react";
import { useOpenAccountCurrentProcess } from "@/store/useShowCurrentComponent";
import Test from "@/components/createAccount/Test";
import ContactValidation from "@/components/createAccount/contact-validation/ContactValidation";
import AccountsPresentationContainer from "@/components/createAccount/accounts_presentation/AccountsPresentationContainer";
import EmailValidation from "@/components/createAccount/email-validation/EmailValidation";
import ChooseOption from "@/components/createAccount/choose_option/ChooseOption";
import DocumentPages from "@/components/createAccount/document-pages/DocumentPages";
import AddMultiHoldersOption from "@/components/createAccount/multiholders/AddMultiHoldersOption";
import MultiHolders from "@/components/createAccount/multiholders/MultiHolders";
import InvitationSuccess from "@/components/createAccount/multiholders/InvitationSuccess";
import {
  useIDcardValidation,
  useMultiHoldersForm,
} from "@/store/userAccountStore";
import InvitationError from "@/components/createAccount/multiholders/InvitationError";
import { MultiHoldersClientContent } from "@/components/createAccount/multiholders/interfaces";
import { getSideBarData } from "@/services/cms/apis/sideBar";
import { getSideBarTextData } from "@/services/cms/apis/sideBar";
import { getOpenAccountProcessData } from "@/services/cms/apis/openAccount";
import Loader from "@/components/Loader";
import Conclusion from "@/components/Conclusion";
import { navElementsList } from "./interface"; //If there is not cms side bar data avaliable, this array will be used
import ValidateIDCardOption from "@/components/createAccount/ValidateIDCard/ValidateIDCardOption";
import ValidateDocumentsBg from "@/components/createAccount/ValidateDocumentsBg";
import { getDeviceType } from "@/helpers/deviceType";
import { openAccountPhases } from "./interface";
import { useWindowSize } from "@uidotdev/usehooks";
import { OpenAccountCmsData } from "@/types/types";
import TurnOnCamera from "@/components/createAccount/TurnOnCamera";
import ScanDocuments from "@/components/createAccount/ScanDocuments";
import ShowIdCardData from "@/components/createAccount/ValidateIDCard/ShowIdCardData";

const holderInvitationStatus = "success";

// export default function OpenAccount({params, searchParams}: {
//   params: {slug: string}
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   let headerText = "Open Account";

//Client content test
export default function OpenAccount() {
  const headerText = "Open Account";
  const windowSize = useWindowSize();

  //Fetch cms sideBar data
  const [openAccountCmsData, setOpenAccountCmsData] =
    useState<OpenAccountCmsData>();

  //Global States
  const addMultiHolderOption = useMultiHoldersForm((state) => state.forms);
  const currentProcess = useOpenAccountCurrentProcess();
  const setOpenAccountCurrentProcess = useOpenAccountCurrentProcess(
    (state) => state.setOpenAccountCurrentProcess
  );
  const stepsCompleated = useOpenAccountCurrentProcess(
    (state) => state.stepsCompleated
  );
  const subStepsCompleated = useOpenAccountCurrentProcess(
    (state) => state.subStepsCompleated
  );
  const userPhasesHistory = useOpenAccountCurrentProcess(
    (state) => state.userPhasesHistory
  );
  const setUserPhasesHistory = useOpenAccountCurrentProcess(
    (state) => state.setUserPhasesHistory
  );
  const wasValidated = useIDcardValidation((state) => state.wasValidated);

  //Local States
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); //State to control that components are only shown when the data stored in the session is merged with the current state
  const [showOtpEmailComponent, setShowOtpComponent] = useState<
    boolean | undefined
  >(undefined);
  const [deviceType] = useState(getDeviceType());

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [sideBarSteps, sideBarInitialText, openAccountPhases] =
          await Promise.all([
            getSideBarData(),
            getSideBarTextData(),
            getOpenAccountProcessData(),
          ]);
        //Update states only if the component is mounted
        if (isMounted) {
          setOpenAccountCmsData({
            sideBarSteps: sideBarSteps,
            sideBarInitialText: sideBarInitialText,
            openAccountPhases: openAccountPhases,
          });
        }
      } catch (error) {
        console.error("Error getting data", error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  //Delete the first element of the client array so that it does not appear in the SideBar.
  const navElements = openAccountCmsData?.sideBarSteps
    ? openAccountCmsData.sideBarSteps.sideBar.slice(1)
    : navElementsList.slice(1); //Condition if the state is not null, the cms data is used, otherwise the local data

  //Show Loading Component until storage and global states dosen't join
  useEffect(() => {
    const timer = setTimeout(() => {
      if (useOpenAccountCurrentProcess.persist.hasHydrated()) {
        setHydrated(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //Function to get the state of showOtpEmailcomponent present in PersonalInforForm
  const handleEmailValidationChange = (needsValidation: boolean) => {
    setShowOtpComponent(needsValidation);
  };

  //Functions to control the section change in the component buttons
  const nextStep = () => {
    const { currentStep, currentVersion } =
      currentProcess.openAccountCurrentProcess;

    const nextStep = openAccountPhases.find(
      (step) => step.id === currentStep + 1
    );
    if (!nextStep) return;

    if (nextStep.subSteps) {
      // If next step has no substeps, start with the first subStep and first component
      const firstSubStep = nextStep.subSteps[0];
      const firstComponents = firstSubStep.components.filter(
        (comp) => comp.version === currentVersion || comp.version === "both"
      );

      setOpenAccountCurrentProcess({
        currentStep: nextStep.id,
        currentSubStep: firstSubStep.id,
        currentComponent: firstComponents[0].id,
        currentVersion: currentVersion,
        currentPhaseName: firstComponents[0].name,
      });
    } else {
      // If the next step has no substeps, start with the first component of the step
      const nextComponents = nextStep.components.filter(
        (comp) => comp.version === currentVersion || comp.version === "both"
      );

      if (nextStep.id == 2) {
        setOpenAccountCurrentProcess({
          currentSideBarSection: "Create Account",
        });
      }
      setOpenAccountCurrentProcess({
        currentStep: nextStep.id,
        currentSubStep: null,
        currentComponent: nextComponents[0].id,
        currentVersion: currentVersion,
        currentPhaseName: nextComponents[0].name,
      });
    }
  };

  const handleNextPhase = () => {
    const { currentStep, currentSubStep, currentComponent, currentVersion } =
      currentProcess.openAccountCurrentProcess;
    const step = openAccountPhases.find((step) => step.id === currentStep);

    if (!step) return;

    // If the current step has substeps
    if (step.subSteps) {
      if (currentSubStep !== null) {
        // Navigate within the current substep
        const subStep = step.subSteps.find(
          (subStep) => subStep.id === currentSubStep
        );
        if (!subStep) return;

        const components = subStep.components.filter(
          (comp) => comp.version === currentVersion || comp.version === "both"
        );
        const currentComponentIndex = components.findIndex(
          (comp) => comp.id === currentComponent
        );

        if (currentComponentIndex < components.length - 1) {
          // Advance to the next component in the current substep
          setOpenAccountCurrentProcess({
            currentComponent: components[currentComponentIndex + 1].id,
            currentPhaseName: components[currentComponentIndex + 1].name,
          });
        } else {
          // Advance to the next substep if it is the last component of the current substep
          const nextSubStep = step.subSteps.find(
            (subStep) => subStep.id === currentSubStep + 1
          );
          if (nextSubStep) {
            const nextComponents = nextSubStep.components.filter(
              (comp) =>
                comp.version === currentVersion || comp.version === "both"
            );
            setOpenAccountCurrentProcess({
              currentSubStep: nextSubStep.id,
              currentComponent: nextComponents[0].id,
              currentPhaseName: nextComponents[0].name,
            });
            subStepsCompleated.push(subStep.id);
          } else {
            // If there are no more subSteps, move on to the next step
            subStepsCompleated.push(subStep.id);
            stepsCompleated.push(step.id);
            nextStep();
          }
        }
      }
    } else {
      //If the step has no substeps, navigate between the step components
      const components = step.components.filter(
        (comp) => comp.version === currentVersion || comp.version === "both"
      );
      const currentComponentIndex = components.findIndex(
        (comp) => comp.id === currentComponent
      );

      if (currentComponentIndex < components.length - 1) {
        // Advance to the next component in the current step
        setOpenAccountCurrentProcess({
          currentComponent: components[currentComponentIndex + 1].id,
          currentPhaseName: components[currentComponentIndex + 1].name,
        });
      } else {
        stepsCompleated.push(step.id);
        //Advance to the next step if it is the last component of the current step
        nextStep();
      }
    }
  };

  const previousStep = () => {
    const { currentStep, currentVersion } =
      currentProcess.openAccountCurrentProcess;

    const prevStep = openAccountPhases.find(
      (step) => step.id === currentStep - 1
    );
    if (!prevStep) return;

    if (prevStep.subSteps) {
      //If the previous step has substeps, go to the last substep and its last component
      const lastSubStep = prevStep.subSteps[prevStep.subSteps.length - 1];
      const lastComponents = lastSubStep.components.filter(
        (comp) => comp.version === currentVersion || comp.version === "both"
      );

      setOpenAccountCurrentProcess({
        currentStep: prevStep.id,
        currentSubStep: lastSubStep.id,
        currentComponent: lastComponents[lastComponents.length - 1].id,
        currentVersion: currentVersion,
        currentPhaseName: lastComponents[lastComponents.length - 1].name,
      });
    } else {
      //If the previous step has no substeps, go to the last component of the step
      const prevComponents = prevStep.components.filter(
        (comp) => comp.version === currentVersion || comp.version === "both"
      );

      if (prevStep.id == 1) {
        setOpenAccountCurrentProcess({
          currentSideBarSection: "Contacts",
        });
      }

      setOpenAccountCurrentProcess({
        currentStep: prevStep.id,
        currentSubStep: null,
        currentComponent: prevComponents[prevComponents.length - 1].id,
        currentVersion: currentVersion,
        currentPhaseName: prevComponents[prevComponents.length - 1].name,
      });
    }
  };

  const handlePreviousPhase = () => {
    const { currentStep, currentSubStep, currentComponent, currentVersion } =
      currentProcess.openAccountCurrentProcess;
    const step = openAccountPhases.find((step) => step.id === currentStep);

    if (!step) return;

    // If the current step has substeps
    if (step.subSteps) {
      if (currentSubStep !== null) {
        // Navigate within the current substep
        const subStep = step.subSteps.find(
          (subStep) => subStep.id === currentSubStep
        );
        if (!subStep) return;

        const components = subStep.components.filter(
          (comp) => comp.version === currentVersion || comp.version === "both"
        );
        const currentComponentIndex = components.findIndex(
          (comp) => comp.id === currentComponent
        );

        if (currentComponentIndex > 0) {
          //Roll back to the previous component in the current substep
          setOpenAccountCurrentProcess({
            currentComponent: components[currentComponentIndex - 1].id,
            currentPhaseName: components[currentComponentIndex - 1].name,
          });
        } else {
          //Roll back to the previous substep if it is the first component of the current substep
          const prevSubStep = step.subSteps.find(
            (subStep) => subStep.id === currentSubStep - 1
          );
          if (prevSubStep) {
            const prevComponents = prevSubStep.components.filter(
              (comp) =>
                comp.version === currentVersion || comp.version === "both"
            );
            setOpenAccountCurrentProcess({
              currentSubStep: prevSubStep.id,
              currentComponent: prevComponents[prevComponents.length - 1].id,
              currentPhaseName: prevComponents[prevComponents.length - 1].name,
            });
          } else {
            //If there are no more previous subSteps, go back to the previous step
            previousStep();
          }
        }
      }
    } else {
      // If the step has no substeps, navigate between the step components
      const components = step.components.filter(
        (comp) => comp.version === currentVersion || comp.version === "both"
      );
      const currentComponentIndex = components.findIndex(
        (comp) => comp.id === currentComponent
      );

      if (currentComponentIndex > 0) {
        // Roll back to the previous component in the current step
        setOpenAccountCurrentProcess({
          currentComponent: components[currentComponentIndex - 1].id,
          currentPhaseName: components[currentComponentIndex - 1].name,
        });
      } else {
        // Go back to the previous step if it is the first component of the current step
        previousStep();
      }
    }
  };

  //Functions to control the section change using the nav elements when clicking on the side nav buttons
  const goToContactFormPhase = () => {
    setOpenAccountCurrentProcess({
      currentStep: 1,
      currentComponent: 1,
      currentPhaseName: "Contact Form",
      currentSideBarSection: "Contacts",
    });
  };

  const goToChooseAccountPhase = () => {
    setOpenAccountCurrentProcess({
      currentStep: 2,
      currentComponent: 1,
      currentPhaseName: "Choose Account type",
    });
  };

  const goToMultiholdersPhase = () => {
    //If user choose was No then when press the nav element multiholders, will be displayed the choose add Holder option cards
    if (addMultiHolderOption.length == 0) {
      setOpenAccountCurrentProcess({
        currentStep: 3,
        currentComponent: 1,
        currentPhaseName: "Choose add Multiholders",
      });
    }
    //If user choose was Yes then when press the nav element multiholders, will be displayed the cards with holder info
    else {
      setOpenAccountCurrentProcess({
        currentStep: 3,
        currentComponent: 2,
        currentPhaseName: "Multiholders Form",
      });
    }
  };

  const goToValidateIdentityPhase = () => {
    if (currentProcess.openAccountCurrentProcess.currentVersion == "desktop") {
      setOpenAccountCurrentProcess({
        currentStep: 4,
        currentSubStep: 1,
        currentComponent: 1,
        currentPhaseName: "Choose Validation ID option",
      });
    } else {
      setOpenAccountCurrentProcess({
        currentStep: 4,
        currentSubStep: 1,
        currentComponent: 1,
        currentPhaseName: "Turn on Camera ID Card",
      });
    }
  };

  const goToConclusionPhase = () => {
    setOpenAccountCurrentProcess({
      currentStep: 5,
      currentComponent: 2,
      currentPhaseName: "Sign Contract",
    });
  };

  const goToIDcardValidation = () => {
    setOpenAccountCurrentProcess({
      currentSubStep: 1,
      currentComponent: 5,
      currentPhaseName: "Show ID information",
    });
  };

  const goToaddressValidation = () => {
    setOpenAccountCurrentProcess({
      currentSubStep: 2,
      currentComponent: 1,
      currentPhaseName: "Choose Validate address Option",
    });
  };

  const goToJobSituationValidation = () => {
    setOpenAccountCurrentProcess({
      currentSubStep: 3,
      currentComponent: 1,
      currentPhaseName: "Choose Validate Job Sitation Option",
    });
  };

  const goToVideoCall = () => {
    setOpenAccountCurrentProcess({
      currentSubStep: 4,
      currentComponent: 1,
      currentPhaseName: "Message",
    });
  };

  useEffect(() => {
    const { currentStep, currentSubStep, currentPhaseName } =
      currentProcess.openAccountCurrentProcess;
    if (
      !userPhasesHistory.currentComponents.includes(currentPhaseName) &&
      hydrated
    ) {
      setUserPhasesHistory({
        currentSteps: [...userPhasesHistory.currentSteps, currentStep],
        currentComponents: [
          ...userPhasesHistory.currentComponents,
          currentPhaseName,
        ],
        currentSubSteps: [...userPhasesHistory.currentSubSteps, currentSubStep],
      });
    }
  }, [
    userPhasesHistory,
    hydrated,
    setUserPhasesHistory,
    currentProcess.openAccountCurrentProcess.currentStep,
    currentProcess.openAccountCurrentProcess.currentComponent,
    currentProcess.openAccountCurrentProcess.currentSubStep,
    currentProcess.openAccountCurrentProcess,
  ]);

  useEffect(() => {
    setOpenAccountCurrentProcess({
      currentVersion: deviceType,
    });
  }, [deviceType, setOpenAccountCurrentProcess]);

  return (
    <>
      <div className="bg-black">
        {!hydrated && (
          <Loader
            bgClass="fullPage-loader-bg"
            principalText="Please wait a little"
            titleClass="loader-title"
          />
        )}
      </div>
      {hydrated &&
        (currentProcess.openAccountCurrentProcess.currentPhaseName !==
          "Turn on Camera ID Card" ||
          (currentProcess.openAccountCurrentProcess.currentPhaseName ==
            "Turn on Camera ID Card" &&
            windowSize.width &&
            windowSize.width < 992)) &&
        currentProcess.openAccountCurrentProcess.currentPhaseName !==
          "ID Card" &&
        (currentProcess.openAccountCurrentProcess.currentPhaseName !==
          "Validation ID Message" ||
          (currentProcess.openAccountCurrentProcess.currentPhaseName ==
            "Validation ID Message" &&
            windowSize.width &&
            windowSize.width < 992)) && (
          <div className="d-flex flex-column flex-lg-row px-3 py-4 px-lg-4 gap-0 gap-lg-4 min-vh-100 bg-black">
            <div className="row pb-3 d-block d-lg-none">
              <div className="col-12 d-flex align-items-center">
                <div className="logo-company-side-nav white h-100 ">
                  <LogoCompanyResponsive />
                </div>
                <div
                  onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                  className="w-100"
                >
                  {currentProcess.openAccountCurrentProcess
                    .currentSideBarSection == "Contacts" && (
                    <>
                      <NavElement
                        icon={
                          openAccountCmsData?.sideBarSteps !== undefined
                            ? openAccountCmsData.sideBarSteps.sideBar[0].icon
                            : navElementsList[0].icon
                        }
                        text={
                          openAccountCmsData?.sideBarSteps
                            ? openAccountCmsData.sideBarSteps.sideBar[0].title
                            : navElementsList[0].title
                        }
                        elementClass="active"
                        processHistory={userPhasesHistory}
                      />
                    </>
                  )}
                  {currentProcess.openAccountCurrentProcess
                    .currentSideBarSection == "Create Account" && (
                    <>
                      {navElements && (
                        <NavElement
                          icon={
                            navElements[
                              currentProcess.openAccountCurrentProcess
                                .currentStep - 2
                            ].icon
                          }
                          text={
                            navElements[
                              currentProcess.openAccountCurrentProcess
                                .currentStep - 2
                            ].title
                          }
                          elementClass="active"
                          processHistory={userPhasesHistory}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="side-nav">
              <SideNavLayout
                openAccountCurrentProcess={
                  currentProcess.openAccountCurrentProcess
                }
                handleSideNav={() => setIsSideNavOpen(!isSideNavOpen)}
                stepsCompleated={stepsCompleated}
                subStepsCompleated={subStepsCompleated}
                sideBarText={openAccountCmsData?.sideBarInitialText}
                navElementsList={navElements}
                displayClass={isSideNavOpen ? "d-block" : "d-none"}
                processHistory={userPhasesHistory}
                goToChooseAccountPhase={goToChooseAccountPhase}
                goToMultiholdersPhase={goToMultiholdersPhase}
                goToValidateIdentityPhase={goToValidateIdentityPhase}
                goToIDcardValidation={goToIDcardValidation}
                goToAddressValidation={goToaddressValidation}
                goToValidateJobSituation={goToJobSituationValidation}
                goToVideoCall={goToVideoCall}
                goToConclusionPhase={goToConclusionPhase}
              />
            </div>

            {currentProcess.openAccountCurrentProcess.currentPhaseName !==
              "Turn on Camera ID Card" &&
              currentProcess.openAccountCurrentProcess.currentPhaseName !==
                "ID Card" &&
              currentProcess.openAccountCurrentProcess.currentPhaseName !==
                "Validation ID Message" && (
                <div className="open-account-container col">
                  <div
                    className={`open-account-content ${
                      isSideNavOpen
                        ? "d-none d-md-block"
                        : "open-account-content"
                    }`}
                  >
                    <div className="d-none d-lg-flex justify-content-between">
                      <a href="/">
                        <div className="btn btn-secondary close-btn">
                          <Close classimg="icon-24" />
                        </div>
                      </a>
                      <div className="header-text-container">
                        <div
                          className={`text-header bgc-primary-50 d-flex align-items-center rounded-start-5 px-4 py-3`}
                        >
                          {headerText}
                        </div>
                      </div>
                    </div>

                    <div className="current-section d-flex justify-content-center">
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Contact Form" && (
                        <PersonalInfoForm
                          nextPhase={handleNextPhase}
                          title={
                            openAccountCmsData?.openAccountPhases?.stepsTitles
                              .contact_form
                              ? openAccountCmsData?.openAccountPhases
                                  .stepsTitles.contact_form
                              : "Insert your Information"
                          }
                          contentForm={
                            openAccountCmsData?.openAccountPhases?.contactForm
                          }
                          onEmailValidationChange={handleEmailValidationChange}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "OTP phone" && (
                        <ContactValidation
                          previousPhase={goToContactFormPhase}
                          clientContentOTP={
                            openAccountCmsData?.openAccountPhases?.phoneOTP
                          }
                          title={
                            openAccountCmsData?.openAccountPhases?.stepsTitles
                              .otp_phone
                          }
                          nextPhase={handleNextPhase}
                          showOtpEmailComponent={showOtpEmailComponent}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "OTP email" && (
                        <EmailValidation
                          previousPhase={goToContactFormPhase}
                          clientContentOTP={
                            openAccountCmsData?.openAccountPhases?.emailOTP
                          }
                          nextPhase={handleNextPhase}
                          title={
                            openAccountCmsData?.openAccountPhases?.stepsTitles
                              .otp_email
                          }
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Choose Account type" && (
                        <AccountsPresentationContainer
                          sectionTitle={
                            openAccountCmsData?.openAccountPhases &&
                            openAccountCmsData?.openAccountPhases?.stepsTitles
                              .accounts_presentation
                              ? openAccountCmsData?.openAccountPhases
                                  .stepsTitles.accounts_presentation
                              : "Choose the account you want"
                          }
                          previousPhase={goToContactFormPhase}
                          nextPhase={handleNextPhase}
                          clientAccountsList={
                            openAccountCmsData?.openAccountPhases
                          }
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Choose DK/VC Option" && (
                        <ChooseOption
                          previousPhase={handlePreviousPhase}
                          nextPhase={handleNextPhase}
                          clientContent={
                            openAccountCmsData?.openAccountPhases?.chooseOption
                          }
                          title={
                            openAccountCmsData?.openAccountPhases &&
                            openAccountCmsData?.openAccountPhases?.stepsTitles
                              .choose_option
                              ? openAccountCmsData?.openAccountPhases
                                  ?.stepsTitles.choose_option
                              : "Choose your Option"
                          }
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Read Terms & Conditions" && (
                        <DocumentPages
                          previousComponent={handlePreviousPhase}
                          nextComponent={handleNextPhase}
                          clientDocumentsList={
                            openAccountCmsData?.openAccountPhases?.documents
                          }
                          title={
                            openAccountCmsData?.openAccountPhases &&
                            openAccountCmsData?.openAccountPhases.stepsTitles
                              .terms_and_conditions_documents
                              ? openAccountCmsData?.openAccountPhases
                                  .stepsTitles.terms_and_conditions_documents
                              : "Read carefully our conditions"
                          }
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Choose add Multiholders" && (
                        <AddMultiHoldersOption
                          previousPhase={handlePreviousPhase}
                          nextPhase={handleNextPhase}
                          nextStep={() => {
                            goToValidateIdentityPhase();
                          }}
                          title={
                            openAccountCmsData?.openAccountPhases &&
                            openAccountCmsData?.openAccountPhases.stepsTitles
                              .choose_add_multiholders
                              ? openAccountCmsData?.openAccountPhases
                                  ?.stepsTitles.choose_add_multiholders
                              : "Want to add more holders to your account?"
                          }
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Multiholders Form" && (
                        <MultiHolders
                          previousPhase={handlePreviousPhase}
                          nextPhase={handleNextPhase}
                          clientContent={
                            openAccountCmsData?.openAccountPhases
                              ?.multiholdersForm
                          }
                          title={
                            openAccountCmsData?.openAccountPhases &&
                            openAccountCmsData?.openAccountPhases.stepsTitles
                              .add_multiholders
                              ? openAccountCmsData?.openAccountPhases
                                  .stepsTitles.add_multiholders
                              : "Add Holders"
                          }
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Invitation Message" &&
                        holderInvitationStatus === "success" && (
                          <InvitationSuccess
                            previousPhase={handlePreviousPhase}
                            nextPhase={handleNextPhase}
                            clientContent={MultiHoldersClientContent}
                          />
                        )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Invitation Message" &&
                        holderInvitationStatus !== "success" && (
                          <InvitationError
                            previousPhase={handlePreviousPhase}
                            nextPhase={handleNextPhase}
                            clientContent={MultiHoldersClientContent}
                          />
                        )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Invitation Message" &&
                        holderInvitationStatus !== "success" && (
                          <InvitationError
                            previousPhase={handlePreviousPhase}
                            nextPhase={handleNextPhase}
                            clientContent={MultiHoldersClientContent}
                          />
                        )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Choose Validation ID option" && (
                        <ValidateIDCardOption
                          previousPhase={handlePreviousPhase}
                          nextPhase={handleNextPhase}
                          nextStep={goToMultiholdersPhase}
                        />
                      )}
                      {/* {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Validation ID Message" && (
                        <Test
                          text="Validation ID Message"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )} */}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Show ID information" && (
                        // <Test
                        //   text="Show ID information"
                        //   previusComponent={handlePreviousPhase}
                        //   onClick={handleNextPhase}
                        // />
                        <ShowIdCardData
                          nextPhase={handleNextPhase}
                          previousPhase={handlePreviousPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName ==
                        "Choose Validate address Option" && (
                        <Test
                          text="Choose Validate address Option"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Turn on Camera address" && (
                        <Test
                          text="Turn on Camera"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Validate address" && (
                        <Test
                          text="Validate address"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Drag and Drop address" && (
                        <Test
                          text="Drag and Drop"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Validate address Message" && (
                        <Test
                          text="Validate address Message"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Show address Information" && (
                        <Test
                          text="Show address Information"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName ==
                        "Choose Validate Job Sitation Option" && (
                        <Test
                          text="Choose Validate Job Sitation Option"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Turn on Camera Job Situation" && (
                        <Test
                          text="Turn on Camera Job Situationn"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Drag and Drop Job Situation" && (
                        <Test
                          text="Drag and Drop Job Situation"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Validate Job Situation" && (
                        <Test
                          text="Validate Job Situation"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Drag and Drop Job situation" && (
                        <Test
                          text="Drag and Drop"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName ==
                        "Validate Job Sitiation Message" && (
                        <Test
                          text="Validate Job Sitiation Message"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName ==
                        "Show Job Situation Information" && (
                        <Test
                          text="Show Job Situation Information"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Message" && (
                        <Test
                          text="Message"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Schedule Interview" && (
                        <Test
                          text="Schedule Interview"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "videoCall" && (
                        <Test
                          text="VideoCall"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}

                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Multiholder Information" && (
                        <Test
                          text=" Multiholder Information"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Sign Contract" && (
                        <Test
                          text="Sign Contract"
                          previusComponent={handlePreviousPhase}
                          onClick={handleNextPhase}
                        />
                      )}
                      {currentProcess.openAccountCurrentProcess
                        .currentPhaseName == "Conclusion Screen" && (
                        <Conclusion />
                      )}
                    </div>
                  </div>
                </div>
              )}

            {currentProcess.openAccountCurrentProcess.currentPhaseName ==
              "Turn on Camera ID Card" && (
              <div className="open-account-container-documents-validations col">
                <div
                  className={`open-account-content ${
                    isSideNavOpen ? "d-none d-md-block" : "open-account-content"
                  }`}
                ></div>
                <ValidateDocumentsBg
                  nextPhase={handleNextPhase}
                  previousPhase={handlePreviousPhase}
                  showTitle={false}
                >
                  <TurnOnCamera nextPhase={handleNextPhase} />
                </ValidateDocumentsBg>
              </div>
            )}

            {currentProcess.openAccountCurrentProcess.currentPhaseName ==
              "Validation ID Message" && (
              <div className="open-account-container-documents-validations col">
                <div
                  className={`open-account-content ${
                    isSideNavOpen ? "d-none d-md-block" : "open-account-content"
                  }`}
                ></div>
                <ValidateDocumentsBg
                  nextPhase={handleNextPhase}
                  previousPhase={handlePreviousPhase}
                  showTitle={false}
                  showProceedBtn={wasValidated ? true : false}
                >
                  <div className="d-flex align-items-center justify-content-center h-100">
                    {wasValidated ? (
                      <h2 className="text-white text-center">
                        We were able to validate your card <br /> You can now
                        proceed to validate the data we´ve taken.
                      </h2>
                    ) : (
                      <h2 className="text-white text-center">
                        We were unable to validate the ID card, please try
                        again.
                      </h2>
                    )}
                  </div>
                </ValidateDocumentsBg>
              </div>
            )}
          </div>
        )}

      {currentProcess.openAccountCurrentProcess.currentPhaseName ===
        "Turn on Camera ID Card" &&
        windowSize.width &&
        windowSize.width > 992 &&
        hydrated && (
          <ValidateDocumentsBg
            nextPhase={handleNextPhase}
            previousPhase={handlePreviousPhase}
            showTitle={false}
            showProceedBtn={false}
          >
            <TurnOnCamera nextPhase={handleNextPhase} />
          </ValidateDocumentsBg>
        )}
      {currentProcess.openAccountCurrentProcess.currentPhaseName ===
        "ID Card" &&
        hydrated && (
          <ValidateDocumentsBg
            nextPhase={handleNextPhase}
            previousPhase={handlePreviousPhase}
            showXbtn={false}
            showBar={true}
            showTitle={true}
            showProceedBtn={true}
          >
            <ScanDocuments nextPhase={handleNextPhase} />
          </ValidateDocumentsBg>
        )}
      {currentProcess.openAccountCurrentProcess.currentPhaseName ===
        "Validation ID Message" &&
        hydrated &&
        windowSize.width &&
        windowSize.width > 992 && (
          <ValidateDocumentsBg
            nextPhase={handleNextPhase}
            previousPhase={handlePreviousPhase}
            showBar={true}
            showTitle={false}
            showProceedBtn={wasValidated ? true : false}
          >
            {wasValidated ? (
              <h2 className="text-white text-center">
                We were able to validate your card <br /> You can now proceed to
                validate the data we´ve taken.
              </h2>
            ) : (
              <h2 className="text-white text-center">
                We were unable to validate the ID card, please try again.
              </h2>
            )}
          </ValidateDocumentsBg>
        )}
    </>
  );
}
