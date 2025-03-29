import HolderInvitationSuccess from "@/components/illustrations/HolderInvitationSuccess";
import CurrentSectionBtns from "../CurrentSectionBtns";
import { HandleCurrentComponentProps } from "@/types/types";

export default function InvitationSuccess({
  previousPhase,
  nextPhase,
  clientContent,
}: HandleCurrentComponentProps) {

  return (
    <div className="container-xl px-3 px-md-0">
      <div className="row h-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-xl-8 col-xxl-7">
          <div className="d-flex flex-column justify-content-between d-md-block h-100">
            <div>
              <div className="d-flex justify-content-center">
                <HolderInvitationSuccess classimg="status-img" />
              </div>

              <div className="d-grid gap-4">
                <h2 className="pt-3 mt-0 pt-md-4 mt-md-2 mb-0 text-center">
                  {clientContent.successTitle}
                </h2>
                <span className="status-msg text-md-center">
                  {clientContent.successMsg}
                </span>
              </div>
            </div>

            <CurrentSectionBtns
              showGoBackBtn={true}
              showContinueBtn={true}
              previousComponent={previousPhase}
              onClick={nextPhase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
