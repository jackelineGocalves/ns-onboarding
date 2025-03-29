import type { ConditionsCard } from "@/types/types";
import ArrowRight from "./icones/ArrowRight";
import Avatar from "./Avatar";

export default function ConditionsCard({
  tag,
  title,
  cardClass,
  onClick,
  icon,
  textClass,
  cursorClass
}: ConditionsCard) {
  return (
    <div className={` condition-card d-grid gap-3 ${cursorClass}`} onClick={onClick}>
      <div className="d-flex">
        <Avatar
          avatarClass={`condition-icon document ${cardClass}`}
          icon={icon}
        />
        <div>
          <span className="caption txt-primary-600 pb-1">{tag}</span>
          <h5 className={` m-0 ${textClass}`}>{title}</h5>
        </div>
      </div>
      <div className="d-grid justify-content-end">
        <ArrowRight classimg={`condition-icon ${cardClass}`} />
      </div>
    </div>
  );
}
