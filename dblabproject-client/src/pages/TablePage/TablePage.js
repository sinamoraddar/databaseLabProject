import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { axiosInstance } from "../../api/axiosConfiguration";

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
    <div>
      <h1>{table}</h1>
      {tableInfo.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(tableInfo[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableInfo.map((item, index) => {
              return (
                <tr key={index}>
                  {Object.values(item).map((element) => (
                    <td key={element}>{element}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "looks like this table is empty"
      )}
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default TablePage;
