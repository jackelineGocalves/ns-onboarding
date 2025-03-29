import PaginationBtn from "@/components/PaginationBtn";
import CurrentSectionBtns from "../CurrentSectionBtns";
import AccountsPresentation from "./AccountsPresentation";
import { AccountsPresentationContainerProps } from "@/types/types";
import { useState } from "react";
import AccountPresentationModal from "./AccountPresentationModal";
import Alert from "@/components/Alert";
import { chooseAccountAlertContent } from "./interfaces";
import { useWindowSize } from "@uidotdev/usehooks";
import { useChosenAccount } from "@/store/userAccountStore";

interface Conditions {
  bullet_points: string;
}

export interface ModalInfo {
  title: string;
  topic: Conditions[];
}

export interface AccountsPresentation {
  title: string;
  designation: string;
  description: string;
  modalInfo: ModalInfo[];
  image: string;
}

export interface GeneralModalInfo {
  modal_title: string | undefined;
  modal_description: string | undefined;
  dont_fulfil_btn: string | undefined;
  fulfil_btn: string | undefined;
}

export default function AccountsPresentationContainer({
  previousPhase,
  nextPhase,
  clientAccountsList,
  sectionTitle,
}: AccountsPresentationContainerProps) {
  const windowSize = useWindowSize();

  const [activePage, setActivePage] = useState<number>(1);
  const [activeModalContent, setActiveModalContent] = useState<
    ModalInfo[] | null
  >(null);
  const [showAlert, setShowALert] = useState<boolean>(false);
  const [closingAlert, setClosingAlert] = useState<boolean>(false);

  //Save the account designation to register the selected account in a global state
  const [accountDesingnation, setAccountDesingnation] = useState<string>("");

  //Get global state from useAccountStore to register the account chosen by the user
  const setChosenAccount = useChosenAccount((state) => state.setChosenAccount);

  let itemsPerRow;
  let newArray: any[] = [];
  // Determine number of items per row based on screen size
  if (windowSize.width != null && clientAccountsList) {
    itemsPerRow = windowSize.width < 1200 && windowSize.width > 992 ? 2 : 3;
    // Split array into sub arrays based on items per row
    for (
      var i = 0;
      i < clientAccountsList.accountsPresentation.length;
      i += itemsPerRow
    ) {
      newArray.push(
        clientAccountsList.accountsPresentation.slice(i, i + itemsPerRow)
      );
    }
  }

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  //Handle show modal and save the account designation on local state
  const handleOpenModal = (
    modalContent: ModalInfo[] | undefined,
    accountDesignation: string
  ) => {
    setActiveModalContent(modalContent ?? null);
    setAccountDesingnation(accountDesignation);
  };

  const handleCloseAlert = () => {
    if (!showAlert) {
      setShowALert(true);
    } else {
      setClosingAlert(true);
      setTimeout(() => {
        setShowALert(false);
        setClosingAlert(false);
      }, 300);
    }
  };

  //Save the account selected on global state and go to the next component
  const saveAccountSelected = () => {
    nextPhase();
    setChosenAccount(accountDesingnation);
  };

  return (
    <>
      <div className="container-xl px-0 overflow-hidden">
        <div className="row justify-content-center h-100">
          <div className="col-12 col-sm-12 col-md-11 col-xl-11 col-xxl-10">
            <div className="accounts-presentation-section fade-in-animation d-flex flex-column h-100">
              <h2 className="text-center current-section-title">
                {sectionTitle}
              </h2>

              {showAlert && (
                <div className="pb-4 mb-2 d-flex justify-content-center">
                  <Alert
                    chooseAccountAlertContent={chooseAccountAlertContent}
                    onClick={handleCloseAlert}
                    isAlertOpen={closingAlert}
                  />
                </div>
              )}

              <div className="d-flex flex-column justify-content-between d-md-block h-100">
                <div className="accounts-presentation-container d-none d-md-flex flex-nowrap justify-content-center">
                  <div
                    className={`row row-cols-${itemsPerRow} g-md-4 justify-content-center`}
                  >
                    {newArray &&
                      newArray[activePage - 1] &&
                      newArray[activePage - 1].map(
                        (element: AccountsPresentation, i: number) => (
                          <AccountsPresentation
                            key={"acc-" + (i + 1)}
                            img={element.image}
                            tag={element.designation}
                            title={element.title}
                            info={element.description}
                            detailsBtn={
                              clientAccountsList &&
                              clientAccountsList.stepsTitles.accountsExtraInfo
                                .details_btn_text
                                ? clientAccountsList.stepsTitles
                                    .accountsExtraInfo.details_btn_text
                                : "See Details"
                            }
                            modalBtn={
                              clientAccountsList &&
                              clientAccountsList.stepsTitles.accountsExtraInfo
                                .principal_btn_text
                                ? clientAccountsList.stepsTitles
                                    .accountsExtraInfo.principal_btn_text
                                : "Open Account"
                            }
                            onClick={() =>
                              handleOpenModal(
                                element.modalInfo,
                                element.designation
                              )
                            }
                          />
                        )
                      )}
                  </div>
                </div>

                <div className="accounts-presentation-container d-flex d-md-none flex-nowrap gap-4">
                  {clientAccountsList &&
                    clientAccountsList.accountsPresentation.map(
                      (element: AccountsPresentation, i: number) => (
                        <AccountsPresentation
                          key={"acc-mob" + (i + 1)}
                          img={element.image}
                          tag={element.designation}
                          title={element.title}
                          info={element.description}
                          detailsBtn={
                            clientAccountsList &&
                            clientAccountsList.stepsTitles.accountsExtraInfo
                              .details_btn_text
                              ? clientAccountsList.stepsTitles.accountsExtraInfo
                                  .details_btn_text
                              : "See Details"
                          }
                          modalBtn={
                            clientAccountsList &&
                            clientAccountsList.stepsTitles.accountsExtraInfo
                              .principal_btn_text
                              ? clientAccountsList.stepsTitles.accountsExtraInfo
                                  .principal_btn_text
                              : "Open Account"
                          }
                          onClick={() =>
                            handleOpenModal(
                              element.modalInfo,
                              element.designation
                            )
                          }
                        />
                      )
                    )}
                </div>

                {clientAccountsList &&
                  clientAccountsList.accountsPresentation.length > 3 && (
                    <div className="accounts-pagination justify-content-center d-none d-md-flex">
                      {newArray.map((_, i) => (
                        <PaginationBtn
                          key={"page" + i + 1}
                          page={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          paginationClass={i === activePage - 1 ? "active" : ""}
                        />
                      ))}
                    </div>
                  )}

                <div className="container-xl px-3 px-md-0">
                  <CurrentSectionBtns
                    showGoBackBtn={true}
                    previousComponent={previousPhase}
                    animation="move-left-animation"
                  />
                </div>
              </div>
            </div>
          </div>

          <AccountPresentationModal
            show={!!activeModalContent}
            onHide={() => setActiveModalContent(null)}
            requeriments={activeModalContent}
            nextComponent={saveAccountSelected}
            onClick={handleCloseAlert}
            generalInfo={clientAccountsList?.stepsTitles.accountsExtraInfo}
          />
        </div>
      </div>
    </>
  );
}
