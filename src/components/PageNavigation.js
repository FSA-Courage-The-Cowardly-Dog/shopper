import '../styling/Navigation.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
export default function PageNavigation({ navTo }) {
  const [pageNumbers, setPageNumbers] = React.useState([]);
  const count = useSelector((state) => state.product.count);
  const page = useSelector((state) => state.product.page);
  const category = useSelector((state) => state.product.category);
  let currentPage = Number(useParams().page);
  let numberOfPages = Math.ceil(count / 10);
  let query = useLocation().search;
  React.useEffect(() => {
    let pagesToShow = 3;
    let pageNumbersTemp = [];
    if (numberOfPages < pagesToShow) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbersTemp.push(i);
      }
    } else {
      let firstPageToShow = currentPage - Math.floor(pagesToShow / 2);
      for (let i = 0; i < pagesToShow; i++) {
        pageNumbersTemp.push(firstPageToShow);
        firstPageToShow++;
      }
    }
    pageNumbersTemp = pageNumbersTemp.filter(
      (num) => (num > 0) & (num <= numberOfPages)
    );
    setPageNumbers(pageNumbersTemp);
  }, [count, page, currentPage, numberOfPages]);

  return (
    <div className="pageNav">
      {currentPage === 1 ? (
        <></>
      ) : (
        <Link className="pageNavA" to={`../${category}/1${query}`}>
          first
        </Link>
      )}
      {pageNumbers[0] === currentPage || currentPage === 2 ? (
        <></>
      ) : (
        <Link
          className="pageNavA"
          to={`../${category}/${currentPage - 1}${query}`}
        >
          previous
        </Link>
      )}
      {pageNumbers.length > 0 ? (
        pageNumbers.map((num) => (
          <NavLink
            key={num}
            to={`../${category}/${num}${query}`}
            className={({ isActive }) => (isActive ? 'activePage' : 'pageNavA')}
          >
            {num}
          </NavLink>
        ))
      ) : (
        <></>
      )}
      {pageNumbers[pageNumbers.length - 1] === currentPage ? (
        <></>
      ) : (
        <Link to={`../${category}/${currentPage + 1}${query}`}>next</Link>
      )}
      {pageNumbers[pageNumbers.length - 1] === numberOfPages ? (
        <></>
      ) : (
        <Link to={`../${category}/${numberOfPages}${query}`}>last</Link>
      )}
    </div>
  );
}
