import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type PaginationProps = {
	itemPerPage: number;
	totalItems: number;
	paginate: (page: number) => void;
	currentPage: number;
};
function Pagination({
	itemPerPage,
	totalItems,
	paginate,
	currentPage,
}: PaginationProps) {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalItems / itemPerPage);
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	//Change the page
	const clickEvent = (type: string | number) => {
		console.log(type);
		if (type === "backPage" && currentPage > 1) {
			paginate(currentPage - 1);
		} else if (type === "nextPage" && currentPage < totalPages) {
			paginate(currentPage + 1);
		} else if (typeof type === "number") {
			paginate(type);
		}
	};
	return (
		<div className="mt-5 inline-flex items-center justify-center gap-3">
			<a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
				<span className="sr-only">Next Page</span>
				<button onClick={() => clickEvent("backPage")}>
					<FaAngleLeft />
				</button>
			</a>

			<p className=" text-base font-semibold">
				{currentPage}
				<span className="mx-0.25">/</span>
				{totalPages}
			</p>

			<a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
				<span className="sr-only">Next Page</span>
				<button onClick={() => clickEvent("nextPage")}>
					<FaAngleRight />
				</button>
			</a>
		</div>
	);
}

export default Pagination;
