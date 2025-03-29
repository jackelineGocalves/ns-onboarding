import ChooseCard from "@/components/ChooseCard";
import { ChooseOptionProps } from "@/types/types";
import CurrentSectionBtns from "../CurrentSectionBtns";
import NoAddMultiHolders from "@/components/illustrations/NoAddMultiHolders";
import AddMultiHolders from "@/components/illustrations/AddMultiHolders";
import { useMultiHoldersForm } from "@/store/userAccountStore";
import { useOpenAccountCurrentProcess } from "@/store/useShowCurrentComponent";

export default function AddMultiHoldersOption({
  previousPhase,
  nextPhase,
  nextStep,
  title,
}: ChooseOptionProps) {
  const deleteHolderInfo = useMultiHoldersForm((state) => state.resetForms);
  const stepsCompleated = useOpenAccountCurrentProcess(
    (state) => state.stepsCompleated
  );
  const currentStep = useOpenAccountCurrentProcess(
    (state) => state.openAccountCurrentProcess.currentStep
  );

  const handleNoMultiHolders = () => {
    if (nextStep !== undefined) {
      nextStep();
      //If the user fills out the forms and then clicks on no multiholders, the stored information of the holders is deleted
      deleteHolderInfo();
      stepsCompleated.push(currentStep);
    }
  };

  return (
    <>
      <div className="container-xl px-3 px-md-0">
        <div className="row h-100 justify-content-center">
          <div className="col-12 col-sm-12 col-md-11 col-xl-10 col-xxl-10">
            <div className="d-flex flex-column justify-content-between d-md-block h-100">
              <div>
                <>
                  <h2 className="current-section-title text-center">{title}</h2>
                  <div className="row row-cols-1 row-cols-md-2 gap-4 gap-md-0 d-flex justify-content-center">
                    <ChooseCard
                      option="No"
                      img={<NoAddMultiHolders classimg="choose-card-img" />}
                      onClick={handleNoMultiHolders}
                    ></ChooseCard>
                    <ChooseCard
                      option="Yes"
                      img={<AddMultiHolders classimg="choose-card-img" />}
                      onClick={nextPhase}
                    ></ChooseCard>
                  </div>
                </>
              </div>
              <div className="d-none d-md-block">
                <CurrentSectionBtns
                  showGoBackBtn={true}
                  previousComponent={previousPhase}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
