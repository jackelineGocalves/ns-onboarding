import { HandleCurrentComponentProps } from "@/types/types";
import CurrentSectionBtns from "../CurrentSectionBtns";

export default function ShowIdCardData({
  nextPhase,
  previousPhase,
}: HandleCurrentComponentProps) {
  return (
    <>
      <div className="container-xl px-3 px-md-0">
        <div className="row h-100 justify-content-center">
          <div className="col-12 col-sm-12 col-md-11 col-xl-10 col-xxl-10">
            <div className="d-flex flex-column justify-content-between d-md-block h-100">
              <div>
                <h2 className="current-section-title text-center">
                  Confirm the information taken from your card
                </h2>
                <div className="row row-cols-1 row-cols-md-2 gap-4 gap-md-0 d-flex justify-content-center">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <div className="bgc-primary-50 rounded-4 w-100">
                      <span>ID Card</span>
                    </div> */}
                  </div>
                  <div>
                    {/* <h3>test</h3> */}
                  </div>
                </div>
              </div>
              <CurrentSectionBtns
                showContinueBtn={true}
                onClick={nextPhase}
                showGoBackBtn={true}
                previousComponent={previousPhase}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
