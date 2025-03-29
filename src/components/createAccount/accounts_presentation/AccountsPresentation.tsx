import Btn from "@/components/Btn";
import { AccountsPresentationProps } from "@/types/types";
import Image from "next/image";

export default function AccountsPresentation({
  ...props
}: AccountsPresentationProps) {
  const { title, img, tag, info, detailsBtn, modalBtn, onClick } = props;

  return (
    <>
      <div className="col">
        <div className="account-presentation-card p-0">
          <div className="">
            <Image
              src={img}
              alt="Account Presentation Image"
              width={0}
              height={0}
              className="account-presentation-img"
            />
          </div>
          <div className="py-3 my-1 mx-0 py-lg-4 px-3 mx-md-1 my-md-0">
            <div>
              <span className="caption pb-2">{tag}</span>
              <h4 className="pb-1 pt-1">{title}</h4>
              <span>{info}</span>
            </div>

            <div>
              <Btn btnClass="btn btn-basic mb-4 mt-3 d-none d-md-block">
                {detailsBtn}
              </Btn>

              <Btn
                btnClass="btn btn-primary w-100 mt-4 m-md-0"
                onClick={onClick}
              >
                {modalBtn}
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
