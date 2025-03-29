import ArrowLeft from "../icones/ArrowLeft";
import { CurrentSectionBtnsProps } from "@/types/types";

export default function CurrentSectionBtns({
  ...props
}: CurrentSectionBtnsProps) {
  const {
    previousComponent,
    showGoBackBtn,
    showContinueBtn,
    isDisabled,
    onClick,
    animation,
  } = props;

  return (
    <>
      <div
        className={`current-section-btns d-flex align-items-center 
        ${showContinueBtn && showGoBackBtn ? "justify-content-between" : ""}
        ${showContinueBtn && !showGoBackBtn ? "justify-content-end" : ""}
        ${!showContinueBtn && showGoBackBtn ? "justify-content-start" : ""}
    `}
      >
        {showGoBackBtn && (
          <button
            className={`btn btn-secondary close-btn m-0 ${animation}`}
            onClick={previousComponent}
          >
            <ArrowLeft/>
          </button>
        )}

        {showContinueBtn && (
          <div>
            <button
              onClick={onClick}
              type="submit"
              className="btn btn-primary"
              disabled={isDisabled}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </>
  );
}
