import Input from "@/components/Input";
import HolderCard from "@/components/HolderCard";
import Btn from "@/components/Btn";
import { isFormEmpty } from "@/helpers/validations";
import IntlTelInput from "@/components/IntlTelInput";
import { useMultiHoldersForm } from "@/store/userAccountStore";
import { AddMultiHoldersFormProps } from "@/types/types";

export default function AddMultiHolderForm({
  holderIndex,
  handleInputChange,
  handleBlur,
  multiHolderValues,
  wasNameValidated,
  wasEmailValidated,
  wasPhoneValidated,
  handleSubmit,
  setCountryData,
  countryData,
  handleErrorMessageChange,
  phoneErrorMsg,
  handleCancelForm,
  contentList,
}: AddMultiHoldersFormProps) {
  //Global state to manage the creation of new forms.
  const holderData = useMultiHoldersForm();

  // Function to handle changes in the error message of the IntlTelInput component
  const handlePhoneNumberError = (errorMsg: string) => {
    handleErrorMessageChange(errorMsg);
  };

  return (
    <>
      <div className="h-100 d-flex flex-column justify-content-between">
        <div>
          <div className="pb-3 pb-md-4">
            <HolderCard
              holderName={multiHolderValues.holderName}
              holderIndex={holderIndex}
            />
          </div>
          <div className="row justify-content-center ">
            <div className="col-12 col-sm-10 col-md-10 col-xl-10 col-xxl-9">
              <form action="" onSubmit={handleSubmit}>
                <div className="d-grid gap-3 gap-md-4">
                  <Input
                    label={
                      contentList && contentList.name_label
                        ? contentList.name_label
                        : "Full Name"
                    }
                    placeholder={
                      contentList && contentList.name_placeholder
                        ? contentList.name_placeholder
                        : "Name and Surname"
                    }
                    name="holderName"
                    type="text"
                    inputId="holderName"
                    isRequired={true}
                    inputValue={multiHolderValues.holderName}
                    handleInputChange={handleInputChange}
                    onBlur={handleBlur}
                    errorMessage={
                      multiHolderValues.holderName !== ""
                        ? multiHolderValues.errors.name
                        : ""
                    }
                    statusClass={`
                        ${
                          multiHolderValues.errors.name !== "" &&
                          multiHolderValues.holderName !== ""
                            ? "error-focus"
                            : undefined
                        }
                        ${
                          multiHolderValues.holderName.trim() !== ""
                            ? "filled"
                            : undefined
                        }
                        ${
                          wasNameValidated &&
                          multiHolderValues.holderName.trim() !== "" &&
                          multiHolderValues.errors.name == ""
                            ? "success-focus"
                            : undefined
                        }

                     `}
                  />
                  <IntlTelInput
                    name="holderPhoneNumber"
                    inputId="holderPhoneNumber"
                    label={
                      contentList && contentList.phone_label
                        ? contentList.phone_label
                        : "Phone-number"
                    }
                    placeholder={
                      contentList && contentList.phone_placeholder
                        ? contentList.phone_placeholder
                        : "000 000 000"
                    }
                    inputValue={multiHolderValues.holderPhoneNumber}
                    handleInputChange={handleInputChange}
                    onBlur={handleBlur}
                    setCountryData={setCountryData}
                    isRequired={true}
                    countryData={countryData}
                    wasPhoneValidated={wasPhoneValidated}
                    handleErrorChange={handlePhoneNumberError}
                  />
                  <Input
                    label={contentList && contentList.email_label ? contentList.email_label : "Email"}
                    placeholder={contentList && contentList.email_placeholder ? contentList.email_placeholder : "email@email.com"}
                    name="holderEmail"
                    type="text"
                    inputId="holderEmail"
                    isRequired={true}
                    inputValue={multiHolderValues.holderEmail}
                    handleInputChange={handleInputChange}
                    onBlur={handleBlur}
                    errorMessage={
                      multiHolderValues.holderEmail !== ""
                        ? multiHolderValues.errors.email
                        : ""
                    }
                    statusClass={`
                        ${
                          multiHolderValues.errors.email !== "" &&
                          multiHolderValues.holderEmail !== ""
                            ? "error-focus"
                            : undefined
                        }
                     
                        ${
                          multiHolderValues.holderEmail.trim() !== ""
                            ? "filled"
                            : undefined
                        }
                          ${
                            wasEmailValidated &&
                            multiHolderValues.holderEmail.trim() !== "" &&
                            multiHolderValues.errors.email == ""
                              ? "success-focus"
                              : undefined
                          }

                     `}
                  />
                </div>
              </form>
              <div
                className={` pt-4 mt-2 d-none d-md-flex ${
                  holderData.forms.length > 0 ? "justify-content-between" : ""
                }`}
              >
                {holderData.forms.length > 0 && (
                  <Btn
                    btnClass="btn small btn-secondary"
                    onClick={handleCancelForm}
                  >
                    {" "}
                    Cancel{" "}
                  </Btn>
                )}
                <Btn
                  onClick={
                    multiHolderValues.errors.name == "" &&
                    multiHolderValues.errors.email == "" &&
                    phoneErrorMsg == ""
                      ? handleSubmit
                      : undefined
                  }
                  btnClass={`btn small btn-primary ${
                    holderData.forms.length < 1 ? " m-auto" : ""
                  }`}
                  disabled={isFormEmpty(multiHolderValues)}
                >
                  Save
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
