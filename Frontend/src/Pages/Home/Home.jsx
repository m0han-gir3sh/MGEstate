import "./Home.css";
import { useStates } from "../../States";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pagination } from "@mui/material";
import axios from "../../axios";

function Home() {
  const { getAllEstate, estate } = useStates();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("estateName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    getAllEstatess();
  }, [currentPage, itemsPerPage, sortBy, sortOrder]);

  const getAllEstatess = () => {
    axios
      .get(
        `http://localhost:1028/estate/${currentPage}/${itemsPerPage}/${sortBy}/${sortOrder}`
      )
      .then((response) => {
        const { content, totalPages } = response.data;
        console.log(response);
        setEstates(content);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    getAllEstate();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <motion.div className="estate-page">
        {estates.map((estate, i) => {
          return (
            <>
              <motion.div layout key={i} className="estate-div">
                <img className="estate-img" src={estate.estateUrl} alt=""></img>
                <span className="estate-name">
                  <b>{estate.estateName}</b>
                </span>
                <span className="estate-rate">
                  <b>{estate.estateRate} Lakhs</b>
                </span>
                <button className="estate-location">
                  {estate.estateLocation}
                </button>
              </motion.div>
            </>
          );
        })}
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            size="small"
          />
          <div className="entries-per-page">
            <span id="Entries-text">Entries per Page:</span>
            <select
              id="select-entries"
              value={itemsPerPage}
              onChange={handleEntriesPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      </motion.div>
    </>
  );
}
export default Home;
