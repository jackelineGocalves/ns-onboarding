type CheckBoxProps = {
  label: React.ReactNode;
  link?: string;
  title?: string;
  onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errorMessage?: string;
  checkboxValue: boolean;
};

export default function CheckBox({...props}: CheckBoxProps) {
  const {label, link, title, onChange, name, errorMessage, checkboxValue} = props;

  return (
    <>
      <div className="form-check ps-0">
        <input
          className="form-check-input m-0"
          type="checkbox"
          id="flexCheckDefault"
          checked= {checkboxValue}
          name={name}
          onChange={onChange}
        />

        <label
          className="form-check-label d-flex gap-2"
          htmlFor="flexCheckDefault"
        >
          <div className="d-flex flex-column">
            {title && (
              <h5 className="txt-secondary-600 m-0">
                {title}
              </h5>
            )}
            {label}
          </div>
          {link && (
            <a href="" className="link">
              {link}
            </a>
          )}
        </label>
      </div>

      <div>
        {errorMessage && (
          <div className="pt-2 px-4 txt-danger-600  text-wrap">
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

    </>
  );
}
