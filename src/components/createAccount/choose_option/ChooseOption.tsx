import ChooseCard from "@/components/ChooseCard";
import WorkingAtHome from "@/components/illustrations/WorkingAtHome";
import WorkingRemotely from "@/components/illustrations/WorkingRemotely";
import CurrentSectionBtns from "../CurrentSectionBtns";
import { ChooseOptionProps } from "@/types/types";

export interface ChooseOption {
  tag: string | undefined;
  title: string | undefined;
  duration: string | undefined;
}

export default function ChooseOption({
  previousPhase,
  nextPhase,
  clientContent,
  title,
}: ChooseOptionProps) {
  return (
    <div className="container-xl px-3 px-md-0">
      <div className="row h-100 justify-content-center">
        <div className="col-12 col-sm-12 col-md-11 col-xl-10 col-xxl-10">
          <div className="d-flex flex-column justify-content-between d-md-block h-100">
            <div>
              <h2 className="current-section-title text-center">{title}</h2>
              <div className="row row-cols-1 row-cols-md-2 gap-4 gap-md-0 d-flex justify-content-center">
                <ChooseCard
                  tag={
                    clientContent &&
                    clientContent.length > 0 &&
                    clientContent[0].tag
                      ? clientContent[0].tag
                      : "Online"
                  }
                  option={
                    clientContent &&
                    clientContent.length > 0 &&
                    clientContent[0].title
                      ? clientContent[0].title
                      : "VideoCall"
                  }
                  duration={
                    clientContent &&
                    clientContent.length > 0 &&
                    clientContent[0].duration
                      ? clientContent[0].duration
                      : "40 min"
                  }
                  img={<WorkingAtHome classimg="choose-card-img" />}
                  onClick={nextPhase}
                ></ChooseCard>
                <ChooseCard
                  tag={
                    clientContent &&
                    clientContent.length > 1 &&
                    clientContent[1].tag
                      ? clientContent[1].tag
                      : "Online"
                  }
                  option={
                    clientContent &&
                    clientContent.length > 1 &&
                    clientContent[1].title
                      ? clientContent[1].title
                      : "Digital Key"
                  }
                  duration={
                    clientContent &&
                    clientContent.length > 1 &&
                    clientContent[1].duration
                      ? clientContent[1].duration
                      : "20 min"
                  }
                  img={<WorkingRemotely classimg="choose-card-img" />}
                  onClick={nextPhase}
                ></ChooseCard>
              </div>
            </div>
            <div className="d-none d-md-block">
              <CurrentSectionBtns
                showGoBackBtn={true}
                previousComponent={previousPhase}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
