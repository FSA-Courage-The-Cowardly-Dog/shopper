import '../styling/Navigation.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
export default function PageNavigation({ navTo }) {
  const [pageNumbers, setPageNumbers] = React.useState([]);
  const count = useSelector((state) => state.product.count);
  const page = useSelector((state) => state.product.page);
  let categories = useParams().categories;
  let currentPage = Number(useParams().page);
  let numberOfPages = Math.ceil(count / 10);

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
        <Link className="pageNavA" to={`../${categories}/1`}>
          first
        </Link>
      )}
      {pageNumbers[0] === currentPage ? (
        <></>
      ) : (
        <Link className="pageNavB" to={`../${categories}/${currentPage - 1}`}>
          <ArrowLeftIcon fontSize='inherit'/>
        </Link>
      )}
      {pageNumbers.length > 0 ? (
        pageNumbers.map((num) => (
          <NavLink
            key={num}
            to={`../${categories}/${num}`}
            className={({ isActive }) => (isActive ? 'activePage' : 'pageNavA')}
          >
            <div className="pageLogo">
            <span>Page</span>
            <p>{num}</p>
            </div>
          </NavLink>
        ))
      ) : (
        <></>
      )}
      {pageNumbers[pageNumbers.length - 1] === currentPage ? (
        <div className='pageNavC'>next</div>
      ) : (
        <Link className='pageNavB' to={`../${categories}/${currentPage + 1}`}><ArrowRightIcon fontSize='inherit'/></Link>
      )}
      {/* {pageNumbers[pageNumbers.length - 1] === numberOfPages ? (
        <></>
      ) : (
        <Link to={`../${categories}/${numberOfPages}`}>last</Link>
      )} */}
    </div>
  );
}
