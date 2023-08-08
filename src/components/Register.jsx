import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import Input from "./Input";
import Button from "./Button";
import Brand from "./Brand";
import useHttp from "../hooks/use-http";
import useInput from "../hooks/use-input";
import Spinner from "./Spinner";
import Toast from "./Toast";
import InputRow from "./InputRow";
import { isEmpty } from "../utils/validator";

const Register = () => {
  const navigate = useNavigate();
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const {
    fireRequest: createUser,
    isLoading: isCreatingUser,
    error: createUserError,
    resetError: resetCreateUserError,
  } = useHttp();

  const { fireRequest: doesEmailExist } = useHttp();

  const {
    enteredValue: firstname,
    errorText: firstnameErrorText,
    isInputInvalid: isFirstnameInvalid,
    onBlurHandler: firstnameBlurHandler,
    onChangeHandler: firstnameChangeHandler,
    activateError: activateFirstnameError,
  } = useInput(isEmpty);
  const {
    enteredValue: lastname,
    errorText: lastnameErrorText,
    isInputInvalid: isLastnameInvalid,
    onBlurHandler: lastnameBlurHandler,
    onChangeHandler: lastnameChangeHandler,
    activateError: activateLastnameError,
  } = useInput(isEmpty);
  const {
    enteredValue: email,
    errorText: emailErrorText,
    isInputInvalid: isEmailInvalid,
    onBlurHandler: emailBlurHandler,
    onChangeHandler: emailChangeHandler,
    activateError: activateEmailError,
  } = useInput(isEmpty);
  const {
    enteredValue: password,
    errorText: passwordErrorText,
    isInputInvalid: isPasswordInvalid,
    onBlurHandler: passwordBlurHandler,
    onChangeHandler: passwordChangeHandler,
    activateError: activatePasswordError,
  } = useInput(isEmpty);
  const {
    enteredValue: confirmPassword,
    errorText: confirmPasswordErrorText,
    isInputInvalid: isConfirmPasswordInvalid,
    onBlurHandler: confirmPasswordBlurHandler,
    onChangeHandler: confirmPasswordChangeHandler,
    activateError: activateConfirmPasswordError,
  } = useInput(isEmpty);

  useEffect(() => {
    const checkEmailValidity = setTimeout(async () => {
      if (email) {
        // API Call to check if the email exists
        const response = await doesEmailExist(
          "GET",
          "auth/check-email?email=" + email
        );
        if (!response) return;
        if (!response.data) {
          setIsEmailAvailable(false);
          activateEmailError("This email is already taken");
        } else {
          setIsEmailAvailable(true);
        }
      }
    }, 1500);
    return () => clearTimeout(checkEmailValidity);
  }, [email, doesEmailExist, activateEmailError]);

  const validateUserDetails = () => {
    let isValidationSuccess = true;
    if (!firstname) {
      activateFirstnameError("Firstname cannot be blank!");
      isValidationSuccess = false;
    }
    if (!lastname) {
      activateLastnameError("Lastname cannot be blank!");
      isValidationSuccess = false;
    }
    if (!email) {
      activateEmailError("Email cannot be blank!");
      isValidationSuccess = false;
    }
    if (!password) {
      activatePasswordError("Password cannot be blank!");
      isValidationSuccess = false;
    }
    if (!confirmPassword) {
      activateConfirmPasswordError("Confirm Password cannot be blank!");
      isValidationSuccess = false;
    }

    if (confirmPassword !== password) {
      activatePasswordError("The entered passwords does not match!");
      isValidationSuccess = false;
    }

    return isValidationSuccess;
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    if (!validateUserDetails() || !isEmailAvailable) return;
    const user = {
      firstname,
      lastname,
      email,
      password,
    };
    const response = await createUser("POST", "auth/", user);
    if (!response) return;
    redirectHandler("/login");
  };

  const redirectHandler = (to) => {
    navigate(to);
  };

  return (
    <>
      {isCreatingUser && <Spinner />}
      {createUserError?.isError && (
        <Toast updateError={resetCreateUserError}>
          {createUserError?.error}
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
              Sign up
            </Typography>
          </div>
          <form className="flex flex-col gap-3" onSubmit={registerHandler}>
            <InputRow>
              <Input
                startIcon={<AccountCircleRoundedIcon />}
                config={{
                  placeholder: "Firstname",
                  type: "text",
                  value: firstname,
                  error: isFirstnameInvalid,
                  helperText: firstnameErrorText,
                  onChange: firstnameChangeHandler,
                  onBlur: firstnameBlurHandler,
                }}
              />
              <Input
                startIcon={<PersonPinCircleRoundedIcon />}
                config={{
                  placeholder: "Lastname",
                  type: "text",
                  value: lastname,
                  error: isLastnameInvalid,
                  helperText: lastnameErrorText,
                  onChange: lastnameChangeHandler,
                  onBlur: lastnameBlurHandler,
                }}
              />
            </InputRow>
            <Input
              startIcon={<AlternateEmailRoundedIcon />}
              config={{
                placeholder: "Email",
                type: "email",
                value: email,
                error: isEmailInvalid,
                helperText: emailErrorText,
                onChange: emailChangeHandler,
                onBlur: emailBlurHandler,
              }}
            />
            <InputRow>
              <Input
                startIcon={<KeyRoundedIcon />}
                config={{
                  placeholder: "Password",
                  type: "password",
                  value: password,
                  error: isPasswordInvalid,
                  helperText: passwordErrorText,
                  onChange: passwordChangeHandler,
                  onBlur: passwordBlurHandler,
                }}
              />
              <Input
                startIcon={<PasswordRoundedIcon />}
                config={{
                  placeholder: "Confirm Password",
                  type: "password",
                  value: confirmPassword,
                  error: isConfirmPasswordInvalid,
                  helperText: confirmPasswordErrorText,
                  onChange: confirmPasswordChangeHandler,
                  onBlur: confirmPasswordBlurHandler,
                }}
              />
            </InputRow>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </form>
          <div className="flex w-full justify-center items-center">
            <Typography className="text-slate-400" variant="p">
              Already have an account?
            </Typography>
            <Button
              onClick={() => {
                redirectHandler("/login");
              }}
              variant="text"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
