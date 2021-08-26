import React from "react";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";

import { deleteFolder } from "../redux/folder/folder.actions";

const Folder = ({ folder }) => {
  const dispatch = useDispatch();
  return (
    <Card.Body className="d-flex align-items-center justify-content-between">
      <LinkContainer to={`/folder/${folder.id}`} style={{ cursor: "pointer" }}>
        <p className="my-3 p-3 ">- {folder.name}</p>
      </LinkContainer>

      <strong
        className="align-self-end my-3 p-3 text-danger"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(deleteFolder(folder.id))}
      >
        Delete
      </strong>
    </Card.Body>
  );
};

export default Folder;
