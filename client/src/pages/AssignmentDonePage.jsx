import React from "react";
import { useParams } from "react-router-dom";

const AssignmentDonePage = () => {
    const { class_id } = useParams()

  return (
    <div>{class_id}</div>
  )
};

export default AssignmentDonePage;
