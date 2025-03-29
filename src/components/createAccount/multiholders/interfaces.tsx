export interface MultiHolders {
  sectionTitle: string;
  successTitle: string;
  successMsg: string;
  errorTitle: string;
  errorMsg: React.ReactNode;
}

export const MultiHoldersClientContent: MultiHolders = {
  sectionTitle: "Add Holders",
  successTitle: "An invitation was sent to your holders",
  successMsg:
    "Your holders must have received an invitation to join this account as such they should select the link and fill the requested information.",
  errorTitle: "We couldn’t send an invitation to your holders",
  errorMsg: (
    <span>
      Something went wrong go back and check the information you inserted and
      try again. If this error keeps happening get in touch with us through
      <span style={{ color: "#00AC48" }}>
        {" "}
        <a> here.</a>{" "}
      </span>{" "}
    </span>
  ),
};
