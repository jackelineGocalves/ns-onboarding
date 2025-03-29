"use client";
import CarrosselCard from "./CarrosselCard";
import { useEffect, useRef, useState } from "react";
import Btn from "../Btn";
import ArrowRight from "../icones/ArrowRight";
import HTMLReactParser from "html-react-parser/lib/index";

let interval: any = null;

interface CarrosselCardsContent {
  title: string;
  description: string;
  image: string;
  id: number;
  button?: string;
  link: string | undefined;
  external?: boolean;
  image_active: string;
}

export default function CarrosselContainer({
  contentList,
  sectionTitle,
}: {
  contentList: CarrosselCardsContent[] | undefined;
  sectionTitle: React.ReactNode;
}) {
  const activeIndex = useRef<number>(1);
  const [isActive, setIsActive] = useState<number>(1);

  function handleCLick(index: number) {
    setIsActive(index);
    clearInterval(interval);
  }

  useEffect(() => {
    interval = setInterval(() => {
      if (contentList) {
        if (activeIndex.current < contentList.length) {
          activeIndex.current += 1;
          setIsActive(activeIndex.current);
        } else {
          activeIndex.current = 1;
          setIsActive(activeIndex.current);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [contentList]);

  let activeCardIndex = isActive;

  return (
    <>
      <div className="container-xl pb-4 mb-0 pb-md-4 mb-md-2">
        <h2 className="px-4 pb-4 py-2 py-md-4 my-md-3 text-center">
          {sectionTitle}
        </h2>
        <div className="row">
          <div className="col-lg-6 col-sm-12 pb-4">
            <div className="row row-cols-md-2 g-4">
              {contentList && (
                <>
                  {contentList.map((element, i) => (
                    <CarrosselCard
                      key={i}
                      classCard={`${
                        element.id === activeCardIndex ? "active" : ""
                      }`}
                      img={
                        element.id === activeCardIndex
                          ? element.image_active
                          : element.image
                      }
                      handleCLick={() => handleCLick(element.id)}
                      isActive={element.id === activeIndex.current}
                      index={element.id}
                    >
                      {" "}
                      {element.title}{" "}
                    </CarrosselCard>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 position-relative">
            {contentList && (
              <>
                <p className="carrossel-index">
                  {" "}
                  {contentList[isActive - 1].id}
                </p>
                <div className="carrossel-content pt-4 mt-0 pb-4 mb-0 mt-md-3 ps-md-4 ps-md-2 px-md-4">
                  <h3 className="txt-secondary-600 pb-3">
                    {contentList[isActive - 1].title}
                  </h3>
                  <span className="mb-0 ms-">
                    {HTMLReactParser(contentList[isActive - 1].description)}
                  </span>

                  {contentList[isActive - 1].button && (
                    <div className="carrossel-btns">
                      <a
                        href={contentList[isActive - 1].link || "#"}
                        target={
                          contentList[isActive - 1].external
                            ? "_blank"
                            : "_self"
                        }
                      >
                        <Btn btnClass="btn btn-secondary">
                          {contentList[isActive - 1].button}{" "}
                          {<ArrowRight classimg="icon-btn-size16" />}
                        </Btn>
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
