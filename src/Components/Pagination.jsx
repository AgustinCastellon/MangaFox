import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return null; 

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        let pages = [];
        let start = Math.max(2, currentPage - 2);
        let end = Math.min(totalPages - 1, currentPage + 2);

        if (currentPage < 4) {
            start = 2;
            end = Math.min(5, totalPages - 1);
        }
        if (currentPage > totalPages - 3) {
            start = Math.max(totalPages - 4, 2);
            end = totalPages - 1;
        }

        if (totalPages > 1) pages.push(1);
        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < totalPages - 1) pages.push("...");
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-500 dark:hover:bg-cyan-200 dark:hover:text-black light:hover:bg-cyan-200"}`}
            >
                <FontAwesomeIcon icon={faChevronLeft} className="light:text-black"/>
            </button>

            {renderPageNumbers().map((page, index) => (
                <button 
                    key={index}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 rounded ${currentPage === page ? "bg-slate-600 text-white light:bg-cyan-200 dark:bg-cyan-300 dark:text-black light:text-black" : "hover:bg-slate-500 dark:hover:bg-cyan-200 dark:hover:text-black light:hover:bg-cyan-100 light:text-black"}`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-500 dark:hover:bg-cyan-200 dark:hover:text-black light:hover:bg-cyan-200"}`}
            >
                <FontAwesomeIcon icon={faChevronRight} className="light:text-black"/>
            </button>
        </div>
    );
}

export default Pagination;
