import Header from "./Header";
import Btn from "./Btn";
import Facebook from "./icones/Facebook";
import Instagram from "./icones/Instagram";
import Linkedln from "./icones/Linkedln";
import Youtube from "./icones/Youtube";

type ErrorPageProps = {
  bgClass: string;
  img?: React.ReactElement;
  principalText: string;
  tag?: string;
  showBtn?: boolean;
  titleClass?: string;
};

export default function ErrorPage({bgClass, img, principalText, tag, showBtn, titleClass}: ErrorPageProps) {
    return (
      <>
        <div className={bgClass}>
          <div className="header-error">
            <Header
              bgTextClass={"bgc-primary-800 text-white"}
              logoColor={"white"}
            />
          </div>

          <div className="error-content d-flex flex-column justify-content-center  align-items-center">
            {img && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="img-error  img-fluid  ">{img}</div>
              </div>
            )}

            <div className="error-text d-flex flex-column align-items-center text-center container">
              <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                <h1 className={`text-white m-0 ${titleClass}`}>
                  {principalText}.
                </h1>
                {tag && <p className="text-white m-0">{tag}</p>}
              </div>

              {showBtn && (
                <div>
                  <a href="/">
                    <Btn btnClass="btn btn-primary">Go to the homepage</Btn>
                  </a>
                </div>
              )}
            </div>
          </div>

          <footer className="error-page-footer">
            <div className="social-media-logos d-flex justify-content-center">
              <Facebook />
              <Instagram />
              <Linkedln />
              <Youtube />
            </div>
          </footer>
        </div>
      </>
    );
  }




