import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
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
      <Link to={`/tables/student`}>
        <Button variant="contained" color="primary">
          student list
        </Button>
      </Link>
      <Link to={`/tables/instructor`}>
        <Button variant="contained" color="secondary">
          instructor list
        </Button>
      </Link>
    </div>
  );
};

export default Home;
