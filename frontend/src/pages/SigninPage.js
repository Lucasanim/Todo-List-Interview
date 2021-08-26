import React from "react";
import { useSelector } from "react-redux";
import Signin from "../components/Signin";
import Loader from "../components/Loader";

import { selectUserLoading } from "../redux/user/user.selectors";

const SigninPage = () => {
  const isLoading = useSelector(selectUserLoading);
  return isLoading ? <Loader /> : <Signin />;
};

export default SigninPage;
