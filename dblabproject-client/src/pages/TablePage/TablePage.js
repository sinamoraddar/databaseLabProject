import React, { useEffect, useState, useCallback } from "react";
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

const TablePage = ({ location }) => {
  const { table, user, ID } = useParams();
  const [tableInfo, setTableInfo] = useState([]);

  const getInfo = useCallback(() => {
    let customRoute = table
      ? `tables/${table}`
      : `${window.location.pathname}`.slice(1);
    // debugger;
    axiosInstance
      .get(customRoute)
      .then((response) => {
        // debugger;
        setTableInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, [table]);
  const handleDelete = useCallback(
    ({ courseID }) => {
      axiosInstance
        .delete(`course/takes/${ID}/${courseID}`)
        .then(() => getInfo())
        .catch((error) => console.log(error));
    },
    [ID, getInfo]
  );
  useEffect(() => {
    getInfo();
  }, [getInfo]);
  console.log(window.location);
  return (
    <div className={styles.tablePage}>
      <header>
        <h1>{table || `${location.state.name}'s course`} list</h1>
        <Link to="/">
          <Button
            style={{ backgroundColor: "green" }}
            variant="contained"
            color="secondary"
          >
            Go Home{" "}
          </Button>
          {window.location.pathname.includes("/courses/student") && (
            <div>
              <Button
                // style={{ backgroundColor: "red" }}
                variant="contained"
                color="primary"
              >
                Add Course
              </Button>
            </div>
          )}
        </Link>
      </header>
      {tableInfo.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {(window.location.pathname === "/student" ||
                window.location.pathname === "/instructor"
                  ? Object.keys({ ...tableInfo[0], courses: [] })
                  : window.location.pathname.includes("/courses/student")
                  ? Object.keys({ ...tableInfo[0], delete: [] })
                  : Object.keys(tableInfo[0])
                ).map((key) => (
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
                      {window.location.pathname === "/student" ||
                      window.location.pathname === "/instructor" ? (
                        <Link
                          to={{
                            pathname: `/courses/${
                              window.location.pathname === "/student"
                                ? "student"
                                : "instructor"
                            }/${item.ID}`,
                            state: { name: item.name },
                          }}
                        >
                          <Button variant="contained" color="primary">
                            Courses
                          </Button>
                        </Link>
                      ) : (
                        window.location.pathname.includes(
                          "/courses/student"
                        ) && (
                          <Button
                            style={{ backgroundColor: "red" }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleDelete({
                                courseID: item.course_id,
                              });
                            }}
                          >
                            Delete
                          </Button>
                        )
                      )}
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
