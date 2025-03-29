import ConditionsCard from "@/components/ConditionsCard";
import { DocumentPagesProps } from "@/types/types";
import { useState } from "react";
import CurrentSectionBtns from "../CurrentSectionBtns";
import DocumentModal from "./DocumentModal";
import Document from "../../icones/Document";
import HandThumpsUp from "@/components/icones/HandThumbsUp";
import { useConditionsDocuments } from "@/store/userAccountStore";

export interface Documents {
  tag: string;
  title: string;
  pdf: string;
}

export default function DocumentPages({
  previousComponent,
  nextComponent,
  clientDocumentsList,
  title,
}: DocumentPagesProps) {
  const [activeCard, setActiveCard] = useState<number | undefined>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  //Documents that have been read by the user
  const [documentsRead, setDocumentsRead] = useState<boolean[]>(
    new Array(clientDocumentsList?.length).fill(false)
  );

  //import global states
  const conditionsDocumentsReaded = useConditionsDocuments(
    (state) => state.documentsReaded
  );
  const setConditionsDocumentsReaded = useConditionsDocuments(
    (state) => state.setConditionsDocuments
  );

  const handleOpneModal = (i: number) => {
    setOpenModal(true);
    setSelectedCardIndex(i);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleActiveCard = () => {
    setDocumentsRead((prevState) => {
      const newState = [...prevState];
      newState[selectedCardIndex!] = true;
      return newState;
    });
    setOpenModal(false);
    if (activeCard != undefined) {
      if (!documentsRead[selectedCardIndex!] && clientDocumentsList) {
        if (activeCard < clientDocumentsList.length - 1) {
          setActiveCard(activeCard + 1);
        } else {
          setActiveCard(undefined);
        }
      }
    }
    setSelectedCardIndex(null);
  };

  const handleContinue = () => {
    nextComponent();
    setConditionsDocumentsReaded(true);
  };

  //Check if all elements in the documentsRead array are true. If so, the button is enabled to advance to the next component.
  const continueBtnActive =
    documentsRead.every((boolean) => boolean === true) ||
    conditionsDocumentsReaded;

  return (
    <div className="container-xl px-3 px-md-0">
      <div className="row h-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-xl-8 col-xxl-7">
          <div className="d-flex flex-column h-100">
            <h2 className="current-section-title text-center">{title}</h2>
            <div className="d-flex flex-column justify-content-between d-md-block h-100">
              <div className="d-grid gap-4">
                {clientDocumentsList?.map((element, i) => (
                  <div key={i + 1}>
                    <ConditionsCard
                      tag={element.tag}
                      title={element.title}
                      cardClass={`${
                        documentsRead[i] || conditionsDocumentsReaded
                          ? "active"
                          : ""
                      } ${i === activeCard ? "active" : ""}`}
                      onClick={
                        activeCard === i ||
                        documentsRead[i] ||
                        conditionsDocumentsReaded
                          ? () => handleOpneModal(i)
                          : undefined
                      }
                      icon={
                        documentsRead[i] || conditionsDocumentsReaded ? (
                          <HandThumpsUp />
                        ) : (
                          <Document />
                        )
                      }
                      textClass={`${
                        documentsRead[i] || conditionsDocumentsReaded
                          ? "txt-primary-900"
                          : "txt-primary-600"
                      } ${
                        i === activeCard ? "txt-primary-900" : "txt-primary-600"
                      }`}
                      cursorClass={
                        i == activeCard || documentsRead[i]
                          ? "cursor-pointer"
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>
              <CurrentSectionBtns
                showContinueBtn={true}
                onClick={handleContinue}
                showGoBackBtn={true}
                previousComponent={previousComponent}
                isDisabled={!continueBtnActive}
              />
              {openModal &&
                selectedCardIndex !== null &&
                clientDocumentsList && (
                  <DocumentModal
                    show={openModal}
                    onHide={handleCloseModal}
                    onClick={handleActiveCard}
                    fileURL={clientDocumentsList[selectedCardIndex].pdf}
                    documentsReaded={
                      documentsRead[selectedCardIndex] ||
                      conditionsDocumentsReaded
                    }
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
