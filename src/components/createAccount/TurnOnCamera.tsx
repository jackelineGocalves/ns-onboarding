import Webcam from "react-webcam";
import Switch from "../Switch";
import { useState } from "react";

export default function TurnOnCamera({ nextPhase }: { nextPhase: () => void }) {
  const [cameraAuthorized, setCameraAuthorized] = useState(false);
  
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      const timer = setTimeout(() => {
        nextPhase();
      }, 1500);
      return () => clearTimeout(timer);
    }
  };

  const handleUserMedia = () => {
    // window.location.reload();
    setCameraAuthorized(true);
  }

  return (
    <div className="d-flex flex-column justify-content-between validation-screen-height">
      <div className="text-white h-100 d-flex flex-column justify-content-center">
        <h2 className="pb-4 mb-3 text-center">
          Turn on your camera and follow our instructions
        </h2>

        <div className="mb-4">
          <span className="txt-secondary-500">But before make sure that:</span>
          <ul className="mb-0 mt-3 d-none d-md-block">
            <li>
              Your device has a camera or that a camera is connected to your
              device
            </li>
            <li>
              Your environment has enough light for your card to be legible
            </li>
            <li>Your device is working correctly</li>
          </ul>
          <ul className="mb-0 mt-3 d-block d-md-none">
            <li>
              Your environment has enough light for your card to be legible
            </li>
            <li>Your device is working correctly</li>
          </ul>
        </div>
      </div>

      <div className="m-auto">
        <span className="d-flex align-items-center text-white">
          <Switch
            onChange={handleSwitchChange}
            isDisabled={!cameraAuthorized} 
          />
          <p className="ps-2 ms-1 my-0">Turn on your camera</p>
        </span>
      </div>

      <div className="d-none">
        <Webcam
          onUserMedia={handleUserMedia}
        />
      </div>
    </div>
  );
}
