import { useState } from "react";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Input from "./Input";
import Button from "./Button";
import Brand from "./Brand";
import useHttp from "../hooks/use-http";
import Spinner from "./Spinner";
import Toast from "./Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    fireRequest: authenticateUser,
    isLoading: isAuthenticating,
    error: authenticateUserError,
    resetError: resetAuthenticateUserError,
  } = useHttp();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPasssword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    const response = await authenticateUser("POST", "auth/login/", user);
    if (!response) return;
    localStorage.setItem("token", response.data);
  };

  const redirectHandler = (to) => {
    navigate(to);
  };

  const handleClickShowPassword = () => {
    setShowPassword((currentState) => !currentState);
  };

  return (
    <>
      {isAuthenticating && <Spinner />}
      {authenticateUserError?.isError && (
        <Toast updateError={resetAuthenticateUserError}>
          {authenticateUserError?.error}
        </Toast>
      )}
      <div className="w-1/4 bg-white rounded-md">
        <div className="w-full h-full p-4 flex flex-col gap-3">
          <div className="w-full flex justify-end">
            <Brand size="small" />
          </div>
          <div className="w-full flex justify-center items-center gap-1">
            <LockRoundedIcon color="disabled" />
            <Typography
              className="text-slate-300"
              variant="h5"
              fontWeight={500}
            >
              Sign in
            </Typography>
          </div>
          <form className="flex flex-col gap-3" onSubmit={loginHandler}>
            <Input
              startAdornment={<AlternateEmailRoundedIcon />}
              config={{
                placeholder: "Email",
                type: "text",
                value: email,
                onChange: emailChangeHandler,
              }}
            />
            <Input
              startAdornment={<KeyRoundedIcon />}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              config={{
                placeholder: "Password",
                type: showPassword ? "text" : "password",
                value: password,
                onChange: passwordChangeHandler,
              }}
            />
            <div className="flex w-full justify-end">
              <Button variant="text" color="faded">
                Forgot Password
              </Button>
            </div>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
          <div className="flex w-full justify-center items-center">
            <Typography className="text-slate-400" variant="p">
              New Here?
            </Typography>
            <Button
              onClick={() => {
                redirectHandler("/register");
              }}
              variant="text"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
