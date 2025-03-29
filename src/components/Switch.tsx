export default function Switch({
  isDisabled,
  isValidated,
  error,
  onChange
}: {
  isDisabled?: boolean;
  isValidated?: boolean;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label className={`switch ${isDisabled ? "disabled" : ""} `}>
        <input type="checkbox" disabled={isDisabled} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </>
  );
}
