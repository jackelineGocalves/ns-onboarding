import React, { useEffect, useRef, useState } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import Input from "./Input";
import { IntlTelInputProps } from "@/types/types";
import { FormErrors } from "@/errors/enumErrors";

export default function IntlTelInput({
  handleInputChange,
  name,
  inputId,
  onBlur,
  isRequired,
  inputValue,
  setCountryData,
  countryData,
  label,
  placeholder,
  wasPhoneValidated,
  handleErrorChange,
}: IntlTelInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<any>();
  let isValidRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;

      (window as any).intlTelInputGlobals.defaults.showFlags = false;
      (window as any).intlTelInputGlobals.defaults.showSelectedDialCode = true;
      (window as any).intlTelInputGlobals.defaults.formatAsYouType = false;

      //If there is already an instance of intlTelInput, destroy it first
      if (itiRef.current) {
        itiRef.current.destroy();
      }

      // Configure a new intlTelInput instance
      const iti = intlTelInput(input, {
        initialCountry: countryData.iso2,
        separateDialCode: true,
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/utils.js",
      });

      itiRef.current = iti;
      isValidRef.current = itiRef.current.isValidNumber();

      // Handle the country change event
      input.addEventListener("countrychange", function () {
        const selectedCountryData = iti.getSelectedCountryData();
        setCountryData(selectedCountryData.iso2);
        const newCountryData = {
          name: (countryData.name = selectedCountryData.name),
          iso2: (countryData.iso2 = selectedCountryData.iso2),
          dialCode: (countryData.dialCode = selectedCountryData.dialCode),
        };
        setCountryData(newCountryData);
      });
    }
  }, [countryData, setCountryData]);

  let errorMsg = "";

  if (wasPhoneValidated) {
    const phoneNumberError = itiRef.current?.getValidationError();
    if (phoneNumberError === intlTelInputUtils.validationError.TOO_SHORT) {
      errorMsg = FormErrors.PHONE_NUMBER_TOO_SHORT;
    } else if (
      phoneNumberError === intlTelInputUtils.validationError.TOO_LONG
    ) {
      errorMsg = FormErrors.PHONE_NUMBER_TOO_LONG;
    }
  }

  useEffect(() => {
    // Update the error message in the parent component each time it changes.
    if(handleErrorChange)
      handleErrorChange(errorMsg);
  }, [errorMsg, handleErrorChange]);


  return (
    <>
      <Input
        inputRef={inputRef}
        inputId={inputId}
        label={label}
        type="tel"
        name={name}
        placeholder={placeholder}
        countryIso2={countryData.iso2}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        errorMessage={inputValue !== "" && errorMsg !== "" ? errorMsg : ""}
        isRequired={isRequired}
        statusClass={`${
          wasPhoneValidated && inputValue !== "" && errorMsg !== ""
            ? "error-focus"
            : inputValue !== ""
            ? "filled"
            : ""
        }
          ${wasPhoneValidated && errorMsg === "" ? "success-focus" : ""}
        `}
        onBlur={onBlur}
      />
    </>
  );
}
