import Close from "@/components/icones/Close";
import QRcode from "@/components/illustrations/QRcode";
import { Modal } from "react-bootstrap";

export default function QRcodeModal({
  show,
  onHide,
  ...props
}: {
  show: boolean;
  onHide: () => void;
}) {
  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      animation={true}
      centered
      dialogClassName="modal-70w"
    >
      <Modal.Header className="border-0 pb-4 mb-2 p-0 pb-md-4 mb-md-0 d-flex justify-content-end">
        <div className="modal-header-close">
          <Close onClick={onHide} />
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <h3 className="text-center m-0">Scan de QR Code</h3>
        <div className="pt-3 text-center">
          <span>
            Through your mobile phone camera scan the QR Code to photograph your
            ID card there.
          </span>
        </div>
        <div className="d-flex justify-content-center">
          <QRcode />
        </div>
      </Modal.Body>
      <Modal.Footer className=" border-0 p-0 d-flex justify-content-between gap-3 gap-sm-0"></Modal.Footer>
    </Modal>
  );
}
