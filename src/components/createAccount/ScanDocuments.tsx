import { useIDcardValidation } from "@/store/userAccountStore";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

export default function ScanDocuments({
  nextPhase,
}: {
  nextPhase: () => void;
}) {
  const videoConstraints = {
    width: 1280,
    height: window.innerHeight,
    facingMode: "user",
  };

  const webcamRef = useRef<any>(null);
  const [orientation, setOrientation] = useState<any>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [scannedText, setScannedText] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string>("");

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.screen.orientation.type);
    };

    // Detectar cambios de orientación
    window.addEventListener("orientationchange", handleOrientationChange);
    setOrientation(window.screen.orientation.type); // Obtener la orientación inicial

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [window.screen.orientation.type]);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameraAvailable(videoDevices.length > 0);
      } catch (e) {
        console.error("Error checking camera:", e);
        setCameraAvailable(false);
      }
    };
    checkCamera();
  }, []);

  const handleUserMedia = () => {
    setCameraActive(true);
  };

  const handleUserMediaError = () => {
    setCameraActive(false);
  };

  const [isValidatingSections, setIsvalidationSections] = useState(false);

  const [IDcardData, setIDcardData] = useState({
    name: "",
    surname: "",
    sex: "",
    birthDate: "",
    height: "",
    expiryDate: "",
    documentNumber: "",
    mothersName: "",
    fathersName: "",
  });

  const [croppedImages, setCroppedImages] = useState({
    name: "",
    surname: "",
    sex: "",
    birthDate: "",
    height: "",
    expiryDate: "",
    documentNumber: "",
    mothersName: "",
    fathersName: "",
  });

  const [validatedSections, setValidatedSections] = useState({
    name: false,
    surname: false,
    sex: false,
    birthDate: false,
    height: false,
    expiryDate: false,
    documentNumber: false,
    mothersName: false,
    fathersName: false,
  });

const adjustBrightnessContrastSaturation = (
  imageData: any,
  contrast : any,
  brightness : any,
  saturation : any
) => {
  const data = imageData.data;

  // Convertir brillo a un rango adecuado
  brightness = (brightness / 100) * 255;

  // Ajustar el contraste
  contrast = contrast / 100 + 1;
  const intercept = 128 * (1 - contrast);

  // Convertir saturación a un rango adecuado
  saturation = saturation / 100;

  for (let i = 0; i < data.length; i += 4) {
    // Ajustar brillo
    data[i] += brightness; // Red
    data[i + 1] += brightness; // Green
    data[i + 2] += brightness; // Blue

    // Ajustar contraste
    data[i] = data[i] * contrast + intercept; // Red
    data[i + 1] = data[i + 1] * contrast + intercept; // Green
    data[i + 2] = data[i + 2] * contrast + intercept; // Blue

    // Convertir de RGB a HSL
    let [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);

    // Ajustar la saturación
    if(s)
    s *= saturation;

    // Convertir de vuelta a RGB
    let [r, g, b] = hslToRgb(h, s, l);

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;

    // Clamping para asegurar que los valores se mantengan dentro de los límites válidos
    data[i] = Math.min(255, Math.max(0, data[i]));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1]));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2]));
  }

  return imageData;
};

// Función para convertir de RGB a HSL
function rgbToHsl(r : any, g : any, b : any) {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if(h)
    h /= 6;
  }

  return [h, s, l];
}

// Función para convertir de HSL a RGB
function hslToRgb(h : any, s : any, l : any) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p : any, q : any, t : any) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 3) return q;
      if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}



  const captureAndCropImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setIsvalidationSections(true);

    if (!imageSrc) return;

    const image = new Image();

    image.src = imageSrc; // Establece la URL de datos de la imagen capturada como la fuente de la nueva imagen.
    image.onload = () => {
      // Cuando la imagen se haya cargado completamente, ejecuta esta función.
      const canvas = document.createElement("canvas"); // Crea un nuevo elemento de canvas.
      const context = canvas.getContext("2d"); // Obtiene el contexto 2D del canvas para dibujar en él.

      if (!context) return;

      const frame = document.querySelector(".validation-frame") as HTMLElement;
      // Obtiene las dimensiones y la posición del frame relativo al viewport.
      const frameRect = frame.getBoundingClientRect();
      const webcamRect = webcamRef.current.video.getBoundingClientRect(); // Obtiene las dimensiones y la posición del video de la cámara relativo al viewport.

      // Calcula las escalas de la imagen capturada en relación con el tamaño del video de la cámara.
      const scaleX = image.width / webcamRect.width;
      const scaleY = image.height / webcamRect.height;

      // Calcula las coordenadas y dimensiones del recorte basado en la posición y tamaño del frame.
      const cropX = (frameRect.left - webcamRect.left) * scaleX;
      const cropY = (frameRect.top - webcamRect.top) * scaleY;
      const cropWidth = frameRect.width * scaleX;
      const cropHeight = frameRect.height * scaleY;

      // Establece las dimensiones del canvas para que coincidan con las del área a recortar.
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Dibuja la imagen recortada en el canvas.
      context.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0, // La coordenada  en el canvas donde colocar el recorte.
        0,
        cropWidth,
        cropHeight
      );

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData = adjustBrightnessContrastSaturation(imageData, 80, 20, 0); // Ajusta el contraste, brillo y saturación
    context.putImageData(imageData, 0, 0);

      // Convierte el contenido del canvas (la imagen recortada) en una URL de datos
      const croppedImageSrc = canvas.toDataURL("image/jpeg");
      setCroppedImage(croppedImageSrc);

      // Usa Tesseract para reconocer texto en la imagen recortada.
      Tesseract.recognize(croppedImageSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          console.log(text);
          if (confidence > 50) {
            setScannedText(text);
          }
          console.log(scannedText);
        })
        .catch((err) => {
          console.error("Error recognizing text:", err);
        });

      //_______________________________________________________________________

      // NAME-------------------

      const canvas2 = document.createElement("canvas");
      const context2 = canvas2.getContext("2d");

      if (!context2) return;
      canvas2.width = cropWidth * 0.43; // Ajuste proporcional
      canvas2.height = cropHeight * 0.15; // Ajuste proporcional

      context2.drawImage(
        canvas,
        // cropX * 0.4,
        cropX * 0.26,
        cropY * 0.9,
        cropWidth * 0.43,
        cropHeight * 0.15,
        0,
        0,
        canvas2.width,
        canvas2.height
      );

      const croppedNameImageSrc = canvas2.toDataURL("image/jpeg");

      setCroppedImages((prevData) => ({
        ...prevData,
        name: croppedNameImageSrc,
      }));

      Tesseract.recognize(croppedNameImageSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              name: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error recognizing name text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            name: true,
          }));
        });

      //SURNAME---------------------------------

      const surnameCanvas = document.createElement("canvas");
      const surnameContext = surnameCanvas.getContext("2d");

      if (!surnameContext) return;

      surnameCanvas.width = cropWidth * 0.43;
      surnameCanvas.height = cropHeight * 0.15;

      surnameContext.drawImage(
        canvas,
        // cropX * 0.4,
        cropX *  0.26,
        cropY * 0.55,
        cropWidth * 0.43,
        cropHeight * 0.15,
        0,
        0,
        surnameCanvas.width,
        surnameCanvas.height
      );

      const croppedSurnameImgSrc = surnameCanvas.toDataURL("image/jpeg");
      setCroppedImages((prevData) => ({
        ...prevData,
        surname: croppedSurnameImgSrc,
      }));

      Tesseract.recognize(croppedSurnameImgSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              surname: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error  recognizing surname text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            surname: true,
          }));
        });

      //SEX---------------------------------

      const sexCanvas = document.createElement("canvas");
      const sexContext = sexCanvas.getContext("2d");

      if (!sexContext) return;

      sexCanvas.width = cropWidth * 0.1;
      sexCanvas.height = cropHeight * 0.15;

      sexContext.drawImage(
        canvas,
        // cropX * 0.5,
        cropX * 0.25,
        cropY * 1.5,
        cropWidth * 0.1,
        cropHeight * 0.15,
        0,
        0,
        sexCanvas.width,
        sexCanvas.height
      );

      const croppedSexImgSrc = sexCanvas.toDataURL("image/jpeg");
      setCroppedImages((prevData) => ({
        ...prevData,
        sex: croppedSexImgSrc,
      }));

      Tesseract.recognize(croppedSexImgSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              sex: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error  recognizing sex text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            sex: true,
          }));
        });

      //HEIGHT---------------------------------

      const heightCanvas = document.createElement("canvas");
      const heightContext = heightCanvas.getContext("2d");

      if (!heightContext) return;

      heightCanvas.width = cropWidth * 0.1;
      heightCanvas.height = cropHeight * 0.15;

      heightContext.drawImage(
        canvas,
        // cropX * 0.68,
        cropX * 0.35,
        cropY * 1.5,
        cropWidth * 0.1,
        cropHeight * 0.15,
        0,
        0,
        heightCanvas.width,
        heightCanvas.height
      );

      const croppedHeightImgSrc = heightCanvas.toDataURL("image/jpeg");
      setCroppedImages((prevData) => ({
        ...prevData,
        height: croppedHeightImgSrc,
      }));

      Tesseract.recognize(croppedHeightImgSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              height: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error  recognizing height text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            height: true,
          }));
        });

      //BIRTH DATE---------------------------------

      const birthDateCanvas = document.createElement("canvas");
      const birthDateContext = birthDateCanvas.getContext("2d");

      if (!birthDateContext) return;

      birthDateCanvas.width = cropWidth * 0.32;
      birthDateCanvas.height = cropHeight * 0.1;

      birthDateContext.drawImage(
        canvas,
        // cropX * 1,
        cropX * 0.54,
        cropY * 1.5,
        cropWidth * 0.32,
        cropHeight * 0.1,
        0,
        0,
        birthDateCanvas.width,
        birthDateCanvas.height
      );

      const croppedBirthDateImgSrc = birthDateCanvas.toDataURL("image/jpeg");
      setCroppedImages((prevData) => ({
        ...prevData,
        birthDate: croppedBirthDateImgSrc,
      }));

      Tesseract.recognize(croppedBirthDateImgSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              birthDate: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error  recognizing birth date text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            birthDate: true,
          }));
        });

      //EXPIRY DATE---------------------------------

      const expiryDateCanvas = document.createElement("canvas");
      const expiryDateContext = expiryDateCanvas.getContext("2d");

      if (!expiryDateContext) return;

      expiryDateCanvas.width = cropWidth * 0.2;
      expiryDateCanvas.height = cropHeight * 0.1;

      expiryDateContext.drawImage(
        canvas,
        // cropX * 1.15,
        cropX * 0.58,
        // cropY * 2,
        cropY * 2,
        cropWidth * 0.2,
        cropHeight * 0.1,
        0,
        0,
        expiryDateCanvas.width,
        expiryDateCanvas.height
      );

      const croppedExpiryDateImgSrc = expiryDateCanvas.toDataURL("image/jpeg");
      setCroppedImages((prevData) => ({
        ...prevData,
        expiryDate: croppedExpiryDateImgSrc,
      }));

      Tesseract.recognize(croppedExpiryDateImgSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              expiryDate: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error  recognizing expiry date text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            expiryDate: true,
          }));
        });

      //DOCUMENT NUMBER---------------------------------

      const documentNumberCanvas = document.createElement("canvas");
      const documentNumberContext = documentNumberCanvas.getContext("2d");

      if (!documentNumberContext) return;

      documentNumberCanvas.width = cropWidth * 0.33;
      documentNumberCanvas.height = cropHeight * 0.1;

      documentNumberContext.drawImage(
        canvas,
        // cropX * 0.55,
        cropX * 0.26,
        cropY * 2,
        cropWidth * 0.33,
        cropHeight * 0.1,
        0,
        0,
        documentNumberCanvas.width,
        documentNumberCanvas.height
      );

      const croppedDocumentNumberImgSrc =
        documentNumberCanvas.toDataURL("image/jpeg");
      setCroppedImages((prevData) => ({
        ...prevData,
        documentNumber: croppedDocumentNumberImgSrc,
      }));

      Tesseract.recognize(croppedDocumentNumberImgSrc, "por")
        .then(({ data: { text, confidence } }) => {
          console.log(confidence);
          // if (confidence >= 60) {
            setIDcardData((prevData) => ({
              ...prevData,
              documentNumber: text,
            }));
            console.log(text);
          // }
        })
        .catch((err) => {
          console.error("Error  recognizing document number text:", err);
        })
        .finally(() => {
          setValidatedSections((prevData) => ({
            ...prevData,
            documentNumber: true,
          }));
        });
    };
  };

  console.log(IDcardData);

  const setWasValidated = useIDcardValidation((state) => state.setWasValidated);
  const setUserInformation = useIDcardValidation(
    (state) => state.setUserInformation
  );
  
   useEffect(() => {
     const allSectionsValidated =
       validatedSections.name &&
       validatedSections.surname &&
       validatedSections.sex &&
       validatedSections.height &&
       validatedSections.birthDate &&
       validatedSections.expiryDate &&
       validatedSections.documentNumber;

     // Solo actualizar el estado si todas las secciones han sido validadas
     if (allSectionsValidated) {
       const timer = setTimeout(() => {
         setUserInformation(IDcardData); // Actualizar la información del usuario
         nextPhase(); // Avanzar a la siguiente fase
       }, 3000);

       // Limpiar el temporizador cuando el componente se desmonta o las dependencias cambian
       return () => clearTimeout(timer);
     }
   }, [nextPhase, validatedSections, IDcardData, setUserInformation]);

   useEffect(() => {
     // Verificar si hay información mínima para validar el DNI
     if (
       IDcardData.name !== "" &&
       IDcardData.surname !== "" &&
       IDcardData.sex !== "" &&
       IDcardData.height !== "" &&
       IDcardData.birthDate !== "" &&
       IDcardData.expiryDate !== "" &&
       IDcardData.documentNumber !== ""
     ) {
       setWasValidated(true);
     }
   }, [IDcardData, setWasValidated]);
  
  

  return (
    <>
      <div className="object-fit-contain h-100 position-relative">
        {orientation === "portrait-primary" && cameraAvailable && (
          <h2 className="text-white text-center">
            Please turn your phone to landscape to use the camera.
          </h2>
        )}
        {cameraAvailable && orientation !== "portrait-primary" && (
          <Webcam
            className={cameraActive ? "d-block" : "d-none"}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            autoPlay={true}
            playsInline={true}
            muted={true}
            videoConstraints={videoConstraints}
            style={{ width: "100%", height: "100%", borderRadius: "16px" }}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
          />
        )}
        {cameraActive && orientation !== "portrait-primary" && (
          <>
            <div
              className={`tag  validation-card-tag ${
                isValidatingSections ? "d-block" : "d-none"
              } ${
                validatedSections.name &&
                validatedSections.surname &&
                validatedSections.sex &&
                validatedSections.height &&
                validatedSections.birthDate &&
                validatedSections.expiryDate &&
                validatedSections.documentNumber
                  ? "primary"
                  : "secondary"
              }`}
            >
              {validatedSections.name &&
              validatedSections.surname &&
              validatedSections.sex &&
              validatedSections.height &&
              validatedSections.birthDate &&
              validatedSections.expiryDate &&
              validatedSections.documentNumber
                ? "Success"
                : "validating..."}
            </div>
            <div
              className={`validation-frame d-flex flex-column gap-3 ${
                validatedSections.name &&
                validatedSections.surname &&
                validatedSections.sex &&
                validatedSections.height &&
                validatedSections.birthDate &&
                validatedSections.expiryDate &&
                validatedSections.documentNumber
                  ? "success"
                  : ""
              }`}
            >
              <div className="d-flex w-100 position-relative">
                <div
                  style={{
                    width: "272px",
                    height: "50px",
                    top: "135px",
                    left: "175px",
                    border: "2px solid black",
                    position: "absolute",
                  }}
                  className="border-4 position-relative"
                ></div>
                <div
                  style={{
                    width: "272px",
                    height: "50px",
                    top: "76px",
                    left: "-47px",
                    border: "2px solid black",
                    position: "absolute",
                  }}
                  className="border-4 position-relative"
                ></div>
                <div
                  style={{
                    width: "45px",
                    height: "50px",
                    top: "205px",
                    left: "-271px",
                    border: "2px solid black",
                    position: "absolute",
                  }}
                  className="border-4 position-relative"
                ></div>
                <div
                  style={{
                    width: "60px",
                    height: "50px",
                    top: "205px",
                    left: "-258px",
                    border: "2px solid black",
                    position: "absolute",
                  }}
                  className="border-4 position-relative"
                ></div>
                <div
                  style={{
                    width: "154px",
                    height: "50px",
                    top: "205px",
                    left: "-167px",
                    border: "2px solid black",
                    position: "absolute",
                  }}
                  className="border-4 position-relative"
                ></div>
              </div>
            </div>
          </>
        )}
        {!cameraAvailable && (
          <h2 className="text-white text-center">Camera is not available</h2>
        )}
        <button onClick={captureAndCropImage} className="btn btn-primary mt-3">
          Capture
        </button>
      </div>

        {/* {croppedImages.surname && (
        <div>
          <h1 className=" text-white">surname imagen</h1>
          <img
            src={croppedImages.surname}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
       )}

      {croppedImage && (
        <div className="text-center mt-3">
          <h2 className="text-white"> Completo:</h2>
          <img
            src={croppedImage}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}

      {croppedImages.name && (
        <div>
          <h1 className=" text-white">name imagen</h1>
          <img
            src={croppedImages.name}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}

      {croppedImages.sex && (
        <div>
          <h1 className=" text-white">sex imagen</h1>
          <img
            src={croppedImages.sex}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}
      
      {croppedImages.height && (
        <div>
          <h1 className=" text-white">Height imagen</h1>
          <img
            src={croppedImages.height}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}

      {croppedImages.birthDate && (
        <div>
          <h1 className=" text-white">Birth imagen</h1>
          <img
            src={croppedImages.birthDate}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}

      {croppedImages.expiryDate && (
        <div className="text-center mt-3">
          <h2 className="text-white"> Expiry date:</h2>
          <img
            src={croppedImages.expiryDate}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}

      {croppedImages.documentNumber && (
        <div className="text-center mt-3">
          <h2 className="text-white"> document number:</h2>
          <img
            src={croppedImages.documentNumber}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )} */}

      {/* {croppedImage && (
        <div className="text-center mt-3">
          <h2 className="text-white"> Completo:</h2>
          <img
            src={croppedImage}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}  */}

      {/* {validating && (
        <div className="text-center mt-3">
          <h2 className="text-white">Validating...</h2>
        </div>
      )}
      {validationComplete && (
        <div className="text-center mt-3">
          <h2 className="text-white">compleated...</h2>
        </div>
      )} */}

      {/* {croppedImage && (
        <div className="text-center mt-3">
          <h2 className="text-white"> Completo:</h2>
          <img
            src={croppedImage}
            style={{ maxWidth: "100%", border: "2px solid white" }}
          />
        </div>
      )}

      // {croppedImages.surname && (
      //   <div>
      //     <h1 className=" text-white">surname imagen</h1>
      //     <img
      //       src={croppedImages.surname}
      //       style={{ maxWidth: "100%", border: "2px solid white" }}
      //     />
      //   </div>
      // )}

      // {croppedImages.name && (
      //   <div>
      //     <h1 className=" text-white">name imagen</h1>
      //     <img
      //       src={croppedImages.name}
      //       style={{ maxWidth: "100%", border: "2px solid white" }}
      //     />
      //   </div>
      // )}

      // {croppedImages.sex && (
      //   <div>
      //     <h1 className=" text-white">sex imagen</h1>
      //     <img
      //       src={croppedImages.sex}
      //       style={{ maxWidth: "100%", border: "2px solid white" }}
      //     />
      //   </div>
      // )}

      // {croppedImages.height && (
      //   <div>
      //     <h1 className=" text-white">Height imagen</h1>
      //     <img
      //       src={croppedImages.height}
      //       style={{ maxWidth: "100%", border: "2px solid white" }}
      //     />
      //   </div>
      // )}

      // {croppedImages.birthDate && (
      //   <div>
      //     <h1 className=" text-white">Birth imagen</h1>
      //     <img
      //       src={croppedImages.birthDate}
      //       style={{ maxWidth: "100%", border: "2px solid white" }}
      //     />
      //   </div>
      // )}

      {scannedText && (
        <div className="text-white text-center mt-3">
          <h2>Texto completo Reconocido:</h2>
          <p>{scannedText}</p>
        </div>
      )} */}

      {/* {IDcardData.surname && (
        <div className="text-white text-center mt-3">
          <h2>Surname:</h2>
          <p>{IDcardData.surname}</p>
        </div>
      )}

      {IDcardData.name && (
        <div className="text-white text-center mt-3">
          <h2>Name:</h2>
          <p>{IDcardData.name}</p>
        </div>
      )}

      {IDcardData.sex && (
        <div className="text-white text-center mt-3">
          <h2>Sex:</h2>
          <p>{IDcardData.sex}</p>
        </div>
      )}

      {IDcardData.height && (
        <div className="text-white text-center mt-3">
          <h2>Height:</h2>
          <p>{IDcardData.height}</p>
        </div>
      )} */}

      {/* {IDcardData.birthDate && (
        <div className="text-white text-center mt-3">
          <h2>BirthDate:</h2>
          <p>{IDcardData.birthDate}</p>
        </div>
      )} */}
    </>
  );
}
