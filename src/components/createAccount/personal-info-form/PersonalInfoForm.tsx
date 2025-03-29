import { useEffect, useState } from "react";
import Input from "../../Input";
import { useContactForm, useOTPValidations } from "@/store/userAccountStore";
import CheckBox from "../../CheckBox";
import "intl-tel-input/build/css/intlTelInput.css";
import { FormErrors } from "@/errors/enumErrors";
import { PersonalInfoFormProps } from "@/types/types";
import { validateEmail, validateFullName } from "@/helpers/validations";
import CurrentSectionBtns from "../CurrentSectionBtns";
import IntlTelInput from "@/components/IntlTelInput";
import { useOpenAccountCurrentProcess } from "@/store/useShowCurrentComponent";
import HTMLReactParser from "html-react-parser/lib/index";

export interface ContactFormData {
  name_label: string | undefined;
  name_placeholder: string | undefined;
  email_label: string | undefined;
  email_placeholder: string | undefined;
  phone_label: string | undefined;
  phone_placeholder: string | undefined;
  privacy_policy_text: string | undefined;
}

export default function PersonalInfoForm({ ...props }: PersonalInfoFormProps) {
  const { nextPhase, title, contentForm, onEmailValidationChange } = props;

  //Global States
  const setOpenAccountCurrentProcess = useOpenAccountCurrentProcess(
    (state) => state.setOpenAccountCurrentProcess
  );
  const contactData = useContactForm();
  const wasPhoneValiatedStore = useOTPValidations(
    (state) => state.wasPhoneValidated
  );
  const wasEmailValidatedStore = useOTPValidations(
    (state) => state.wasEmailValidated
  );

  //Local States
  const [inputsValues, setInputValues] = useState({
    name: contactData.name,
    email: contactData.email,
    phoneNumber: contactData.phoneNumber,
    checkBox: contactData.checkBox,
    errors: {
      name: "",
      email: "",
    },
  });

  const [countryData, setCountryData] = useState({
    name: contactData.countryData.name,
    iso2: contactData.countryData.iso2,
    dialCode: contactData.countryData.dialCode,
  });

  const [showOtpPhoneComponent, setShowOtpPhoneComponent] = useState<
    boolean | undefined
  >(undefined);
  const [showOtpEmailcomponent, setShowOtpEmailComponent] = useState<
    boolean | undefined
  >(undefined);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");

  //Once the inputs has been validated with onBlur, states become true and aply validation in onChange
  const [wasNameValidated, setWasNameValidated] = useState(false);
  const [wasEmailValidated, setWasEmailValidated] = useState(false);
  const [wasPhoneValidated, setWasPhoneValidated] = useState(false);

  let newErrors = { ...inputsValues.errors };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //Don't validate if the value only contains whitespace.
    if (value.trim() === "") {
      setInputValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }

    //Perform validation only if the field has been previously validated by onBlur
    if (wasNameValidated && name === "name") {
      newErrors.name = !validateFullName(value) ? FormErrors.NAME : "";
    }

    if (wasEmailValidated && name === "email") {
      newErrors.email = !validateEmail(value) ? FormErrors.EMAIL : "";
    }

    setInputValues((prevState) => ({
      ...prevState,
      errors: newErrors,
      [name]: value,
    }));
  };

  const setCheckBox = (e: any) => {
    const value = e.target.checked;
    setInputValues((prevState) => ({
      ...prevState,
      checkBox: value,
    }));
  };

  const handleBlur = () => {
    if (!wasNameValidated) {
      if (inputsValues.name.trim() !== "") {
        newErrors.name = !validateFullName(inputsValues.name)
          ? FormErrors.NAME
          : "";
        setWasNameValidated(true);
      }
    }

    if (!wasEmailValidated) {
      if (inputsValues.email.trim() !== "") {
        newErrors.email = !validateEmail(inputsValues.email)
          ? FormErrors.EMAIL
          : "";
        setWasEmailValidated(true);
      }
    }

    if (!wasPhoneValidated) {
      if (inputsValues.phoneNumber.trim() !== "") {
        setWasPhoneValidated(true);
      }
    }

    setInputValues((prevState) => ({
      ...prevState,
      errors: newErrors,
    }));
  };

  // Function to handle changes in the error message of the IntlTelInput component
  const handleErrorMessageChange = (errorMsg: string) => {
    setPhoneErrorMsg(errorMsg);
  };

  //Inputs vlidation
  const isFormEmpty = () => {
    for (const field of Object.values(inputsValues)) {
      if (
        (typeof field === "string" && field.trim() === "") ||
        !inputsValues.checkBox
      ) {
        return true;
      }
    }
    return false;
  };

  //Update statuses to verify if the email or phone needs validation, and thus, show the corresponding next component
  useEffect(() => {
    const emailNeedsValidation = !(
      inputsValues.email === contactData.email &&
      wasEmailValidatedStore &&
      contactData.email !== ""
    );

    const phoneNeedsValidation = !(
      inputsValues.phoneNumber === contactData.phoneNumber &&
      wasPhoneValiatedStore &&
      contactData.phoneNumber !== ""
    );

    // Check if it is necessary to show the OTP email component
    if (showOtpEmailcomponent !== emailNeedsValidation) {
      setShowOtpEmailComponent(emailNeedsValidation);
      onEmailValidationChange(emailNeedsValidation);
    }

    // Check if it is necessary to show the OTP phone number component
    if (showOtpPhoneComponent !== phoneNeedsValidation) {
      setShowOtpPhoneComponent(phoneNeedsValidation);
    }
  }, [
    inputsValues.email,
    inputsValues.phoneNumber,
    contactData.email,
    contactData.phoneNumber,
    wasEmailValidatedStore,
    wasPhoneValiatedStore,
    showOtpEmailcomponent,
    showOtpPhoneComponent,
    onEmailValidationChange,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      inputsValues.errors.email === "" &&
      inputsValues.errors.name === "" &&
      phoneErrorMsg === "" &&
      inputsValues.checkBox
    ) {
      if (showOtpPhoneComponent || showOtpPhoneComponent == undefined) {
        //If the email was not validated, the OTP phone component is displayed
        nextPhase();
      } else if (showOtpEmailcomponent || showOtpEmailcomponent == undefined) {
        //If the email was not validated, the OTP email component is displayed
        setOpenAccountCurrentProcess({
          currentStep: 1,
          currentComponent: 3,
          currentPhaseName: "OTP email",
        });
      } else if (
        showOtpPhoneComponent == false &&
        showOtpEmailcomponent == false
      ) {
        //If the email and phone were validated, the choose account component is displayed
        setOpenAccountCurrentProcess({
          currentStep: 2,
          currentComponent: 1,
          currentSideBarSection: "Create Account",
          currentPhaseName: "Choose Account type",
        });
      }
      //Introducing the input values into the global state  as an object within an array
      contactData.setName(inputsValues.name);
      contactData.setEmail(inputsValues.email);
      contactData.setPhoneNumber(inputsValues.phoneNumber);
      contactData.setCountryData(countryData);
      contactData.setCheckBox(inputsValues.checkBox);
    }
  };

  return (
    <div className="container-xl px-3 px-md-0">
      <div className="row h-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-xl-8 col-xxl-7">
          <div className="d-flex flex-column h-100">
            <h2 className="current-section-title text-center">{title}</h2>

            <form
              action=""
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-between d-md-block h-100"
            >
              <div className="d-flex flex-column gap-4">
                <Input
                  label={
                    contentForm && contentForm.name_label
                      ? contentForm.name_label
                      : "Full name"
                  }
                  placeholder={
                    contentForm && contentForm.name_placeholder
                      ? contentForm.name_placeholder
                      : "Fill this space with your full name"
                  }
                  name="name"
                  type="text"
                  inputId="name"
                  isRequired={true}
                  inputValue={inputsValues.name}
                  handleInputChange={handleInputChange}
                  onBlur={handleBlur}
                  errorMessage={
                    inputsValues.name !== "" ? inputsValues.errors.name : ""
                  }
                  statusClass={`
                        ${
                          inputsValues.errors.name !== "" &&
                          inputsValues.name !== ""
                            ? "error-focus"
                            : undefined
                        }
                     
                        ${
                          inputsValues.name.trim() !== "" ? "filled" : undefined
                        }
                          ${
                            wasNameValidated &&
                            inputsValues.name.trim() !== "" &&
                            inputsValues.errors.name == ""
                              ? "success-focus"
                              : undefined
                          }

                     `}
                />
                <Input
                  label={
                    contentForm && contentForm.email_label
                      ? contentForm.email_label
                      : "Email"
                  }
                  placeholder={
                    contentForm && contentForm.email_placeholder
                      ? contentForm.email_placeholder
                      : "Fill this space with your email"
                  }
                  name="email"
                  type="text"
                  inputId="email"
                  isRequired={true}
                  inputValue={inputsValues.email}
                  handleInputChange={handleInputChange}
                  onBlur={handleBlur}
                  errorMessage={
                    inputsValues.email !== "" ? inputsValues.errors.email : ""
                  }
                  statusClass={`
                        ${
                          inputsValues.errors.email !== "" &&
                          inputsValues.email !== ""
                            ? "error-focus"
                            : undefined
                        }
                     
                        ${
                          inputsValues.email.trim() !== ""
                            ? "filled"
                            : undefined
                        }
                          ${
                            wasEmailValidated &&
                            inputsValues.email.trim() !== "" &&
                            inputsValues.errors.email == ""
                              ? "success-focus"
                              : undefined
                          }

                     `}
                />
                <IntlTelInput
                  name="phoneNumber"
                  inputId="phoneNumber"
                  label={
                    contentForm && contentForm.phone_label
                      ? contentForm.phone_label
                      : "Phone-number"
                  }
                  placeholder={
                    contentForm && contentForm.phone_placeholder
                      ? contentForm.phone_placeholder
                      : "Fill this space with your number"
                  }
                  inputValue={inputsValues.phoneNumber}
                  handleInputChange={handleInputChange}
                  onBlur={handleBlur}
                  setCountryData={setCountryData}
                  isRequired={true}
                  countryData={countryData}
                  wasPhoneValidated={wasPhoneValidated}
                  handleErrorChange={handleErrorMessageChange}
                />
                <div>
                  <CheckBox
                    label={
                      contentForm && contentForm.privacy_policy_text
                        ? HTMLReactParser(contentForm.privacy_policy_text)
                        : HTMLReactParser(
                            "<p>Read and Accept <span class='txt-secondary-600 text-decoration-underline'>Privacy Policy</span></p>"
                          )
                    }
                    name="checkbox"
                    checkboxValue={inputsValues.checkBox}
                    onChange={setCheckBox}
                  />
                </div>
              </div>
              <CurrentSectionBtns
                showContinueBtn={true}
                isDisabled={isFormEmpty()}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
