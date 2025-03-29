export default function PaginationBtn({page, onClick, paginationClass} : {page ?: number, onClick ?: () => void, paginationClass ?: string}) {

    return (
        <button onClick={onClick} className={`pagination-btn ${paginationClass}`}>
            <span>{page}</span>
        </button>
    )
}