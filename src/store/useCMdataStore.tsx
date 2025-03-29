import { create } from "zustand";
import { HomepageResponse } from "@/services/cms/models/homapage";
import { createJSONStorage, persist } from "zustand/middleware";
import { dataDecrypt, dataEncrypt } from "@/helpers/encryptation";

interface CMSdata {
    homepageData: HomepageResponse | undefined;
    openAccountData: any | undefined,
}

interface Actions {
    setHomepageData: (data: HomepageResponse) => void;
    setOpenAccountData: (data: any) => void;
}

export const useCMSdata = create<CMSdata & Actions>((set, get) => ({
  homepageData: undefined,
  openAccountData: undefined,
  setHomepageData: (data: HomepageResponse) =>
    set(() => ({ homepageData: data })),
  setOpenAccountData: (data: any) =>
    set(() => ({ openAccountData: data })),
}));
