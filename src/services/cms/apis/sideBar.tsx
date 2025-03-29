import { ContentAPI } from "../api";
import { SideBarResponseSchema, SideBarTextSchema } from "../models/sideBar";

// Get a ContentAPI instance
const contentAPI = ContentAPI.getInstance();

//PROGRESS BAR
export async function getSideBarData() {
  try {
    const query = `
     query {
        side_bar {
            icon {
                id
            }
            translations(
                filter: { languages_code: { code: { _starts_with: "en" } } }
            ) {
                title
            }
            sub_steps {
                translations(
                    filter: { languages_code: { code: { _starts_with: "en" } } }
                ) {
                    sub_title
                 }
            }
        }
     }
    `;

    const data = await contentAPI.query(query);
    const parsedData = SideBarResponseSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error getting data from sideBar", error);
    throw error;
  }
}



//PERSONAL INFORMATION SECTION
export async function getSideBarTextData() {
  try {
     const query = `
     query {
         sideBar_text{
          translations(
            filter: { languages_code: { code: { _starts_with: "en" } } }
          ) {
              title
              text
            }
        }
     }
    `;
    
    const data = await contentAPI.query(query);
    const parsedData = SideBarTextSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error getting text from sideBar", error);
    throw error;
  }
}
