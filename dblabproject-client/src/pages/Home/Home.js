import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfiguration";
import styles from "./Home.module.scss";

const Home = () => {
  const [tableList, setTableList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/")
      .then((response) =>
        setTableList(
          response.data.map(({ Tables_in_university }) => Tables_in_university)
        )
      )
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className={styles.home}>
      these are the tables
      {tableList.map((table) => (
        <Link to={`/tables/${table}`} key={table}>
          {table}
        </Link>
      ))}
    </div>
  );
};

export default Home;
