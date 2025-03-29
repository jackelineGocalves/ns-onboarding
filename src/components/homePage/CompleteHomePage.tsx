import { useEffect, useState } from "react";
import AccordionContainer from "./AccordionContainer";
import CarrosselContainer from "./CarrosselContainer";
import HomePageContainer from "./HomePageContainer";
import HomePageImg from "./HomePageImg";
import OpenAccountMethodsContainer from "./OpenAccountMethodContainer";
import { getAllHomepage } from "@/services/cms/apis/homepage";
import HTMLReactParser from "html-react-parser/lib/index";
import { useCMSdata } from "@/store/useCMdataStore";

export default function CompleteHomePage() {

  const setCMSdata = useCMSdata(state => state.setHomepageData);
  const CMSdata = useCMSdata(state => state.homepageData);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllHomepage();
        setCMSdata(result)
      } catch (error) {
        console.error("Error getting data from homepage", error);
      }
    }
    fetchData();
  }, [setCMSdata]);

  return (
    <>
      {CMSdata && (
        <div>
          <HomePageContainer contentList={CMSdata.presentation} />
          <OpenAccountMethodsContainer
            contentList={CMSdata?.accountsMethods}
            sectionTitle={HTMLReactParser(
              CMSdata.sectionTitles.accounts_methods
            )}
          />
          <CarrosselContainer
            contentList={CMSdata?.openAccountSteps}
            sectionTitle={HTMLReactParser(
              CMSdata.sectionTitles.open_account_steps
            )}
          />
          <HomePageImg contentList={CMSdata?.cardImage} />
          <AccordionContainer
            contentList={CMSdata?.FAQ}
            sectionTitle={HTMLReactParser(CMSdata.sectionTitles.faq)}
          />
        </div>
      )}
    </>
  );
}
