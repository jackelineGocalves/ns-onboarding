  //Inputs vlidations
  export const validateEmail = (emailValue: string) => {
    const emailRegex = /^[\w-.]+@[\w]+(\.[a-zA-Z]{2,4}){1,2}$/;
    const email = emailValue.trim();
    const isValid = emailRegex.test(email);
    return isValid;
  };

  export const validateFullName = (nameValue: string) => {
    const nameRegex =  /^[a-zA-Z\s]+\s[a-zA-Z]+$/;
    const name = nameValue.trim();
    const isValid = nameRegex.test(name);
    return isValid;
  };

  export const isFormEmpty = (inputValues: any) => {
    for (const field of Object.values(inputValues)) {
      if (typeof field === "string" && field.trim() === "") {
        return true;
      }
    }
    return false;
  };
