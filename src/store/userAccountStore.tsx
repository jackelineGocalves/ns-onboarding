import { dataDecrypt, dataEncrypt } from "@/helpers/encryptation";
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

export interface CountryData {
  name: string;
  iso2: string;
  dialCode: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  checkBox: boolean;
  countryData: CountryData;
}

interface ContactFormActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setCountryData: (countryInfo: CountryData) => void;
  setCheckBox: (checkBox: boolean) => void;
}

const SecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await SecureStorage.getItem(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStorage.removeItem(name);
  },
};

export const useContactForm = create<ContactFormActions & ContactFormData>()(
  persist(
    (set, get) => ({
      name: "",
      email: "",
      phoneNumber: "",
      checkBox: false,
      countryData: {
        name: "Portugal",
        iso2: "pt",
        dialCode: "351",
      },
      setName: (name: string) => set(() => ({ name: name })),
      setEmail: (email: string) => set(() => ({ email: email })),
      setPhoneNumber: (phoneNumber: string) =>
        set(() => ({ phoneNumber: phoneNumber })),
      setCountryData: (countryData: CountryData) =>
        set(() => ({ countryData: countryData })),
      setCheckBox: (checkBox: boolean) => set(() => ({ checkBox: checkBox })),
    }),
    {
      name: "contactFormData",
      storage: createJSONStorage(() => sessionStorage),
      getStorage: () => ({
        getItem: (key) => {
          const encryptedData = sessionStorage.getItem(key);
          return encryptedData ? dataDecrypt(encryptedData) : null;
        },
        setItem: (key, value) => {
          const encryptedValue = dataEncrypt(value);
          sessionStorage.setItem(key, encryptedValue);
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      }),
    }
  )
);

interface OTPValidations {
  wasPhoneValidated: boolean;
  wasEmailValidated: boolean;
  setWasPhoneValidated: (bool: boolean) => void;
  setWasEmailvalidated: (bool: boolean) => void;
}

export const useOTPValidations = create<OTPValidations>()(
  persist(
    (set, get) => ({
      wasPhoneValidated: false,
      wasEmailValidated: false,
      setWasPhoneValidated: (bool: boolean) =>
        set(() => ({ wasPhoneValidated: bool })),
      setWasEmailvalidated: (bool: boolean) =>
        set(() => ({ wasEmailValidated: bool })),
    }),
    {
      name: "OTPValidations",
      storage: createJSONStorage(() => sessionStorage),
      getStorage: () => ({
        getItem: (key) => {
          const encryptedData = sessionStorage.getItem(key);
          return encryptedData ? dataDecrypt(encryptedData) : null;
        },
        setItem: (key, value) => {
          const encryptedValue = dataEncrypt(value);
          sessionStorage.setItem(key, encryptedValue);
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      }),
    }
  )
);

interface ChosenAccount {
  chosenAccount: string;
  setChosenAccount: (chosenAccount: string) => void;
}

export const useChosenAccount = create<ChosenAccount>()(
  persist(
    (set, get) => ({
      chosenAccount: "",
      setChosenAccount: (chosenAccount: string) =>
        set(() => ({ chosenAccount: chosenAccount })),
    }),
    {
      name: "ChoosenAccount",
      storage: createJSONStorage(() => sessionStorage),
      getStorage: () => ({
        getItem: (key) => {
          const encryptedData = sessionStorage.getItem(key);
          return encryptedData ? dataDecrypt(encryptedData) : null;
        },
        setItem: (key, value) => {
          const encryptedValue = dataEncrypt(value);
          sessionStorage.setItem(key, encryptedValue);
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      }),
    }
  )
);

interface ConditionsDocuments {
  documentsReaded: boolean;
  setConditionsDocuments: (documentsReaded: boolean) => void;
}

export const useConditionsDocuments = create<ConditionsDocuments>()(
  persist(
    (set, get) => ({
      documentsReaded: false,
      setConditionsDocuments: (documentsReaded: boolean) =>
        set(() => ({ documentsReaded: documentsReaded })),
    }),
    {
      name: "documentsReaded",
      storage: createJSONStorage(() => sessionStorage),
      getStorage: () => ({
        getItem: (key) => {
          const encryptedData = sessionStorage.getItem(key);
          return encryptedData ? dataDecrypt(encryptedData) : null;
        },
        setItem: (key, value) => {
          const encryptedValue = dataEncrypt(value);
          sessionStorage.setItem(key, encryptedValue);
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      }),
    }
  )
);

export interface MultiHolderInfo {
  holderName: string;
  holderEmail: string;
  holderPhoneNumber: string;
  countryData: CountryData;
}

interface MultiHoldersForm {
  forms: MultiHolderInfo[];
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  addForm: (form: any, countryData?: any) => void;
  removeHolder: (index: number) => void;
  resetForms: () => void;
}

export const useMultiHoldersForm = create<MultiHoldersForm>()(
  persist(
    (set, get) => ({
      showForm: true,
      forms: [],
      addForm: (form: MultiHolderInfo, countryData: CountryData) => {
        const updatedForm = { ...form, countryData: countryData };
        set((state) => ({ forms: [...state.forms, updatedForm] }));
      },
      removeHolder: (index: number) => {
        set((state) => ({ forms: state.forms.filter((_, i) => i !== index) }));
      },
      resetForms: () => {
        set({ forms: [] });
      },
      setShowForm: (showForm: boolean) => set(() => ({ showForm: showForm })),
    }),
    {
      name: "multiHoldersData",
      storage: createJSONStorage(() => sessionStorage),
      getStorage: () => ({
        getItem: (key) => {
          const encryptedData = sessionStorage.getItem(key);
          return encryptedData ? dataDecrypt(encryptedData) : null;
        },
        setItem: (key, value) => {
          const encryptedValue = dataEncrypt(value);
          sessionStorage.setItem(key, encryptedValue);
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      }),
    }
  )
);


interface CardUserInformation {
  name: string;
  surname: string;
  sex: string;
  height: string;
  birthDate: string;
  expiryDate: string;
  documentNumber: string;
}

interface IDcardValidation {
  wasValidated: boolean;
  IDcardScreenshot : string, 
  userInformation: CardUserInformation;
  setWasValidated: (wasValidated: boolean) => void;
  setUserInformation: (userInformation: CardUserInformation) => void;
  setIDcardScreenshot: (screenshot: string) => void;
}

export const useIDcardValidation = create<IDcardValidation>((set) => ({
  wasValidated: false,
  IDcardScreenshot: "",
  userInformation: {
    name: "",
    surname: "",
    sex: "",
    height: "",
    birthDate: "",
    expiryDate: "",
    documentNumber: "",
  },
  setWasValidated: (wasValidated: boolean) =>
    set(() => ({ wasValidated: wasValidated })),
  setUserInformation: (userInformation: CardUserInformation) =>
    set(() => ({ userInformation: userInformation })),
  setIDcardScreenshot: (screenshot: string) => set(() => ({IDcardScreenshot: screenshot}))
}));
