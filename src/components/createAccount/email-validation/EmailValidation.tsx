import Input from "@/components/Input";
import { OTPProps } from "@/types/types";
import CurrentSectionBtns from "../CurrentSectionBtns";
import { useContactForm, useOTPValidations } from "@/store/userAccountStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import OTPImgEmail from "@/components/illustrations/OTPemail";

export default function EmailValidation({ ...props }: OTPProps) {
  const { nextPhase, previousPhase, clientContentOTP, title } = props;

  const email = useContactForm((state) => state.email);
  const setWasEmailValidated = useOTPValidations(
    (state) => state.setWasEmailvalidated
  );
  const [countdown, setCountdown] = useState(30);
  const [OTPvalue, setOTPValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [OTPCode, setOTPCode] = useState("123456");

  const indexOfDot = email.indexOf(".");
  const formatedEmail = `${email.charAt(0)}${"*".repeat(
    indexOfDot - 1
  )}${email.slice(indexOfDot)}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOTPValue(value);
  };

  //Verify if the input value is equal to the otp code value
  useEffect(() => {
    if (OTPvalue.length === 6 && OTPvalue === OTPCode && nextPhase) {
      const timeout = setTimeout(nextPhase, 2000);
      setWasEmailValidated(true);
      return () => clearTimeout(timeout);
    } else {
      setWasEmailValidated(false);
    }
  }, [OTPvalue, OTPCode, nextPhase, setWasEmailValidated]);

  const handleSendAnotherClick = () => {
    setIsButtonDisabled(true);
    setOTPCode("654321");
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isButtonDisabled]);

  //Make the send another link active after 30 seconds
  useEffect(() => {
    if (countdown === 0) {
      setIsButtonDisabled(false);
      setCountdown(30);
    }
  }, [countdown]);

  return (
    <>
      <div className="container-xl px-3 px-md-0">
        <div className="row h-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-xl-8 col-xxl-7">
            <div className="d-flex flex-column justify-content-between d-md-block h-100">
              <div>
                <div className="pb-3 d-flex justify-content-center position-relative ">
                  {clientContentOTP && clientContentOTP.image ? (
                    <Image
                      src={clientContentOTP.image}
                      alt="Otp email Image"
                      width={0}
                      height={0}
                      className="OTP-img"
                    />
                  ) : (
                    <OTPImgEmail classimg="OTP-img" />
                  )}
                </div>
                <div className="text-center">
                  <h2 className="pb-3 m-0">
                    {title ? title : "Email Validation"}
                  </h2>
                  <span>
                    {clientContentOTP && clientContentOTP.description
                      ? clientContentOTP?.description
                      : "On this space insert the OTP we sent to this email’s associated email "}{" "}
                    <span className="txt-secondary-500">{formatedEmail}</span>
                  </span>
                </div>
                <div className="OTP-input">
                  <Input
                    inputId="OTPnumber"
                    type="text"
                    name="OTP-input"
                    placeholder={
                      clientContentOTP && clientContentOTP?.placeholder
                        ? clientContentOTP.placeholder
                        : "Fill this space with the OTP"
                    }
                    label={
                      clientContentOTP && clientContentOTP?.label
                        ? clientContentOTP.label
                        : "OTP"
                    }
                    handleInputChange={handleInputChange}
                    statusClass={`${
                      OTPvalue != OTPCode && OTPvalue.length >= 6 ? "error" : ""
                    } ${OTPvalue === OTPCode ? "success" : ""}`}
                    inputValue={OTPvalue}
                    isRequired={true}
                  />
                </div>
                <div
                  className={
                    OTPvalue === OTPCode
                      ? "hide-send-OTP caption text-start text-md-center pt-4"
                      : "pt-4 text-md-center caption"
                  }
                >
                  <span>
                    Haven’t received the OTP.
                    {isButtonDisabled && `In ${countdown} seconds`}
                  </span>
                  <button
                    className="link ps-1"
                    onClick={handleSendAnotherClick}
                    disabled={isButtonDisabled}
                  >
                    Send Another
                  </button>
                </div>
              </div>

              <CurrentSectionBtns
                showGoBackBtn={true}
                previousComponent={previousPhase}
                animation={
                  OTPvalue === OTPCode
                    ? "animated-button up"
                    : "animated-button down"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
