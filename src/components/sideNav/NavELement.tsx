import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { UserProcessHistory } from "@/store/useShowCurrentComponent";

type NavElementProps = {
  elementClass?: string;
  icon: any;
  text: string;
  children?: ReactNode;
  onClick?: () => void;
  stepsCompleated?: number[];
  changeIconStroke?: boolean;
  activeIndex?: number;
  processHistory: UserProcessHistory;
};

export default function NavElement({
  elementClass,
  icon,
  text,
  onClick,
  children,
  stepsCompleated,
  changeIconStroke,
  activeIndex,
  processHistory,
}: NavElementProps) {
  const [modifiedIcon, setModifiedIcon] = useState<string>();

  useEffect(() => {
    fetch(icon)
      .then((response) => response.text())
      .then((icon) => {
        // Once the icon text is obtained
        if (icon.includes("svg")) {
          // If the icon is an SVG, a DOM parser is created to parse it
          const parser = new DOMParser();
          // Icon text is parsed as XML with type "image/svg+xml"
          const svgDOM = parser.parseFromString(icon, "image/svg+xml");
          // Modify Stroke
          svgDOM.querySelectorAll("path").forEach((pathElement) => {
            pathElement.setAttribute("stroke", "#888A8B");
          });
          // Converts the modified SVG back to a text string
          const iconModified = new XMLSerializer().serializeToString(svgDOM);
          setModifiedIcon(iconModified);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [icon]);

  return (
    <>
      <div className="nav-elements-container d-flex flex-column">
        <div onClick={onClick} className={`nav-element ${elementClass}`}>
          <div className="nav-icon">
            {modifiedIcon && typeof icon == "string" && (
              <Image
                src={
                  changeIconStroke &&
                  activeIndex &&
                  !stepsCompleated?.includes(activeIndex) &&
                  !processHistory.currentSteps.includes(activeIndex)
                    ? `data:image/svg+xml;base64,${btoa(modifiedIcon)}`
                    : icon
                }
                alt="icon"
                width={0}
                height={0}
                className="h-100 w-100 object-fit-cover img-fluid"
              />
            )}
            {typeof icon !== "string" && <div>{icon}</div>}
          </div>
          <div className="nav-text btn-font">{text}</div>
        </div>

        {children && (
          <div className="validation-method d-flex flex-column btn-font txt-primary-500">
            {children}
          </div>
        )}
      </div>
    </>
  );
}
