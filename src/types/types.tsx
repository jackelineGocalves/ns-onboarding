import { FormErrors } from "@/errors/enumErrors";
import { ChooseAccountAlertObject } from "@/components/createAccount/accounts_presentation/interfaces";
import { CountryData } from "@/store/userAccountStore";
import { ContactFormData } from "@/components/createAccount/personal-info-form/PersonalInfoForm";
import { OTPdata } from "@/components/createAccount/contact-validation/ContactValidation";
import { GeneralModalInfo, ModalInfo,} from "@/components/createAccount/accounts_presentation/AccountsPresentationContainer";
import { OpenAccountResponse } from "@/services/cms/models/openAccount";
import { ChooseOption } from "@/components/createAccount/choose_option/ChooseOption";
import { Documents } from "@/components/createAccount/document-pages/DocumentPages";
import { SideBarResponse, SideBarTextResponse } from "@/services/cms/models/sideBar";
import {
  OpenAccountProcess,
  UserProcessHistory,
} from "@/store/useShowCurrentComponent";

export type PersonalInfoFormProps = {
  nextPhase: () => void;
  title: string;
  contentForm: ContactFormData | undefined;
  previousComponent?: () => void;
  errors?: FormErrors;
  onEmailValidationChange?: any;
};

export type OTPProps = {
  nextPhase: () => void;
  previousPhase: () => void;
  clientContentOTP: OTPdata | undefined;
  showOtpEmailComponent?: boolean;
  title?: string;
};

export type CurrentSectionBtnsProps = {
  previousComponent?: () => void;
  showGoBackBtn?: boolean;
  showContinueBtn?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  animation?: string;
};

export type AccountsPresentationProps = {
  title: string;
  img: string;
  tag?: string;
  info: string;
  detailsBtn?: string;
  modalBtn: string | undefined;
  onClick: () => void;
};

export type AccountsPresentationContainerProps = {
  clientAccountsList: OpenAccountResponse | undefined;
  previousPhase: () => void;
  nextPhase: () => void;
  sectionTitle: string;
};

export type AccountPresentationModalProps = {
  show: boolean;
  onHide: () => void;
  requeriments: ModalInfo[] | null;
  nextComponent: () => void;
  onClick: () => void;
  generalInfo: GeneralModalInfo | undefined;
};

export type AlertProps = {
  onClick: () => void;
  chooseAccountAlertContent: ChooseAccountAlertObject;
  alertClass?: string;
  isAlertOpen?: boolean;
};

export type ChooseCardProps = {
  tag?: string;
  option: string;
  duration?: string;
  img: React.ReactElement;
  onClick?: any;
};

export type ChooseOptionProps = {
  previousPhase: () => void;
  nextPhase: () => void;
  clientContent?: ChooseOption[] | undefined;
  nextStep?: () => void;
  title?: string;
};

export type DocumentPagesProps = {
  previousComponent: () => void;
  nextComponent: () => void;
  clientDocumentsList: Documents[] | undefined;
  title: string;
};

export type ConditionsCard = {
  tag: string;
  title: string;
  cardClass: string;
  onClick?: () => void;
  icon: React.ReactElement;
  textClass: string;
  cursorClass?: string;
};

export type ControlPdfPanelProps = {
  scale: number;
  setScale: (scale: number) => void;
  numPages: number | undefined;
  nextPage: () => void;
  previousPage: () => void;
  actualPage: number;
  handleDownload: () => void;
};

export type HandleCurrentComponentProps = {
  previousPhase: () => void;
  nextPhase: () => void;
  clientContent?: any;
  title?: string;
};

export type IntlTelInputProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  inputId: string;
  onBlur?: () => void;
  isRequired?: boolean;
  inputValue: string;
  setCountryData: (countryData: any) => void;
  countryData: CountryData;
  label: string;
  placeholder: string;
  wasPhoneValidated?: boolean;
  handleErrorChange?: (errorMsg: string) => void;
};

export type AddMultiHoldersFormProps = {
  holderIndex: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  multiHolderValues: any;
  wasNameValidated: boolean;
  wasEmailValidated: boolean;
  wasPhoneValidated: boolean;
  handleSubmit: () => void;
  setCountryData: (CountryData: CountryData) => void;
  countryData: CountryData;
  handleErrorMessageChange: (errorMsg: string) => void;
  phoneErrorMsg: string;
  handleCancelForm: () => void;
  contentList: ContactFormData;
};

export type SideNavLayoutProps = {
  displayClass?: string;
  navElementsList: any;
  sideBarText?: SideBarTextResponse;
  handleSideNav?: () => void;
  stepsCompleated: number[];
  subStepsCompleated: number[];
  goToChooseAccountPhase: () => void;
  goToMultiholdersPhase: () => void;
  goToValidateIdentityPhase: () => void;
  goToConclusionPhase: () => void;
  goToIDcardValidation: () => void;
  goToAddressValidation: () => void;
  goToValidateJobSituation: () => void;
  goToVideoCall: () => void;
  processHistory: UserProcessHistory;
  openAccountCurrentProcess: OpenAccountProcess;
};

export interface OpenAccountCmsData {
  sideBarSteps: SideBarResponse;
  sideBarInitialText: SideBarTextResponse;
  openAccountPhases: OpenAccountResponse;
}
