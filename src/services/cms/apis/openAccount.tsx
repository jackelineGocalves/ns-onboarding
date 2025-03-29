import { parse } from "path";
import { ContentAPI } from "../api";
import { OpenAccountSchema } from "../models/openAccount";

// Get a ContentAPI instance
const contentAPI = ContentAPI.getInstance();

//OPEN ACCOUNT PROCESS DATA
export async function getOpenAccountProcessData() {
  try {
    const query = `
     query {
        open_account {
            translations(
                filter: { languages_code: { code: { _starts_with: "en" } } }
            ) {
                contact_form
                otp_phone
                otp_email
                accounts_presentation
                details_btn_text,
                modal_title,
                modal_description,
                principal_btn_text,
                fulfil_btn,
                dont_fulfil_btn
                choose_option
                terms_and_conditions_documents
                choose_add_multiholders
                add_multiholders
            }
            contact_form {
                translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    name_label
                    name_placeholder
                    email_label
                    email_placeholder
                    phone_label
                    phone_placeholder
                    privacy_policy_text
                }
            }
            otp_phone {
                image {
                    id
                }
                translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    description
                    label
                    placeholder
                }
            }
             otp_email {
                image {
                    id
                }
                translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    description
                    label
                    placeholder
                }
            }
            accounts_presentation{
                image {
                    id
                }
                 translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    title
                    designation
                    description
                    modal_info
                }
            }
            choose_option (sort: ["sort", "-date_created"]){
                  translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    title
                    tag
                    duration 
                }
            }
            terms_and_conditions_documents {
                  translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    tag
                    title
                    pdf {
                        id
                    }
                }
            }
            add_multiholders {
                 translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    name_label
                    name_placeholder
                    email_label
                    email_placeholder
                    phone_label
                    phone_placeholder
                }
            }
        }
     }
    `;

    const data = await contentAPI.query(query);
    const parsedData = OpenAccountSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error getting data from open account", error);
    throw error;
  }
}


