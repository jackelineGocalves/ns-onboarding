import Input from "@/components/Input";
import { OTPProps } from "@/types/types";
import CurrentSectionBtns from "../CurrentSectionBtns";
import { useContactForm, useOTPValidations } from "@/store/userAccountStore";
import { useCallback, useEffect, useState } from "react";
import { useOpenAccountCurrentProcess } from "@/store/useShowCurrentComponent";
import Image from "next/image";
import OTPImgNumber from "@/components/illustrations/OTPnumber";

export interface OTPdata {
  description: string | undefined;
  label: string | undefined;
  placeholder: string | undefined;
  image: string | undefined;
}

export default function ContactValidation({ ...props }: OTPProps) {
  const {
    nextPhase,
    previousPhase,
    clientContentOTP,
    showOtpEmailComponent,
    title,
  } = props;

  //Get Global States
  const countryCode = useContactForm((state) => state.countryData.dialCode);
  const phoneNumber = useContactForm((state) => state.phoneNumber);
  const setWasPhoneValidatedStore = useOTPValidations(
    (state) => state.setWasPhoneValidated
  );

  //Local States
  const [OTPvalue, setOTPValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [OTPCode, setOTPCode] = useState("123456");

  const formatedNumber = ` ${"*".repeat(
    phoneNumber.length - 3
  )} ${phoneNumber.slice(-3)}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOTPValue(value);
  };

  const setOpenAccountCurrentProcess = useOpenAccountCurrentProcess(state => state.setOpenAccountCurrentProcess)

  const handleNextComponent = useCallback(() => {
    if (showOtpEmailComponent == undefined || showOtpEmailComponent) {
      //If the email was modified and needs confirmation, go to the next component
      nextPhase();
    } else {
      //If the phone number was modified but the email was not, the phone OTP component is displayed and then, the choose account component is shown
      setOpenAccountCurrentProcess({
        currentStep: 2,
        currentComponent: 1,
        currentSideBarSection: "Create Account",
        currentPhaseName: "Choose Account type",
      });
    }
  }, [showOtpEmailComponent, nextPhase, setOpenAccountCurrentProcess]);

  //Verify if the input value is equal to the otp code value
  useEffect(() => {
    if (OTPvalue.length === 6 && OTPvalue === OTPCode && handleNextComponent) {
      const timeout = setTimeout(handleNextComponent, 2000);
      //Save in global state if phone was validated
      setWasPhoneValidatedStore(true);
      return () => clearTimeout(timeout);
    } else {
      setWasPhoneValidatedStore(false);
    }
  }, [OTPvalue, OTPCode, handleNextComponent, setWasPhoneValidatedStore]);

  const handleSendAnotherClick = () => {
    setIsButtonDisabled(true);
    setOTPCode("654321");
  };

  const [countdown, setCountdown] = useState(30);

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
                <div className="pb-3 d-flex justify-content-center">
                  {clientContentOTP && clientContentOTP.image ? (
                    <Image
                      src={clientContentOTP.image}
                      alt="Otp phone Image"
                      width={0}
                      height={0}
                      className="OTP-img"
                    />
                  ) : (
                    <OTPImgNumber classimg="OTP-img" />
                  )}
                </div>
                <div className="text-center">
                  <h2 className="pb-3 m-0">
                    {title ? title : "Phone Validation"}
                  </h2>
                  <span>
                    {clientContentOTP && clientContentOTP.description
                      ? clientContentOTP.description
                      : "On this space insert the OTP we sent to this email’s associated phone-number"}{" "}
                    <span className="txt-secondary-500">
                      +{countryCode} {formatedNumber}
                    </span>
                  </span>
                </div>
                <div className="OTP-input">
                  <Input
                    inputId="OTPnumber"
                    type="text"
                    name="OTP-input"
                    placeholder={
                      clientContentOTP && clientContentOTP.placeholder
                        ? clientContentOTP.placeholder
                        : "Fill this space with the OTP"
                    }
                    label={
                      clientContentOTP && clientContentOTP.label
                        ? clientContentOTP.label
                        : "OTD"
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
                  OTPvalue === OTPCode ? "animated-button up animation" : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
