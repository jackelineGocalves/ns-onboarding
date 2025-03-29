import Watch from "./icones/Watch";
import { ChooseCardProps } from "@/types/types";

export default function ChooseCard({
  tag,
  option,
  duration,
  img,
  onClick,
}: ChooseCardProps) {
  return (
    <div className="col">
      <button onClick={onClick} className="choose-card border-0">
        <div>{img}</div>
        <div className="m-auto text-center">
          <div className="option-tag mb-1 mb-md-2">
            {tag && <span className="caption text-black">{tag}</span>}
          </div>
          <h5 className="text-black pb-4 m-0 d-none d-md-block">{option}</h5>
          <h3 className="text-black pb-4 m-0 d-md-none d-block d-md-none">
            {option}
          </h3>
          <div className="duration">
            {duration && (
              <div className="bgc-secondary-50 px-3 py-2 rounded-5 d-flex gap-2 justify-content-center col-auto align-items-center">
                <Watch />
                <div className="caption txt-secondary-800">{duration}</div>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
