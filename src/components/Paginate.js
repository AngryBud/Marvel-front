import "./Paginate.scss";
const Paginate = ({ setPage, numberOfPages, page }) => {
  return (
          <div className="paginate">
            <button disabled={page <= 1 ? true : false} onClick={() => setPage(page - 1)}>Page prec.</button>
            <div>
              {page} <span className="pages">/ {numberOfPages}</span>
            </div>
            <button disabled={page >= numberOfPages ? true : false} onClick={() => setPage(page + 1)}>Page suiv.</button>
          </div>
        )
};

export default Paginate;