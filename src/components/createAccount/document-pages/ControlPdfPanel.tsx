import ArrowLeft from "@/components/icones/ArrowLeft";
import ArrowRight from "@/components/icones/ArrowRight";
import Docmuent from "@/components/icones/Document";
import Download from "@/components/icones/Download";
import { ControlPdfPanelProps } from "@/types/types";

export default function ControlPdfPanel({
  scale,
  setScale,
  numPages,
  nextPage,
  previousPage,
  actualPage,
  handleDownload,
}: ControlPdfPanelProps) {
  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="control-panel bgc-primary-800 d-flex justify-content-between w-100 sticky-top">
      <div className="d-flex gap-2 align-items-center">
        <ArrowLeft className="cursor-pointer" onClick={previousPage} />
        <span>
          {actualPage} / {numPages}{" "}
        </span>
        <ArrowRight classimg="icon-24 cursor-pointer" onClick={nextPage} />
      </div>
      <div className="d-flex gap-4 align-items-center">
        <div className="d-flex gap-2 align-items-center ">
          <Docmuent classimg="icon-24 cursor-pointer" onClick={zoomOut} />
          <span>{(scale * 100).toFixed()}%</span>
          <Docmuent classimg="icon-24 cursor-pointer" onClick={zoomIn} />
        </div>

        <a onClick={handleDownload}>
          <Download className="icon-24 cursor-pointer" />
        </a>
      </div>
    </div>
  );
}
