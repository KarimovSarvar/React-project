import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  toThePrevPage: () => void;
  toTheNextPage: () => void;
}

export default function Pagination({
  currentPage,
  toThePrevPage,
  toTheNextPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button className="pagination-btn" type="button" onClick={toThePrevPage}>
        &lt;
      </button>
      <p>{currentPage}</p>
      <button className="pagination-btn" type="button" onClick={toTheNextPage}>
        &gt;
      </button>
    </div>
  );
}
