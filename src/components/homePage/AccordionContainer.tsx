import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import Plus from "../icones/Plus";
import Minus from "../icones/Minus";
import HTMLReactParser from "html-react-parser/lib/index";

interface FAQacordion {
  question: string;
  answer: string;
}

export default function AccordionContainer({
  sectionTitle,
  contentList,
}: {
  sectionTitle: React.ReactNode;
  contentList: FAQacordion[] | undefined;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(i: number) {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  }

  return (
    <div className="container-xl pt-3 mt-0 pt-md-4 mt-md-2">
      <h2 className="acordion-container py-4 my-0 py-sm-4 my-sm-3 txt-secondary-600 text-center">
        {sectionTitle}
      </h2>

      <div className="d-grid gap-3 gap-md-4">
        {contentList &&
          contentList.map((element, i) => (
            <Accordion
              key={i}
              handleCLick={() => handleClick(i)}
              question={element.question}
              icon={selected === i ? <Minus /> : <Plus />}
              accordionClass={
                selected === i ? "accordion accordion-content" : ""
              }
              activeClass={selected === i ? "active" : ""}
            >
              {selected === i && (
                <p className="m-0">{HTMLReactParser(contentList[i].answer)}</p>
              )}
            </Accordion>
          ))}
      </div>
    </div>
  );
}
