import OpenAccountMethods from "./OpenAccountMethods";
import VideoCall from "../illustrations/VideoCall";

interface openAccountMethodsCards {
  title: string;
  description: string;
  duration: string;
  image: string;
}

export default function OpenAccountMethodsContainer({
  contentList,
  sectionTitle,
  ...props
}: {
  contentList: openAccountMethodsCards[] | undefined;
  sectionTitle: React.ReactNode;
}) {
  return (
    <div className="container-xl pb-4 mb-0 pb-md-4 mb-md-2" {...props}>
      <h2 className="text-center txt-primary-900 m-0 p-4 m-0 p-md-4 m-md-3">
        {sectionTitle}
      </h2>
      <div className="row">
        {contentList &&
          contentList.map((element: openAccountMethodsCards, i: number) => (
            <div
              key={i}
              className="col-lg-6 d-flex gap-4 pb-3 mb-1 mb-lg-0 pb-lg-0"
            >
              <>
                <OpenAccountMethods
                  methodClass={i == 1 ? "card-method active" : "card-method"}
                  duration={element.duration}
                  method={element.title}
                  info={element.description}
                  img={element.image}
                />
              </>
            </div>
          ))}
      </div>
    </div>
  );
}
