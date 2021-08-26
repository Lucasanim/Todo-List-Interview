import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

import Folder from "../components/Folder";
import Loader from "../components/Loader";

import { fetchFolders, createFolder } from "../redux/folder/folder.actions";
import {
  selectFolders,
  selectFolderLoading,
} from "../redux/folder/folder.selectors";

const HomePage = () => {
  const [name, setName] = useState("");

  const folders = useSelector(selectFolders);
  const isLoading = useSelector(selectFolderLoading);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFolder(name));
    setName("");
  };

  useEffect(() => {
    dispatch(fetchFolders());
  }, [dispatch]);

  return (
    <Card>
      <Card.Title className="p-4">Folders</Card.Title>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {folders?.length ? (
            folders?.map((folder) => {
              return <Folder key={folder.id} folder={folder} />;
            })
          ) : (
            <Card.Title className="align-self-center p-3">
              You don't have folders!
            </Card.Title>
          )}
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center my-2 mb-4 mx-3">
              <Col className="">
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="New Folder"
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

export default HomePage;
