import Avatar from "./Avatar";
import Holder from "./icones/Holder";

export default function HolderCard({
  holderName,
  holderIndex,
}: {
  holderName: string;
  holderIndex: number;
}) {
  return (
    <div className="bgc-secondary-50 p-3 d-flex" style={{ borderRadius: 20 }}>
      <Avatar avatarClass="holder-active" icon={<Holder />} />
      <div>
        <span className="caption txt-primary-600">
          {holderIndex}
          {holderIndex == 2 ? "nd" : ""}
          {holderIndex == 3 ? "rd" : ""}
          {holderIndex > 3 ? "th" : ""} holder
        </span>
        <h4 className="m-0">
          {holderName != "" ? holderName : "Holder´s name"}{" "}
        </h4>
      </div>
    </div>
  );
}
