import React from "react";
import { useParams } from "react-router-dom";

const YearPage = () => {
  const { year_id } =  useParams()
  return <div>{year_id}</div>;
};

export default YearPage;
