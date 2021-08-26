import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

import { sigout } from "../redux/user/user.actions";
import { selectUserToken } from "../redux/user/user.selectors";

const Header = () => {
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Todo List</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {token ? (
              <Nav className="ml-auto">
                <Nav.Link onClick={() => dispatch(sigout())}>Log Out</Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to="/signin">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
