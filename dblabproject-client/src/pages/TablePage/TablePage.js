import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfiguration";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./TablePage.module.scss";
import { Button } from "@material-ui/core";

const TablePage = () => {
  const { table } = useParams();
  const [tableInfo, setTableInfo] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`tables/${table}`)
      .then((response) => {
        // debugger;
        setTableInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, [table]);
  return (
    <div className={styles.tablePage}>
      <header>
        <h1>{table} list</h1>
        <Link to="/">
          <Button variant="contained" color="secondary">
            Go Home{" "}
          </Button>
        </Link>
      </header>
      {tableInfo.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys({ ...tableInfo[0], courses: [] }).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableInfo.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {Object.values({
                      ...item,
                    }).map((element) => (
                      <TableCell key={element}>{element}</TableCell>
                    ))}
                    <TableCell>
                      <Link to="/">
                        <Button variant="contained" color="primary">
                          Courses
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "looks like this table is empty"
      )}
    </div>
  );
};

export default TablePage;
