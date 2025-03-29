import "intl-tel-input/build/css/intlTelInput.css";

type InputProps = {
  label: string;
  placeholder?: string;
  type: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: any;
  name: string;
  statusClass?: string;
  errorMessage?: string;
  inputRef?: any;
  countryIso2?: string;
  inputId: string;
  isRequired?: boolean;
  onBlur?: any
};

export default function Input({
  label,
  handleInputChange,
  inputValue,
  name,
  statusClass,
  errorMessage,
  inputRef,
  countryIso2,
  inputId,
  isRequired,
  ...props
}: InputProps) {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Delete" ||
      e.key === "Backspace" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      return;
    }
    //If the type === tel and the key pressed is not a number, prevent the action
    if (props.type === "tel" && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className={`input-box ${statusClass}`}>
        {props.type === "tel" && (
          <div className="country-iso2 d-flex px-4">
            <div>
              <span className="txt-primary-700 caption">
                {countryIso2?.toUpperCase()}
              </span>
            </div>
            <label className="input-label text-primary-700 caption">
              <label className="input-label text-primary-700 caption">
                {isRequired ? `*${label}` : `${label} (optional)`}
              </label>
            </label>
          </div>
        )}
        {props.type !== "tel" && (
          <label className="input-label text-primary-700 caption mx-4">
            <label className="input-label text-primary-700 caption">
              {isRequired ? `*${label}` : `${label}(Optional)`}
            </label>
          </label>
        )}
        <input
          {...props}
          id={inputId}
          ref={props.type === "tel" ? inputRef : undefined}
          className={` ${statusClass} ${
            props.type !== "tel" ? "mx-4 mw-100" : "w-100 input-phone"
          }`}
          {...props}
          onChange={handleInputChange}
          value={inputValue}
          name={name}
          onKeyDown={handleKeyPress}
        />
      </div>

      {errorMessage && (
        <div className="pt-2 px-4 txt-danger-600">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
