export interface PersonalInfoObject {
    label: string;
    placeHolder?: string;
    type: string;
    name: string;
    textLink?: string;
    isRequired?: boolean
}

const contentForm : PersonalInfoObject[] = [
    {
      label: "Full name",
      placeHolder: "Fill this space with your full name",
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      placeHolder: "Fill this space with your email address",
      type: "text",
      name: "email",
    },
    {
      label: "Phone Number",
      placeHolder: "Fill this space with your phone",
      type: "tel",
      name: "phoneNumber",
    },
    {
      label: "Read and Accept",
      type: "checkbox",
      name: "checkbox",
      textLink: "Privacy Policity",
    },
];

export default contentForm;

