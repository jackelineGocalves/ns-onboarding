type AccordionProps = {
  question : string;
  handleCLick: () => void;
  icon : React.ReactElement;
  accordionClass ?: string;
  activeClass ?: string;
  children: React.ReactNode;
};

export default function Accordion({
  question,
  handleCLick,
  icon,
  children,
  accordionClass,
  activeClass
}: AccordionProps) {

  return (

      <div className="accordion">
        <div onClick={handleCLick} className={`accordion accordion-principal ${activeClass}`}>
          <h5 className="accordion-title m-0">{question}</h5>
          <span className="plus-accordion"> {icon} </span>
        </div>

        <div className={`${accordionClass}`}>
          {children}
        </div>
      </div>

  );

}
