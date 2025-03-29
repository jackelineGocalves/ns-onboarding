import { getDeviceType } from "@/helpers/deviceType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OpenAccountProcess {
  currentStep: number;
  currentComponent: number;
  currentSubStep: number | null;
  currentVersion: string | undefined;
  currentPhaseName: string;
  currentSideBarSection: string;
}
interface ProcessStore {
  openAccountCurrentProcess: OpenAccountProcess;
  setOpenAccountCurrentProcess: any;
  stepsCompleated: number[];
  subStepsCompleated: number[];
  userPhasesHistory: UserProcessHistory;
  setUserPhasesHistory: (history: UserProcessHistory) => void;
}
export interface UserProcessHistory {
  currentSteps: number[];
  currentComponents: string[];
  currentSubSteps: (number | null)[];
}

export const useOpenAccountCurrentProcess = create<ProcessStore>()(
  persist(
    (set) => ({
      openAccountCurrentProcess: {
        currentStep: 1,
        currentComponent: 1,
        currentSubStep: null,
        currentVersion: getDeviceType(),
        currentPhaseName: "Contact Form",
        currentSideBarSection: "Contacts",
      },
      stepsCompleated: [],
      subStepsCompleated: [],
      userPhasesHistory: {
        currentSteps: [],
        currentComponents: [],
        currentSubSteps: [],
      },
      setOpenAccountCurrentProcess: (newState: OpenAccountProcess) =>
        set((state) => ({
          openAccountCurrentProcess: {
            ...state.openAccountCurrentProcess,
            ...newState,
          },
        })),
      setUserPhasesHistory: (history: UserProcessHistory) =>
        set({ userPhasesHistory: history }),
    }),
    {
      name: "OpenAccountCurrentProcess",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
