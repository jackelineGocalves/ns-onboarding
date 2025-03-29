import ArrowRight from "../icones/ArrowRight";
import Close from "../icones/Close";
import ArrowLeft from "../icones/ArrowLeft";

export default function ValidateDocumentsBg({
  nextPhase,
  children,
  previousPhase,
  showProceedBtn,
  showXbtn,
  showBar,
  showTitle,
}: {
  nextPhase: () => void;
  children?: React.ReactNode;
  previousPhase: () => void;
  showProceedBtn?: boolean;
  showXbtn?: boolean;
  showBar?: boolean;
  showTitle?: boolean;
}) {
  return (
    <>
      <div
        className={`bg-black min-vh-100 d-flex flex-column justify-content-center ${
          !showBar ? "d-none d-lg-flex" : "d-flex"
        }`}
      >
        <div className="validation-bg-container">
          {showTitle && (
            <h2 className="text-white text-md-center my-2 pb-4 px-2 px-md-0 my-md-0 mb-md-4 pb-md-3">
              Place the front of your card
            </h2>
          )}
          {showXbtn ||
            (showXbtn === undefined && (
              <div className="close-validation cursor-pointer">
                <Close onClick={previousPhase} />
              </div>
            ))}

          <div className="validation-instructions-container p-3 p-md-4">
            {children}
          </div>

          <div className="pt-5 mt-2  justify-content-between d-none d-lg-flex">
            <ArrowLeft
              className="close-validation m-0 cursor-pointer"
              onClick={previousPhase}
            />
            {showProceedBtn 
              && (
                <div
                  className="d-flex align-items-center cursor-pointer"
                  onClick={nextPhase}
                >
                  <span className="d-flex gap-2 text-white btn border-0">
                    Proceed <ArrowRight className="close-validation m-0" />
                  </span>
                </div>
              )}
          {!showProceedBtn   && <div className="proceed-btn-size"></div>}
          </div>
        </div>
      </div>

      {showBar ||
        (showBar == undefined && (
          <div className="d-block d-lg-none">
            <div className="validation-screen-height">{children}</div>
          </div>
        ))}
    </>
  );
}
