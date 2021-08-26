import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import Todo from "../components/Todo";
import Loader from "../components/Loader";

import { fetchFolderTodos, createTodo } from "../redux/todo/todo.actions";
import { selectFolders } from "../redux/folder/folder.selectors";
import { selectTodos, selectTodoLoading } from "../redux/todo/todo.selectors";
const FolderPage = () => {
  const [title, setTitle] = useState("");

  const match = useRouteMatch();
  const dispatch = useDispatch();

  const folderId = match.params.folderId;

  const folders = useSelector(selectFolders);
  const todos = useSelector(selectTodos);
  const isLoading = useSelector(selectTodoLoading);

  const currentFolder = folders.find((folder) => folder.id == folderId);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo({ folderId, title }));
    setTitle("");
  };

  useEffect(() => {
    dispatch(fetchFolderTodos(folderId));
  }, [dispatch, folderId]);

  return (
    <Card>
      <LinkContainer to="/" style={{ cursor: "pointer" }}>
        <Card.Title className="p-4">Folders > {currentFolder.name}</Card.Title>
      </LinkContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {todos?.length ? (
            todos.map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })
          ) : (
            <Card.Title className="align-self-center p-3">
              You Don't Have Tasks!
            </Card.Title>
          )}
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center my-2 mb-4 mx-3">
              <Col className="">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="New Task"
                />
              </Col>

              <Col xs="auto" className="">
                <Button type="submit">Add</Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Card>
  );
};

export default FolderPage;
