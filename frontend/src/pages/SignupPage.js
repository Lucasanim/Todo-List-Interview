import React from "react";
import { useSelector } from "react-redux";

import Signup from "../components/Signup";
import Loader from "../components/Loader";

import { selectUserLoading } from "../redux/user/user.selectors";

const SignupPage = () => {
  const isLoading = useSelector(selectUserLoading);
  return isLoading ? <Loader /> : <Signup />;
};

export default SignupPage;
