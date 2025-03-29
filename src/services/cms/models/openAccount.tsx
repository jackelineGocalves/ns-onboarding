import { TypeOf, z } from "zod";
import { CMSImage } from "../utils/image";

//CONTACT FORM
const ContactFormTranslations = z.object({
  name_label: z.string().nullable(),
  name_placeholder: z.string().nullable(),
  email_label: z.string().nullable(),
  email_placeholder: z.string().nullable(),
  phone_label: z.string().nullable(),
  phone_placeholder: z.string().nullable(),
  privacy_policy_text: z.any().nullable(),
});

const ContactFormSchema = z.object({
  translations: z.array(ContactFormTranslations),
});

//OTP
const OTPtranslations = z.object({
  description: z.string().nullable(),
  label: z.string().nullable(),
  placeholder: z.string().nullable(),
});
const OTPschema = z.object({
  image: z.object({
    id: z.string(),
  }),
  translations: z.array(OTPtranslations),
});

//ACCOUNTS PRESENTATION
const BulletPoints = z.object({
  bullet_points: z.string(),
});

const ModalInfo = z.object({
  title: z.string(),
  topic: z.array(BulletPoints),
});
const AccountsPresentationTranslations = z.object({
  designation: z.string(),
  title: z.string(),
  description: z.string(),
  modal_info: z.array(ModalInfo),
});
const AccountPresentationSchema = z.object({
  image: z.object({
    id: z.string(),
  }),
  translations: z.array(AccountsPresentationTranslations),
});

//CHOOSE VIDEOCALL OR DIGITAL KEY OPTION
const ChooseOptionTranslations = z.object({
  tag: z.string().nullable(),
  title: z.string().nullable(),
  duration: z.string().nullable(),
});

const ChooseOptionSchema = z.object({
  translations: z.array(ChooseOptionTranslations),
});

//TERMS AND CONDITIONS DOCUMENTS
const DocumentsTranslations = z.object({
  tag: z.string(),
  title: z.string(),
  pdf: z.object({
    id: z.string(),
  }),
});

const DocumentsShema = z.object({
  translations: z.array(DocumentsTranslations),
});

//ADD MULTIHOLDERS FORM
const MultiholdersTranslations = z.object({
  name_label: z.string().nullable(),
  name_placeholder: z.string().nullable(),
  phone_label: z.string().nullable(),
  phone_placeholder: z.string().nullable(),
  email_label: z.string().nullable(),
  email_placeholder: z.string().nullable(),
});

const MultiholdersSchema = z.object({
  translations: z.array(MultiholdersTranslations),
});

//Steps Titles
const OpenAccountTranslations = z.object({
  contact_form: z.string().nullable(),
  otp_phone: z.string().nullable(),
  otp_email: z.string().nullable(),
  accounts_presentation: z.string().nullable(),
  choose_option: z.string().nullable(),
  terms_and_conditions_documents: z.string().nullable(),
    choose_add_multiholders: z.string().nullable(),
  add_multiholders: z.string().nullable(),
  //Extra info from accounts presentation
  details_btn_text: z.string().nullable(),
  modal_title: z.string().nullable(),
  modal_description: z.string().nullable(),
  principal_btn_text: z.string().nullable(),
  fulfil_btn: z.string().nullable(),
  dont_fulfil_btn: z.string().nullable(),
  //-------------------------------------
});

const OpenAccount = z.object({
  translations: z.array(OpenAccountTranslations),
  contact_form: z.array(ContactFormSchema),
  otp_phone: z.array(OTPschema),
  otp_email: z.array(OTPschema),
  accounts_presentation: z.array(AccountPresentationSchema),
  choose_option: z.array(ChooseOptionSchema),
  terms_and_conditions_documents: z.array(DocumentsShema),
  add_multiholders: z.array(MultiholdersSchema),
});

export const OpenAccountSchema = z
  .object({
    open_account: OpenAccount,
  })
  .transform((data) => {
    const contactFormTranslations =
      data.open_account.contact_form[0].translations[0];
    const phoneOTPdata = data.open_account.otp_phone[0].translations[0];
    const emailOTPdata = data.open_account.otp_email[0].translations[0];
    const multiholdersData =
      data.open_account.add_multiholders[0].translations[0];

    const sectionsTitlesData = data.open_account.translations[0];
    return {
      stepsTitles: {
        contact_form: sectionsTitlesData.contact_form
          ? String(sectionsTitlesData.contact_form)
          : undefined,
        otp_phone: sectionsTitlesData.otp_phone
          ? String(sectionsTitlesData.otp_phone)
          : undefined,
        otp_email: sectionsTitlesData.otp_email
          ? String(sectionsTitlesData.otp_email)
          : undefined,
        accounts_presentation: sectionsTitlesData.accounts_presentation
          ? String(sectionsTitlesData.accounts_presentation)
          : undefined,
        accountsExtraInfo: {
          details_btn_text: sectionsTitlesData.details_btn_text
            ? String(sectionsTitlesData.details_btn_text)
            : undefined,
          modal_title: sectionsTitlesData.modal_title
            ? String(sectionsTitlesData.modal_title)
            : undefined,
          modal_description: sectionsTitlesData.modal_description
            ? String(sectionsTitlesData.modal_description)
            : undefined,
          principal_btn_text: sectionsTitlesData.principal_btn_text
            ? String(sectionsTitlesData.principal_btn_text)
            : undefined,
          fulfil_btn: sectionsTitlesData.fulfil_btn
            ? String(sectionsTitlesData.fulfil_btn)
            : undefined,
          dont_fulfil_btn: sectionsTitlesData.dont_fulfil_btn
            ? String(sectionsTitlesData.dont_fulfil_btn)
            : undefined,
        },
        choose_option: sectionsTitlesData.choose_option
          ? String(sectionsTitlesData.choose_option)
          : undefined,
        terms_and_conditions_documents:
          sectionsTitlesData.terms_and_conditions_documents
            ? String(sectionsTitlesData.terms_and_conditions_documents)
            : undefined,
        choose_add_multiholders: sectionsTitlesData.choose_add_multiholders
          ? String(sectionsTitlesData.choose_add_multiholders)
          : undefined,
        add_multiholders: sectionsTitlesData.add_multiholders
          ? String(sectionsTitlesData.add_multiholders)
          : undefined,
      },

      contactForm: {
        name_label: contactFormTranslations.name_label
          ? String(contactFormTranslations.name_label)
          : undefined,
        name_placeholder: contactFormTranslations.name_placeholder
          ? String(contactFormTranslations.name_placeholder)
          : undefined,
        email_label: contactFormTranslations.email_label
          ? String(contactFormTranslations.email_label)
          : undefined,
        email_placeholder: contactFormTranslations.email_placeholder
          ? String(contactFormTranslations.email_placeholder)
          : undefined,
        phone_label: contactFormTranslations.phone_label
          ? String(contactFormTranslations.phone_label)
          : undefined,
        phone_placeholder: contactFormTranslations.phone_placeholder
          ? String(contactFormTranslations.phone_placeholder)
          : undefined,
        privacy_policy_text: contactFormTranslations.privacy_policy_text
          ? String(contactFormTranslations.privacy_policy_text)
          : undefined,
      },

      phoneOTP: {
        description: phoneOTPdata.description
          ? String(phoneOTPdata.description)
          : undefined,
        label: phoneOTPdata.label ? String(phoneOTPdata.label) : undefined,
        placeholder: phoneOTPdata.placeholder
          ? String(phoneOTPdata.placeholder)
          : undefined,
        image:
          data.open_account.otp_phone[0].image &&
          CMSImage(data.open_account.otp_phone[0].image.id),
      },

      emailOTP: {
        description: emailOTPdata.description
          ? String(emailOTPdata.description)
          : undefined,
        label: emailOTPdata.label ? String(emailOTPdata.label) : undefined,
        placeholder: emailOTPdata.placeholder
          ? String(emailOTPdata.placeholder)
          : undefined,
        image:
          data.open_account.otp_email[0].image &&
          CMSImage(data.open_account.otp_email[0].image.id),
      },

      accountsPresentation: data.open_account.accounts_presentation.map(
        (account) => {
          const translations = account.translations[0];
          return {
            title: String(translations.title),
            designation: String(translations.designation),
            description: String(translations.description),
            modalInfo: Object(translations.modal_info),
            image: account.image && CMSImage(account.image.id),
          };
        }
      ),

      chooseOption: data.open_account.choose_option.map((method) => {
        const translations = method.translations[0];
        return {
          tag: translations.tag ? String(translations.tag) : undefined,
          title: translations.title ? String(translations.title) : undefined,
          duration: translations.duration
            ? String(translations.duration)
            : undefined,
        };
      }),

      documents: data.open_account.terms_and_conditions_documents.map(
        (document) => {
          const translations = document.translations[0];
          return {
            tag: String(translations.tag),
            title: String(translations.title),
            pdf: translations.pdf && CMSImage(translations.pdf.id),
          };
        }
      ),

      multiholdersForm: {
        name_label: multiholdersData.name_label
          ? String(multiholdersData.name_label)
          : undefined,
        name_placeholder: multiholdersData.name_placeholder
          ? String(multiholdersData.name_placeholder)
          : undefined,
        email_label: multiholdersData.email_label
          ? String(multiholdersData.email_label)
          : undefined,
        email_placeholder: multiholdersData.email_placeholder
          ? String(multiholdersData.email_placeholder)
          : undefined,
        phone_label: multiholdersData.phone_label
          ? String(multiholdersData.phone_label)
          : undefined,
        phone_placeholder: multiholdersData.phone_placeholder
          ? String(multiholdersData.phone_placeholder)
          : undefined,
      },
    };
  });

export type OpenAccountResponse = z.infer<typeof OpenAccountSchema>;
