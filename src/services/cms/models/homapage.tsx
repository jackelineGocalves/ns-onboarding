import { z } from "zod";
import { CMSImage } from "../utils/image";

//Open Account Methods cards
const AccountMethodTranslationSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
});

const AccountMethodSchema = z.object({
  image: z.object({
    id: z.string(),
  }),
  translations: z.array(AccountMethodTranslationSchema),
});

//FAQ acordion
const FAQtranslationSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const FAQschema = z.object({
  translations: z.array(FAQtranslationSchema),
});

//Carrossel cards
const CarroselCardsTranslation = z.object({
  title: z.string(),
  description: z.string(),
});

const CarrosselCardBtnTranslations = z.object({
  button: z.string().nullable(),
});

const CarroselCardsSchema = z.object({
  image: z.object({
    id: z.string(),
  }),
  image_active: z.object({
    id: z.string(),
  }),
  link: z.any().nullable(),
  external: z.boolean(),
  translations: z.array(CarroselCardsTranslation),
  btn_translations: z.array(CarrosselCardBtnTranslations),
});

//Homepage presentation
const PresentationTranslations = z.object({
  title: z.string(),
  tag: z.string(),
  description: z.string(),
  invitation_tag: z.string(),
  open_account_button: z.string().nullable(),
  return_button: z.string().nullable(),
  invitation_button: z.string().nullable(),
  image: z.object({
    id: z.string(),
  }),
});

const PresentationSchema = z.object({
  translations: z.array(PresentationTranslations),
});

//Card Image
const CardImageTranslations = z.object({
  tag: z.string(),
  title: z.string(),
});

const CardImageSchema = z.object({
  image: z.object({
    id: z.string(),
  }),
  translations: z.array(CardImageTranslations),
});

//Header
const HeaderTranslations = z.object({
  text: z.string().nullable(),
});

const HeaderSchema = z.object({
  logo_company: z.object({
    id: z.string(),
  }),
  logo_company_responsive: z.object({
    id: z.string(),
  }),
  translations: z.array(HeaderTranslations),
});

//General Homepage
const HomepageTranslationSchema = z.object({
  accounts_methods: z.string(),
  faq: z.string(),
  open_account_steps: z.string(),
});

const HomepageSchema = z.object({
  translations: z.array(HomepageTranslationSchema),
  accounts_methods: z.array(AccountMethodSchema),
  faq: z.array(FAQschema),
  open_account_steps: z.array(CarroselCardsSchema),
  presentation: z.array(PresentationSchema),
  card_image: z.array(CardImageSchema),
  header: z.array(HeaderSchema),
});

export const AllHomepageResponseSchema = z
  .object({
    homepage: HomepageSchema,
  })
  .transform((elem) => {
    const presentationTranslations = elem.homepage.presentation[0];
    const cardImageTranslations = elem.homepage.card_image[0];
    const headerTranslations = elem.homepage.header[0];

    return {
      sectionTitles: elem.homepage.translations[0],
      accountsMethods: elem.homepage.accounts_methods.map((account) => {
        const translation = account.translations[0];
        return {
          title: String(translation?.title),
          description: String(translation?.description),
          duration: String(translation?.duration),
          image: account.image && CMSImage(account.image.id),
        };
      }),

      FAQ: elem.homepage.faq.map((question) => {
        const translation = question.translations[0];
        return {
          question: String(translation?.question),
          answer: String(translation?.answer),
        };
      }),

      openAccountSteps: elem.homepage.open_account_steps.map((step, index) => {
        const translation = step.translations[0];
        const btntranslation = step.btn_translations[0];
        return {
          id: index + 1,
          title: String(translation.title),
          description: String(translation.description),
          image: step.image && CMSImage(step.image.id),
          image_active: step.image_active && CMSImage(step.image_active.id),
          button: btntranslation && btntranslation.button ? String(btntranslation.button) : undefined,
          external: Boolean(step.external),
          link: step.link ? String(step.link) : undefined,
        };
      }),
      presentation: {
        title: String(presentationTranslations.translations[0].title),
        tag: String(presentationTranslations.translations[0].tag),
        description: String(
          presentationTranslations.translations[0].description
        ),
        invitation_tag: String(
          presentationTranslations.translations[0].invitation_tag
        ),
        image:
          presentationTranslations.translations[0].image &&
          CMSImage(presentationTranslations.translations[0].image.id),
        open_account_button: presentationTranslations.translations[0]
          .open_account_button
          ? String(presentationTranslations.translations[0].open_account_button)
          : null,
        return_button: presentationTranslations.translations[0].return_button
          ? String(presentationTranslations.translations[0].return_button)
          : null,
        invitation_button: presentationTranslations.translations[0]
          .invitation_button
          ? String(presentationTranslations.translations[0].invitation_button)
          : null,
      },

      cardImage: {
        title: String(cardImageTranslations.translations[0].title),
        tag: String(cardImageTranslations.translations[0].tag),
        image:
          cardImageTranslations.image &&
          CMSImage(cardImageTranslations.image.id),
      },

      header: {
        text: headerTranslations.translations[0].text
          ? String(headerTranslations.translations[0].text)
          : null,
        logo_company:
          headerTranslations.logo_company &&
          CMSImage(headerTranslations.logo_company.id),
        logo_company_responsive:
          headerTranslations.logo_company_responsive &&
          CMSImage(headerTranslations.logo_company_responsive.id),
      },
    };
  });

export type HomepageResponse = z.infer<typeof AllHomepageResponseSchema>;
