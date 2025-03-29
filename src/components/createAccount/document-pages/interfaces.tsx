export interface clientDocumentsListObject {
  sectionTitle: string;
  cardsContent: cardsContentObject[];
}

export interface cardsContentObject {
  id: number;
  tag: string;
  title: string;
  pdfURL: string;
}

export const clientDocumentsList: clientDocumentsListObject = {
  sectionTitle: "Read carefully our conditions",
  cardsContent: [
    {
      id: 1,
      tag: "Terms & Conditions",
      title: "Account Conditions",
      pdfURL:
        "https://s24.q4cdn.com/360159192/files/doc_downloads/politiques_et_clauses_contractuelles/SFTC_for_Goods.July_5_2017_English_ES-ES.pdf",
    },
    {
      id: 2,
      tag: "Terms & Conditions",
      title: "Debit Card Conditions",
      pdfURL:
        "https://s24.q4cdn.com/360159192/files/doc_downloads/politiques_et_clauses_contractuelles/SFTC_for_Goods.July_5_2017_English_ES-ES.pdf",
    },
  ],
};
