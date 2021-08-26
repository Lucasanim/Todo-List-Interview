import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { selectUserToken } from "./redux/user/user.selectors";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import FolderPage from "./pages/FolderPage";

const App = () => {
  const token = useSelector(selectUserToken);
  console.log({ token });
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route
            path="/"
            exact
            render={() => (token ? <HomePage /> : <Redirect to="/signin" />)}
          />
          <Route
            path="/folder/:folderId"
            render={() => (token ? <FolderPage /> : <Redirect to="/signin" />)}
          />
          <Route
            path="/signin"
            exact
            render={() => (!token ? <SigninPage /> : <Redirect to="/" />)}
          />
          <Route
            path="/signup"
            exact
            render={() => (!token ? <SignupPage /> : <Redirect to="/" />)}
          />
        </Container>
      </main>
    </BrowserRouter>
  );
};

export default App;
