import Avatar from "./Avatar";
import Holder from "./icones/Holder";
import Mail from "./icones/Mail";
import Phone from "./icones/Phone";
import Trash from "./icones/Trash";
import { MultiHolderInfo } from "@/store/userAccountStore";

export default function MultiHolderInfoCard({
  holderData,
  onDelete,
  holderIndex,
}: {
  holderData: MultiHolderInfo;
  onDelete?: () => void;
  holderIndex: number;
}) {
  return (
    <>
      <div className="multi-holder-card">
        <div className="d-flex">
          <div className="avatar active">
            <Avatar icon={<Holder />} />
          </div>

          <div className="w-100">
            <div className="d-flex justify-content-between w-100">
              <div>
                <span className="caption">
                  {holderIndex}
                  {holderIndex == 2 ? "nd" : ""}
                  {holderIndex == 3 ? "rd" : ""}
                  {holderIndex > 3 ? "th" : ""} holder
                </span>
                <h5 className="m-0 pb-2 d-none d-md-block">
                  {holderData.holderName}
                </h5>
                <h4 className="m-0 pb-2 d-block d-md-none">
                  {holderData.holderName}
                </h4>
              </div>
              <div onClick={onDelete}>
                <Trash classimg="trash-icon" />
              </div>
            </div>

            <div>
              <div className="holder-contacts d-flex flex-column gap-2 w-100">
                <div className="d-flex align-items-center gap-2 pt-2">
                  <div>
                    <Phone className="contacts-icons" />
                  </div>
                  <span>
                    +{holderData.countryData.dialCode}{" "}
                    {holderData.holderPhoneNumber}{" "}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div>
                    <Mail className="contacts-icons" />
                  </div>
                  <span>{holderData.holderEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
