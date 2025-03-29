"use client";
import { useOpenAccountCurrentProcess } from "@/store/useShowCurrentComponent";
import NavElement from "./NavELement";
import { useEffect, useState } from "react";
import { SideNavLayoutProps } from "@/types/types";

export default function NavElementContainer({
  navElementsList,
  handleSideNav,
  stepsCompleated,
  subStepsCompleated,
  processHistory,
  goToChooseAccountPhase,
  goToMultiholdersPhase,
  goToValidateIdentityPhase,
  goToConclusionPhase,
  goToIDcardValidation,
  goToAddressValidation,
  goToValidateJobSituation,
  goToVideoCall,
  openAccountCurrentProcess,
}: SideNavLayoutProps) {
  const [lastCurrentComponent, setLastCurrentComponent] = useState<
    string | undefined
  >(
    processHistory.currentComponents.at(
      processHistory.currentComponents.length - 1
    )
  );
  const setOpenAccountCurrentProcess = useOpenAccountCurrentProcess(
    (state) => state.setOpenAccountCurrentProcess
  );
  const setUserPhasesHistory = useOpenAccountCurrentProcess(
    (state) => state.setUserPhasesHistory
  );

  //Hook to update the last component the client was in
  useEffect(() => {
    setLastCurrentComponent(
      processHistory.currentComponents.at(
        processHistory.currentComponents.length - 1
      )
    );
  }, [processHistory.currentComponents]);

  //Function to update the currentComponent to the last component where the user was and update the currentStep to the index of the element that was clicked
  const goToLastCurrentComponent = (i: number) => {
    //If the list includes i, the function is not executed, since this function is only for steps that are not completed
    if (
      !stepsCompleated.includes(i + 2) &&
      processHistory.currentSteps.includes(i + 2)
    ) {
      if (lastCurrentComponent != undefined) {
        setOpenAccountCurrentProcess({
          currentComponent: lastCurrentComponent,
        });
        setUserPhasesHistory({
          currentSteps: [...processHistory.currentSteps, i + 2],
          currentComponents: [
            ...processHistory.currentComponents,
            lastCurrentComponent,
          ],
          currentSubSteps: [
            ...processHistory.currentSubSteps,
            ...processHistory.currentSubSteps,
          ],
        });
      }
    }
  };

  return (
    <div className="nav-elements nav-border">
      {navElementsList.map((navElement: any, i: number) => (
        <NavElement
          key={"step" + i}
          icon={navElement.icon}
          text={navElement.title}
          stepsCompleated={stepsCompleated}
          activeIndex={i + 2}
          changeIconStroke={
            openAccountCurrentProcess.currentStep !== i + 2 ? true : false
          }
          processHistory={processHistory}
          onClick={
            (openAccountCurrentProcess.currentStep === i + 2
              ? handleSideNav
              : undefined) ||
            (stepsCompleated.includes(navElement.id - 1) &&
            i + 1 == 1 &&
            openAccountCurrentProcess.currentStep !== i + 2
              ? goToChooseAccountPhase
              : undefined) ||
            (stepsCompleated.includes(navElement.id - 1) &&
            i + 1 == 2 &&
            openAccountCurrentProcess.currentStep !== i + 2
              ? goToMultiholdersPhase
              : undefined) ||
            (stepsCompleated.includes(navElement.id - 1) &&
            i + 1 == 3 &&
            openAccountCurrentProcess.currentStep !== i + 2
              ? goToValidateIdentityPhase
              : undefined) ||
            (stepsCompleated.includes(navElement.id - 1) &&
            i + 1 == 4 &&
            openAccountCurrentProcess.currentStep !== i + 2
              ? goToConclusionPhase
              : undefined) ||
            (openAccountCurrentProcess.currentStep !== navElement.id - 1
              ? () => goToLastCurrentComponent(i)
              : undefined)
          }
          elementClass={`
              ${stepsCompleated.includes(i + 2) ? "filled cursor-pointer" : ""} 
              ${
                openAccountCurrentProcess.currentStep === i + 2
                  ? "active cursor-pointer"
                  : ""
              }
              ${
                processHistory.currentSteps.includes(i + 2)
                  ? "filled cursor-pointer"
                  : ""
              }
          `}
        >
          {navElement.sub_steps &&
            openAccountCurrentProcess.currentStep == i + 2 && (
              <>
                {navElement.sub_steps.map((elem: any, j: number) => (
                  <>
                    <span
                      onClick={
                        (openAccountCurrentProcess.currentSubStep == j + 1
                          ? handleSideNav
                          : undefined) ||
                        (subStepsCompleated.includes(1) && j + 1 == 1
                          ? goToIDcardValidation
                          : undefined) ||
                        (subStepsCompleated.includes(2) && j + 1 == 2
                          ? goToAddressValidation
                          : undefined) ||
                        (subStepsCompleated.includes(3) && j + 1 == 3
                          ? goToValidateJobSituation
                          : undefined) ||
                        (subStepsCompleated.includes(4) && j + 1 == 4
                          ? goToVideoCall
                          : undefined)
                      }
                      key={"sub-step" + j}
                      className={` validation-element pt-3
                            ${
                              openAccountCurrentProcess.currentSubStep !==
                                j + 1 && subStepsCompleated.includes(j + 1)
                                ? "filled cursor-pointer"
                                : ""
                            }
                            ${
                              openAccountCurrentProcess.currentSubStep == j + 1
                                ? "active cursor-pointer"
                                : ""
                            }
                            ${
                              openAccountCurrentProcess.currentSubStep !==
                                j + 1 &&
                              processHistory.currentSubSteps.includes(j + 1)
                                ? "filled"
                                : ""
                            }
                        `}
                    >
                      {elem}
                    </span>
                  </>
                ))}
              </>
            )}
        </NavElement>
      ))}
    </div>
  );
}
