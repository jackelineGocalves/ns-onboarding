import AccountsNav from "@/components/icones/sideNav/AccountsNav";

export interface navElementsListObject {
  id: number;
  icon: React.ReactElement;
  title: string;
  sub_steps?: string[];
}

export type OpenAccountProps = {
  headerText: string;
  navElementsListTest: navElementsListObject[];
};

export const navElementsList = [
  {
    id: 1,
    icon: <AccountsNav />,
    title: "Contacts",
  },
  {
    id: 2,
    icon: <AccountsNav />,
    title: "Choose your Account",
  },
  {
    id: 3,
    icon: <AccountsNav />,
    title: "MultiHolders",
  },
  {
    id: 4,
    icon: <AccountsNav />,
    title: "Validate Identity",
    sub_steps: ["1", "2", "3", "4"],
  },
  {
    id: 5,
    icon: <AccountsNav />,
    title: "Personal Information",
  },
];

export const openAccountPhases = [
  {
    id: 1,
    name: "Contacts",
    components: [
      {
        id: 1,
        name: "Contact Form",
        version: "both",
      },
      {
        id: 2,
        name: "OTP phone",
        version: "both",
      },
      {
        id: 3,
        name: "OTP email",
        version: "both",
      },
    ],
  },
  {
    id: 2,
    name: "Choose Account",
    components: [
      {
        id: 1,
        name: "Choose Account type",
        version: "both",
      },
      {
        id: 2,
        name: "Choose DK/VC Option",
        version: "both",
      },
      {
        id: 3,
        name: "Read Terms & Conditions",
        version: "both",
      },
    ],
  },
  {
    id: 3,
    name: "Multiholders",
    components: [
      {
        id: 1,
        name: "Choose add Multiholders",
        version: "both",
      },
      {
        id: 2,
        name: "Multiholders Form",
        version: "both",
      },
      {
        id: 3,
        name: "Invitation Message",
        version: "both",
      },
    ],
  },
  {
    id: 4,
    name: "Validate Identity",
    subSteps: [
      {
        id: 1,
        name: "Validate ID Card",
        components: [
          {
            id: 1,
            name: "Choose Validation ID option",
            version: "desktop",
          },
          {
            id: 2,
            name: "Turn on Camera ID Card",
            version: "both",
          },
          {
            id: 3,
            name: "ID Card",
            version: "both",
          },
          {
            id: 4,
            name: "Validation ID Message",
            version: "both",
          },
          {
            id: 5,
            name: "Show ID information",
            version: "both",
          },
        ],
      },
      {
        id: 2,
        name: "address",
        components: [
          {
            id: 1,
            name: "Choose Validate address Option",
            version: "desktop",
          },
          {
            id: 2,
            name: "Turn on Camera address",
            version: "mobile",
          },
          {
            id: 3,
            name: "Validate address",
            version: "mobile",
          },
          {
            id: 4,
            name: "Drag and Drop address",
            version: "desktop",
          },
          {
            id: 5,
            name: "Validate address Message",
            version: "mobile",
          },
          {
            id: 6,
            name: "Show address Information",
            version: "both",
          },
        ],
      },
      {
        id: 3,
        name: "Job Situation",
        components: [
          {
            id: 1,
            name: "Choose Validate Job Sitation Option",
            version: "desktop",
          },
          {
            id: 2,
            name: "Turn on Camera Job Situation",
            version: "mobile",
          },
          {
            id: 3,
            name: "Validate Job Situation",
            version: "mobile",
          },
          {
            id: 4,
            name: "Drag and Drop Job Situation",
            version: "desktop",
          },
          {
            id: 5,
            name: "Validate Job Sitiation Message",
            version: "mobile",
          },
          {
            id: 6,
            name: "Show Job Situation Information",
            version: "both",
          },
        ],
      },
      {
        id: 4,
        name: "VideoCall",
        components: [
          {
            id: 1,
            name: "Message",
            version: "both",
          },
          {
            id: 2,
            name: "Schedule Interview",
            version: "both",
          },
          {
            id: 3,
            name: "videoCall",
            version: "both",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Conclusion",
    components: [
      {
        id: 1,
        name: "Multiholder Information",
        version: "both",
      },
      {
        id: 2,
        name: "Sign Contract",
        version: "both",
      },
      {
        id: 3,
        name: "Conclusion Screen",
        version: "both",
      },
    ],
  },
];
