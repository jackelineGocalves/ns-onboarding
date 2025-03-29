import Watch from "../icones/Watch";
import Image from "next/image";

type OpenAccountMethodsProps = {
  duration: string;
  method: string;
  info: string;
  img: string;
  methodClass: string;
};

export default function OpenAccountMethods({
  duration,
  method,
  info,
  img,
  methodClass,
}: OpenAccountMethodsProps) {
  return (
    <div className={methodClass}>
      <div className="row align-items-lg-center m-0">
        <div className="col-lg-4 d-flex justify-content-center align-items-center pt-3">
          <Image
            src={img}
            alt="Homepage Image"
            width={0}
            height={0}
            className="h-100 w-100 object-fit-cover img-fluid method-img"
          />
        </div>

        <div className="col-lg-8 p-3 d-flex flex-column gap-3">
          <div className="method-duration text-end py-2 my-2 row flex-row-reverse align-items-center pe-3">
            <div
              className={`d-flex align-items-center justify-content-center gap-2 col-auto py-1 px-3  px-md-3 py-md-2 mx-md-0 rounded-5 m-0  ${
                methodClass === "card-method active"
                  ? " bg-body txt-primary-900"
                  : "bgc-secondary-50 txt-secondary-900"
              } `}
            >
              {<Watch />} <p className="m-0 text-center">{duration}</p>
            </div>
            <div className="col col-md-12 text-start">
              <h5 className="m-0">{method}</h5>
            </div>
          </div>

          <p className="txt-primary-700 ">{info}</p>
        </div>
      </div>
    </div>
  );
}
