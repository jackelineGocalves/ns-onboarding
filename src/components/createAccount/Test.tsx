import ArrowLeft from "../icones/ArrowLeft";

type TestProps = {
  previusComponent?: () => void;
  onClick?: () => void;
  text?: string;
};

export default function Test({ previusComponent, onClick, text }: TestProps) {
  return (
    <div>
      {text}

      <div className="current-section-btns d-flex justify-content-between">
        <button
          onClick={previusComponent}
          className="btn btn-secondary close-btn m-0"
        >
          <ArrowLeft />
        </button>

        <div>
          <button type="submit" className="btn btn-primary" onClick={onClick}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
