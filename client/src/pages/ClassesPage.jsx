import React from "react";
import { useParams } from "react-router-dom";

const ClassesPage = () => {
    const { class_id } = useParams()
  return <div>{class_id}</div>;
};

export default ClassesPage;
