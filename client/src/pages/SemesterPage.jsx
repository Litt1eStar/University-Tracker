import React from "react";
import { useParams } from "react-router-dom";

const SemesterPage = () => {
    const { semester_id, semester_val } = useParams()

  return <div>{semester_id} | {semester_val}</div>;
};

export default SemesterPage;
