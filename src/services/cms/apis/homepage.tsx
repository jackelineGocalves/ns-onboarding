import { ContentAPI } from "../api";
import { AllHomepageResponseSchema } from "../models/homapage";

// Get a ContentAPI instance
const contentAPI = ContentAPI.getInstance();

//Get all the data from the homepage
export async function getAllHomepage() {
  try {
    const query = `
     query {
      homepage {
        translations(
          filter: { languages_code: { code: { _starts_with: "en" } } }
        ) {
          accounts_methods
          faq
          open_account_steps
        }
        accounts_methods {
          image {
            id
          }
          translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            title
            description
            duration
          }
        }
        faq (sort: ["sort", "-date_created"]) {
          translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            question
            answer
          }
        }
        open_account_steps {
          image {
            id
          }
          image_active {
            id
          }
          link
          external
           translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            id
            title
            description
          }
          btn_translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            button
          }
        }
        presentation {
          translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            title
            description
            tag
            invitation_tag
            open_account_button
            return_button
            invitation_button
            image {
              id
            }
          }
        }
        card_image {
          image {
            id
          }
          translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            tag
            title
          }
        }
        header {
          logo_company {
            id
          }
          logo_company_responsive {
            id
          }
          translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
            text
          }
        }
      }
    }
    `;

    const data = await contentAPI.query(query);
    const parsedData = AllHomepageResponseSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error getting data from homepage", error);
    throw error;
  }
}
