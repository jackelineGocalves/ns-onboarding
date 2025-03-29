import ErrorAlert from "@/components/icones/ErrorAlert";

export interface AccountsPresentationObject {
  id: number;
  img: string;
  accountDesingnation: string;
  title: string;
  info: string;
  detailsBtn: string;
  modalBtn: string;
  sectionTitle?: string;
  modalContent?: clientModalAccountListObject;
}

export interface openAccountRequeriments {
  id: number;
  requerimentType: string;
  conditions: string[];
}

export interface clientModalAccountListObject {
  id: number;
  modalTitle: string;
  text: string;
  requeriments: openAccountRequeriments[];
  btns: btnsObject;
}

export interface btnsObject {
  btn1: string;
  btn2: string;
}

export const clientAccountsList: AccountsPresentationObject[] = [
  {
    id: 1,
    img: "/account_presentation_img.jpg",
    accountDesingnation: "Kid’s Account",
    title: "Account ABC",
    info: "Receive 4% TANB per year and win 10% of Cashback with your credit card.",
    detailsBtn: "See Details",
    modalBtn: "Open Account",
    modalContent: {
      id: 1,
      modalTitle: "Conditions you must fulfil to open this account",
      text: "To open this account you must fulfil all the requirements. Read carefully our requirements and see if this is the account for you",
      requeriments: [
        {
          id: 1,
          requerimentType: "Documents needed",
          conditions: ["ID Card", "Address certification"],
        },
        {
          id: 2,
          requerimentType: "Coondition needed",
          conditions: [
            "You must be at least 18",
            "Portugueses nationality",
            "Open account for personal use",
            "Can’t be politically exposed or close to anyone who is",
            "Transfer at least 100€",
            "Be a college student",
          ],
        },
      ],
      btns: {
        btn1: "I don’t fulfil all the requirements",
        btn2: "I fulfil all the requirements",
      },
    },
  },
  {
    id: 2,
    img: "/account_presentation_img.jpg",
    accountDesingnation: "Student Account",
    title: "Account ABC",
    info: "Receive 4% TANB per year and win 10% of Cashback with your credit card.",
    detailsBtn: "See Details",
    modalBtn: "Open Account",
    modalContent: {
      id: 2,
      modalTitle: "Second modal conditions",
      text: "Test",
      requeriments: [
        {
          id: 1,
          requerimentType: "Documents needed",
          conditions: ["ID Card", "Address certification"],
        },
        {
          id: 2,
          requerimentType: "Coondition needed",
          conditions: [
            "You must be at least 18",
            "Portugueses nationality",
            "Open account for personal use",
            "Can’t be politically exposed or close to anyone who is",
            "Transfer at least 100€",
            "Be a college student",
          ],
        },
      ],
      btns: {
        btn1: "I don’t fulfil all the requirements",
        btn2: "I fulfil all the requirements",
      },
    },
  },
  {
    id: 3,
    img: "/homepageImage.jpg",
    accountDesingnation: "Kid’s Account",
    title: "Account ABC",
    info: "Receive 4% TANB per year and win 10% of Cashback with your credit card.",
    detailsBtn: "See Details",
    modalBtn: "Open Account",
    modalContent: {
      id: 3,
      modalTitle: "Conditions you must fulfil to open this account",
      text: "To open this account you must fulfil all the requirements. Read carefully our requirements and see if this is the account for you",
      requeriments: [
        {
          id: 1,
          requerimentType: "Documents needed",
          conditions: ["ID Card", "Address certification"],
        },
        {
          id: 2,
          requerimentType: "Coondition needed",
          conditions: [
            "You must be at least 18",
            "Portugueses nationality",
            "Open account for personal use",
            "Can’t be politically exposed or close to anyone who is",
            "Transfer at least 100€",
            "Be a college student",
          ],
        },
      ],
      btns: {
        btn1: "I don’t fulfil all the requirements",
        btn2: "I fulfil all the requirements",
      },
    },
  },
  {
    id: 5,
    img: "/homepageImage.jpg",
    accountDesingnation: "Kid’s Account",
    title: "Account ABC",
    info: "Receive 4% TANB per year and win 10% of Cashback with your credit card.",
    detailsBtn: "See Details",
    modalBtn: "Open Account",
    modalContent: {
      id: 5,
      modalTitle: "Conditions you must fulfil to open this account",
      text: "To open this account you must fulfil all the requirements. Read carefully our requirements and see if this is the account for you",
      requeriments: [
        {
          id: 1,
          requerimentType: "Documents needed",
          conditions: ["ID Card", "Address certification"],
        },
        {
          id: 2,
          requerimentType: "Coondition needed",
          conditions: [
            "You must be at least 18",
            "Portugueses nationality",
            "Open account for personal use",
            "Can’t be politically exposed or close to anyone who is",
            "Transfer at least 100€",
            "Be a college student",
          ],
        },
        {
          id: 3,
          requerimentType: "Coondition needed",
          conditions: [
            "You must be at least 18",
            "Portugueses nationality",
            "Open account for personal use",
            "Can’t be politically exposed or close to anyone who is",
            "Transfer at least 100€",
            "Be a college student",
          ],
        },
      ],
      btns: {
        btn1: "I don’t fulfil all the requirements",
        btn2: "I fulfil all the requirements",
      },
    },
  },
  {
    id: 6,
    img: "/homepageImage.jpg",
    accountDesingnation: "Kid’s Account",
    title: "Account ABC",
    info: "Receive 4% TANB per year and win 10% of Cashback with your credit card.",
    detailsBtn: "See Details",
    modalBtn: "Open Account",
    modalContent: {
      id: 6,
      modalTitle: "Conditions you must fulfil to open this account",
      text: "To open this account you must fulfil all the requirements. Read carefully our requirements and see if this is the account for you",
      requeriments: [
        {
          id: 1,
          requerimentType: "Documents needed",
          conditions: ["ID Card", "Address certification"],
        },
        {
          id: 2,
          requerimentType: "Coondition needed",
          conditions: [
            "You must be at least 18",
            "Portugueses nationality",
            "Open account for personal use",
            "Can’t be politically exposed or close to anyone who is",
            "Transfer at least 100€",
            "Be a college student",
          ],
        },
      ],
      btns: {
        btn1: "I don’t fulfil all the requirements",
        btn2: "I fulfil all the requirements",
      },
    },
  },
];


//ALERT 

export interface ChooseAccountAlertObject {
  title?: string
  text: string, 
  icon: React.ReactElement
}

export const chooseAccountAlertContent : ChooseAccountAlertObject = {
  title: "Cant´t open the selected account",
  text: "Try one of our other accounts",
  icon: <ErrorAlert classimg="alert icon size" />
}
