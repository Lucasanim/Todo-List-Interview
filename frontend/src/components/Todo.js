import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Form, Modal, Button, Row, Col } from "react-bootstrap";

import {
  deleteTodo,
  updateTodoCompletion,
  updateTodoTitle,
} from "../redux/todo/todo.actions";

const Todo = ({ todo }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const dispatch = useDispatch();
  const match = useRouteMatch();

  const folderId = match.params.folderId;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTodoTitle({
        id: todo.id,
        title,
        folderId,
      })
    );
    setTitle("");
    setShow(false);
  };

  return (
    <Card.Body className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Form.Check
          aria-label=""
          className="text-warning"
          checked={todo.completed}
          onChange={() =>
            dispatch(
              updateTodoCompletion({
                id: todo.id,
                completed: !todo.completed,
                folderId,
              })
            )
          }
        />
        <Card.Title as="div">
          <p className="my-3 p-3 ">{todo.title}</p>
        </Card.Title>
      </div>

      <div className="">
        <strong
          className="my-3 p-3 text-primary"
          style={{ cursor: "pointer" }}
          // onClick={() => history.push(`/edit/${todo.id}`)}
          onClick={() => setShow(true)}
        >
          Edit
        </strong>
        <strong
          className="my-3 p-3 text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(deleteTodo({ todoId: todo.id, folderId }))}
        >
          Delete
        </strong>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Editing Task "{todo.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center my-2 mb-4 mx-3">
              <Col className="">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="New Folder"
                />
              </Col>
            </Row>
            <Row className="align-items-center my-2 mb-4 mx-3">
              <Col xs="auto" className="">
                <Button type="submit">Save</Button>
                <Button
                  className="mx-3"
                  variant="danger"
                  type="button"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Card.Body>
  );
};

export default Todo;
