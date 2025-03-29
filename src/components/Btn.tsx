export default function Btn({btnClass, children, onClick, disabled, ...props} : {btnClass?: string, children?: any, onClick?: () => void, disabled?: boolean} ) {

    return (
        <>
            <button onClick={onClick} disabled={disabled} className={`btn ${btnClass} d-flex gap-2 justify-content-center align-items-center`} {...props}>
                {children}
            </button>
        </>
    )
}


