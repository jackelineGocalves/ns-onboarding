export const CMSImage = (uuid: string) =>
  `${process.env.NEXT_PUBLIC_CMS_ENDPOINT}/assets/${uuid}?access_token=${process.env.NEXT_PUBLIC_CMS_TOKEN}`;


// export const S3FilePdf = (uuid: string) =>
//   `${process.env.CMS_FILE_S3}/${uuid}.pdf`;
