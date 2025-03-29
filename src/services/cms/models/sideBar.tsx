import { z } from "zod";
import { CMSImage } from "../utils/image";


//PROGRESS BAR
const SideBarTranslations = z.object({
  title: z.string(),
});

const SideBarSubStepsTranslations = z.object({
  sub_title: z.string(),
});

const SubStepsSchema = z.object({
  translations: z.array(SideBarSubStepsTranslations),
});

const SideBarSchema = z.object({
  icon: z.object({
    id: z.string(),
  }),
  translations: z.array(SideBarTranslations),
  sub_steps: z.array(SubStepsSchema),
});

export const SideBarResponseSchema = z
  .object({
    side_bar: z.array(SideBarSchema),
  })
  .transform((data) => {
    return {
      sideBar: data.side_bar.map((step, index) => {
        const translations = step.translations[0];
        let subSteps;

        if (step.sub_steps.length > 0) {
          subSteps = step.sub_steps.map((subStep) => {
            const subStepTranslations = subStep.translations[0];
            return {
              sub_title: subStepTranslations.sub_title,
            };
          });
        } else {
          subSteps = undefined;
        }

        return {
          id: index + 1,
          title: translations.title,
          icon: step.icon && CMSImage(step.icon.id),
          sub_steps: subSteps
            ? subSteps.map((subStep) => subStep.sub_title)
            : undefined,
        };
      }),
    };
  });

export type SideBarResponse = z.infer<typeof SideBarResponseSchema>;

//PERSONAL INFORMATION SECTION
const SideBarTextTranslations = z.object({
  title: z.string().nullable(),
  text: z.string().nullable(), 
})
  
const SideBarText = z.object({
  translations: z.array(SideBarTextTranslations)
})

export const SideBarTextSchema = z.object({
  sideBar_text: SideBarText,
}).transform((data) => {
  const translations = data.sideBar_text.translations[0];
  return {
    title: translations.title ? String(translations.title) : undefined,
    text: translations.text ? String(translations.text) : undefined, 
  }
})

export type SideBarTextResponse = z.infer<typeof SideBarTextSchema>;

