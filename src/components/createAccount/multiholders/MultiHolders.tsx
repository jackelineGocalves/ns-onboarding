import { HandleCurrentComponentProps } from "@/types/types";
import AddMultiHolderForm from "./AddMultiHolderForm";
import Btn from "@/components/Btn";
import MultiHolderInfoCard from "@/components/MultiHolderInfoCard";
import CurrentSectionBtns from "../CurrentSectionBtns";
import { useMultiHoldersForm } from "@/store/userAccountStore";
import {
  isFormEmpty,
  validateEmail,
  validateFullName,
} from "@/helpers/validations";
import { useEffect, useRef, useState } from "react";
import { FormErrors } from "@/errors/enumErrors";
import { useWindowSize } from "@uidotdev/usehooks";

export default function MultiHolders({
  previousPhase,
  nextPhase,
  clientContent,
  title,
}: HandleCurrentComponentProps) {
  //Global state to manage the creation of new forms.
  const holderData = useMultiHoldersForm();
  const windowSize = useWindowSize();
  //Local States
  const [multiHolderValues, setMultiHolderValues] = useState({
    holderName: "",
    holderPhoneNumber: "",
    holderEmail: "",
    errors: {
      name: "",
      email: "",
    },
  });

  const [countryData, setCountryData] = useState({
    name: "Portugal",
    iso2: "pt",
    dialCode: "351",
  });

  //Once the inputs has been validated with onBlur, states become true and aply validation in onChange
  const [wasNameValidated, setWasNameValidated] = useState(false);
  const [wasEmailValidated, setWasEmailValidated] = useState(false);
  const [wasPhoneValidated, setWasPhoneValidated] = useState(false);

  let newErrors = { ...multiHolderValues.errors };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //Don't validate if the value only contains whitespace.
    if (value.trim() === "") {
      setMultiHolderValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }

    //Perform validation only if the field has been previously validated by onBlur
    if (wasNameValidated && name === "holderName") {
      newErrors.name = !validateFullName(value) ? FormErrors.NAME : "";
    }

    if (wasEmailValidated && name === "holderEmail") {
      newErrors.email = !validateEmail(value) ? FormErrors.EMAIL : "";
    }

    setMultiHolderValues((prevState) => ({
      ...prevState,
      errors: newErrors,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    if (!wasNameValidated) {
      if (multiHolderValues.holderName.trim() !== "") {
        newErrors.name = !validateFullName(multiHolderValues.holderName)
          ? FormErrors.NAME
          : "";
        setWasNameValidated(true);
      }
    }

    if (!wasEmailValidated) {
      if (multiHolderValues.holderEmail.trim() !== "") {
        newErrors.email = !validateEmail(multiHolderValues.holderEmail)
          ? FormErrors.EMAIL
          : "";
        setWasEmailValidated(true);
      }
    }

    if (!wasPhoneValidated) {
      if (multiHolderValues.holderPhoneNumber.trim() !== "") {
        setWasPhoneValidated(true);
      }
    }

    setMultiHolderValues((prevState) => ({
      ...prevState,
      errors: newErrors,
    }));
  };

  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  // Function to handle changes in the error message of the IntlTelInput component
  const handleErrorMessageChange = (errorMsg: string) => {
    setPhoneErrorMsg(errorMsg);
  };

  const handleShowHolderCardInfo = () => {
    holderData.setShowForm(!holderData.showForm);
  };

  //Delete holder from global state
  const handleDeleteHolder = (i: number) => {
    holderData.removeHolder(i);
    if (holderData.forms.length === 1) {
      holderData.setShowForm(true);
    }
  };

  // If the global state doesn't contain any information and the user navigates back to the previous component,
  //setShowForm is set to true.If there is information, the form is not displayed, only the cards.
  const handlePreviousComponent = () => {
    previousPhase();
    if (holderData.forms.length > 0) {
      holderData.setShowForm(false);
    }
    if (holderData.forms.length == 0) {
      holderData.setShowForm(true);
    }
  };

  const handleCancelForm = () => {
    if (holderData.forms.length > 0) {
      holderData.setShowForm(false);
    }
    setMultiHolderValues({
      holderName: "",
      holderPhoneNumber: "",
      holderEmail: "",
      errors: {
        name: "",
        email: "",
      },
    });
    setCountryData({
      name: "Portugal",
      iso2: "pt",
      dialCode: "351",
    });
    setWasPhoneValidated(false);
    if (holderData.forms.length == 0) {
      previousPhase();
    }
  };

  const handleSubmit = () => {
    holderData.setShowForm(false);
    //Introducing the input values into the global state  as an object within an array
    holderData.addForm(multiHolderValues, countryData);

    setMultiHolderValues({
      holderName: "",
      holderPhoneNumber: "",
      holderEmail: "",
      errors: {
        name: "",
        email: "",
      },
    });
    setCountryData({
      name: "Portugal",
      iso2: "pt",
      dialCode: "351",
    });
    setWasNameValidated(false);
    setWasEmailValidated(false);
    setWasPhoneValidated(false);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Function to scroll to the bottom of the container when its content changes
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    //Call the scroll to bottom function when the content changes
    scrollToBottom();
  }, [holderData.showForm, multiHolderValues]);

  return (
    <>
      <div className="container-xl">
        <div className="row h-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-xl-8 col-xxl-7 p-0">
            <div className="d-flex flex-column h-100">
              <h2 className="current-section-title text-center">{title}</h2>
              <div className=" d-flex flex-column justify-content-between h-100">
                <div
                  className="multiholder-container d-flex flex-column justify-content-between d-md-block h-100"
                  ref={scrollRef}
                >
                  <div
                    className={`h-100
                    ${
                      holderData.forms.length > 0
                        ? "holder-cards-container"
                        : ""
                    }
                 `}
                  >
                    <div>
                      {windowSize.width !== null &&
                        windowSize.width < 576 &&
                        !holderData.showForm && (
                          <div className="holder-cards-container">
                            {holderData.forms.map((element, index) => (
                              <div key={index} className="pb-3 mb-1">
                                <MultiHolderInfoCard
                                  holderData={element}
                                  key={index}
                                  onDelete={() => handleDeleteHolder(index)}
                                  holderIndex={index + 2}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                      <div className="d-none d-sm-flex holder-cards-container">
                        {holderData.forms.map((element, index) => (
                          <div key={index} className="pb-4 mb-3">
                            <MultiHolderInfoCard
                              holderData={element}
                              key={index}
                              onDelete={() => handleDeleteHolder(index)}
                              holderIndex={index + 2}
                            />
                          </div>
                        ))}
                      </div>
                      {!holderData.showForm && (
                        <div className="d-flex justify-content-center">
                          <Btn
                            btnClass="btn btn-secondary small mt-1 mt-md-0"
                            onClick={handleShowHolderCardInfo}
                          >
                            Add another holder
                          </Btn>
                        </div>
                      )}
                    </div>

                    {holderData.showForm && (
                      <AddMultiHolderForm
                        holderIndex={holderData.forms.length + 2}
                        handleInputChange={handleInputChange}
                        handleBlur={handleBlur}
                        multiHolderValues={multiHolderValues}
                        wasNameValidated={wasNameValidated}
                        wasEmailValidated={wasEmailValidated}
                        wasPhoneValidated={wasPhoneValidated}
                        handleSubmit={handleSubmit}
                        setCountryData={setCountryData}
                        countryData={countryData}
                        handleErrorMessageChange={handleErrorMessageChange}
                        phoneErrorMsg={phoneErrorMsg}
                        handleCancelForm={handleCancelForm}
                        contentList={clientContent}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <div className="d-none d-md-block">
                    <CurrentSectionBtns
                      showContinueBtn={true}
                      onClick={nextPhase}
                      isDisabled={holderData.showForm}
                      showGoBackBtn={true}
                      previousComponent={handlePreviousComponent}
                    />
                  </div>

                  <div className="d-block d-md-none px-3">
                    {!holderData.showForm && (
                      <CurrentSectionBtns
                        showContinueBtn={true}
                        onClick={nextPhase}
                        isDisabled={holderData.showForm}
                        showGoBackBtn={true}
                        previousComponent={handlePreviousComponent}
                      />
                    )}
                  </div>

                  <div className="d-block d-md-none px-3">
                    {holderData.showForm && (
                      <div className="d-flex justify-content-between current-section-btns">
                        <Btn
                          btnClass="btn small btn-secondary"
                          onClick={handleCancelForm}
                        >
                          {" "}
                          Cancel{" "}
                        </Btn>

                        <Btn
                          onClick={
                            multiHolderValues.errors.name == "" &&
                            multiHolderValues.errors.email == "" &&
                            phoneErrorMsg == ""
                              ? handleSubmit
                              : undefined
                          }
                          btnClass="btn btn-primary"
                          disabled={isFormEmpty(multiHolderValues)}
                        >
                          Save
                        </Btn>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
