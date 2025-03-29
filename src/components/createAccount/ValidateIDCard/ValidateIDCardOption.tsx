import ChooseCard from "@/components/ChooseCard";
import CurrentSectionBtns from "../CurrentSectionBtns";
import WorkingRemotely from "@/components/illustrations/WorkingRemotely";
import ValidateOnPhone from "@/components/illustrations/ValidateOnPhone";
import { ChooseOptionProps } from "@/types/types";
import { useMultiHoldersForm } from "@/store/userAccountStore";
import { useState } from "react";
import QRcodeModal from "./QRcodeModal";

export default function ValidateIDCardOption({
  previousPhase,
  nextPhase,
  nextStep,
}: ChooseOptionProps) {
  const addMultiHolderOption = useMultiHoldersForm((state) => state.forms);
  const [showModal, setShowModal] = useState<boolean>(false);

  //If the user chose not to add multiholders and goes back from this component thenn is displayed the component to choose whether or not to add multiholders
  const handlePreviousStep = () => {
    if (addMultiHolderOption.length !== 0) {
      previousPhase();
    } else {
      nextStep && nextStep();
    }
  };

  return (
    <div className="container-xl px-3 px-md-0">
      <div className="row h-100 justify-content-center">
        <div className="col-12 col-sm-12 col-md-11 col-xl-10 col-xxl-10">
          <div className="d-flex flex-column justify-content-between d-md-block h-100">
            <div>
              <h2 className="current-section-title text-center">
                Verify your ID card
              </h2>
              <div className="row row-cols-1 row-cols-md-2 gap-4 gap-md-0 d-flex justify-content-center">
                <ChooseCard
                  option="On your phone"
                  tag="Photograph"
                  img={<ValidateOnPhone classimg="choose-card-img" />}
                  onClick={() => setShowModal(true)}
                ></ChooseCard>
                <ChooseCard
                  option="On your computer"
                  tag="Photograph"
                  img={<WorkingRemotely classimg="choose-card-img" />}
                  onClick={nextPhase}
                ></ChooseCard>
              </div>
            </div>
            <div className="d-none d-md-block">
              <CurrentSectionBtns
                showGoBackBtn={true}
                previousComponent={handlePreviousStep}
              />
            </div>
          </div>
        </div>
        <QRcodeModal show={showModal} onHide={() => setShowModal(false)} />
      </div>
    </div>
  );
}
