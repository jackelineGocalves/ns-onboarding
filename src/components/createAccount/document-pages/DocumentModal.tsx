import Btn from "@/components/Btn";
import { Modal } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import ControlPdfPanel from "./ControlPdfPanel";
import Close from "@/components/icones/Close";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentModal({
  show,
  onHide,
  onClick,
  fileURL,
  documentsReaded,
  ...props
}: {
  show: boolean;
  onHide: () => void;
  onClick: () => void;
  fileURL: string;
  documentsReaded: boolean;
}) {
  const [scale, setScale] = useState<number>(1.0);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBtnActive, setIsBtnActive] = useState<boolean>(documentsReaded);

  // Mutable reference to the container element housing the PDF document
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    // Update page number when scroll position changes
    const handleScroll = () => {
      if (containerRef.current && numPages) {
        // Obtain the current scroll position within the container
        const scrollTop = containerRef.current.scrollTop;
        // Determine the visible height of the container
        const clientHeight = containerRef.current.clientHeight;
        // Retrieve the total height of the container's content
        const scrollHeight = containerRef.current.scrollHeight;

        // Calculate the average height of a single page
        const pageHeight = scrollHeight / numPages;
        // Calculate the position where the bottom of the scroll is at or beyond the end
        const bottomScrollPosition = scrollHeight - clientHeight;

        // Calculate the current page number based on scroll position and page height
        let newPageNumber =
          Math.floor((scrollTop + clientHeight) / pageHeight) + 1;

        //Ensure the new page number is within valid range
        newPageNumber = Math.min(newPageNumber, numPages);
        // Update the state to reflect the current page
        setPageNumber(newPageNumber);

        // Check if the current scroll position is at or beyond the bottom
        if (scrollTop >= bottomScrollPosition - 10) {
          setIsBtnActive(true);
        }
      }
    };

    // Add a scroll event listener to the container
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    // Cleanup: remove the event listener when component unmounts
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [numPages, onClick, onHide]);

  // Get the total number of pages
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const handleDownload = () => {
    window.open(fileURL, "_blank");
  };

  const handleNextPage = () => {
    if (numPages != null && pageNumber < numPages) {
      setPageNumber((prevPage) => prevPage + 1);
      if (containerRef.current) {
        const pageHeight = containerRef.current.scrollHeight / numPages;
        containerRef.current.scrollTop += pageHeight;
      }
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
      if (containerRef.current) {
        if (numPages != undefined) {
          const pageHeight = containerRef.current.scrollHeight / numPages;
          containerRef.current.scrollTop -= pageHeight;
        }
      }
    }
  };

  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      animation={true}
      centered
      dialogClassName="pdf-modal"
    >
      <Modal.Header className="border-0 pb-4 mb-2 p-0 pb-md-4 mb-md-0 d-flex justify-content-end">
        <div className="modal-header-close">
          <Close onClick={onHide} />
        </div>
      </Modal.Header>
      <Modal.Body className="p-0 overflow-hidden">
        <div className="pdf-card bgc-primary-50" ref={containerRef}>
          <ControlPdfPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            previousPage={handlePreviousPage}
            nextPage={handleNextPage}
            actualPage={pageNumber}
            handleDownload={handleDownload}
          />
          <div className="pdf-reader m-auto">
            <Document
              className={"d-flex flex-column gap-4"}
              file={fileURL}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <>
                {[...Array(numPages)].map((_, index) => (
                  <Page
                    loading={isLoading}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={scale}
                    renderTextLayer={false}
                  />
                ))}
              </>
            </Document>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 p-0 d-flex justify-content-between gap-3 gap-sm-0 pt-3 mt-1 pt-md-5 mt-md">
        <span className="caption">
          *Read until the end to accept and proceed
        </span>
        <Btn
          btnClass="btn-modal btn btn-primary"
          onClick={onClick}
          disabled={!isBtnActive}
        >
          Accept
        </Btn>
      </Modal.Footer>
    </Modal>
  );
}
