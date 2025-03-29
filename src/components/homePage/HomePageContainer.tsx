import HomePage from "./HomePage";
import FullWidthImg from "../illustrations/FullWidthImg";
import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser/lib/index";
import Image from "next/image";

interface Presentation {
  title: string;
  description: string;
  image: string;
  tag: string;
  invitation_tag: string;
  open_account_button?: string | null;
  return_button?: string | null;
  invitation_button?: string | null;
}

export default function HomePageContainer({
  contentList,
}: {
  contentList: Presentation | undefined;
}) {
  return (
    <>
      <div className="container-xl py-3 py-md-0">
        <div className="d-flex flex-column-reverse flex-lg-row gap-4 gap-md-0">
          {contentList && (
            <>
              <div className="col-lg-5 d-flex flex-column justify-content-center">
                <HomePage
                  tag={contentList.tag}
                  title={HTMLReactParser(contentList.title)}
                  description={HTMLReactParser(contentList.description)}
                  principalBtn={
                    contentList.open_account_button
                      ? contentList.open_account_button
                      : "Open Account"
                  }
                  secondBtn={
                    contentList.return_button
                      ? contentList.return_button
                      : "Return to process"
                  }
                  invitation_tag={contentList.invitation_tag}
                  thirdBtn={
                    contentList.invitation_button
                      ? contentList.invitation_button
                      : "Open here"
                  }
                />
              </div>

              <div className="col-lg-7 py-md-4">
                <Image
                  src={contentList.image}
                  alt="Homepage Image"
                  width={400}
                  height={400}
                  className="img-fluid object-fit-cover w-100 ps-0 ps-lg-5"
                  priority={true}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="full-width-img container-fluid py-4 my-0 py-md-4 my-md-3 py-lg-4 my-lg-2 px-0 w-100">
        {" "}
        <FullWidthImg />{" "}
      </div>
    </>
  );
}
