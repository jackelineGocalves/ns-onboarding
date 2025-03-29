import { useEffect } from "react";
import Success from "./illustrations/Success";
import { useRouter } from "next/navigation";

export default function Conclusion() {
  const router = useRouter();

  useEffect(() => {
    const sendToHomepage = () => {
      const timer = setTimeout(() => {
        router.push("./");
      }, 3000);
      return () => clearTimeout(timer);
    };

    const deleteData = () => {
      const timer = setTimeout(() => {
        handleDeleteSessionStorageData();
      }, 4000);
    };

    const handleDeleteSessionStorageData = () => {
      sessionStorage.removeItem("contactFormData");
      sessionStorage.removeItem("ChoosenAccount");
      sessionStorage.removeItem("documentsReaded");
      sessionStorage.removeItem("multiHoldersData");
      sessionStorage.removeItem("OpenAccountCurrentProcess");
    };
    sendToHomepage();
    deleteData();
  }, [router]);

  return (
    <>
      <div className="container-xl px-3 px-md-0">
        <div className="row h-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-10 col-xl-10 col-xxl-9">
            <div>
              <div className="d-flex justify-content-center">
                <Success classimg="status-img" />
              </div>

              <div className="d-grid gap-4">
                <h2 className="pt-3 mt-0 pt-md-4 mt-md-2 mb-0 text-center">
                  Congratulations! Your process has been completed successfully.
                </h2>
                <span className="status-msg text-md-center">
                  When all holders have done their process of creation
                  successfully each one will receive an email with the further
                  steps and the credentials to enter our digital channels.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
