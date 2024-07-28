import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toTheNextPage, toThePrevPage } from '@/slices/PageSlice';
import './Pagination.css';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.page);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        type="button"
        onClick={() => dispatch(toThePrevPage())}
      >
        &lt;
      </button>
      <p>{page}</p>
      <button
        className="pagination-btn"
        type="button"
        onClick={() => dispatch(toTheNextPage())}
      >
        &gt;
      </button>
    </div>
  );
}
