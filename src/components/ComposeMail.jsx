import { useEffect, useState } from "react";
import { DialogActions } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";

import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import useToken from "../hooks/use-token";

import { isEmpty } from "../utils/validator";

import Input from "./Input";
import Button from "./Button";
import Spinner from "./Spinner";
import Toast from "./Toast";
import useToast from "../hooks/use-toast";

const ComposeMail = ({ discardHandler }) => {
  const [isRecipientValid, setIsRecipientValid] = useState(true);

  const { email: sender } = useToken();
  const { setToast, toastData } = useToast();

  const { fireRequest: doesEmailExist } = useHttp();
  const {
    fireRequest: sendMail,
    isLoading: isSendingMail,
    error: sendMailError,
    resetError: resetSendMailError,
  } = useHttp();

  const {
    enteredValue: recipient,
    errorText: recipientErrorText,
    isInputInvalid: isRecipientInValid,
    onBlurHandler: recipientBlurHandler,
    onChangeHandler: recipientChangeHandler,
    activateError: activateRecipientError,
  } = useInput(isEmpty);

  const {
    enteredValue: subject,
    errorText: subjectErrorText,
    isInputInvalid: isSubjectInvalid,
    onBlurHandler: subjectBlurHandler,
    onChangeHandler: subjectChangeHandler,
    activateError: activateSubjectError,
  } = useInput(isEmpty);

  const {
    enteredValue: body,
    errorText: bodyErrorText,
    isInputInvalid: isBodyInvalid,
    onBlurHandler: bodyBlurHandler,
    onChangeHandler: bodyChangeHandler,
    activateError: activateBodyError,
  } = useInput(isEmpty);

  useEffect(() => {
    const isUserPresent = setTimeout(async () => {
      if (recipient) {
        // API Call to check if the email exists
        const response = await doesEmailExist(
          "GET",
          "auth/check-email?email=" + recipient
        );
        if (!response) return;
        if (response.data) {
          setIsRecipientValid(false);
          activateRecipientError(
            "Could not find any user with the given email!"
          );
        } else {
          setIsRecipientValid(true);
        }
      }
    }, 1500);
    return () => clearTimeout(isUserPresent);
  }, [recipient, doesEmailExist, activateRecipientError]);

  const validateMail = () => {
    let isValidationSuccess = true;
    if (!recipient) {
      activateRecipientError("Email cannot be blank!");
      isValidationSuccess = false;
    }
    if (!subject) {
      activateSubjectError("Subject cannot be blank!");
      isValidationSuccess = false;
    }
    if (!body) {
      activateBodyError("Body cannot be blank!");
      isValidationSuccess = false;
    }
    return isValidationSuccess;
  };

  const sendMailHandler = async () => {
    if (!isRecipientValid || !validateMail()) return;
    const mail = {
      subject,
      body,
      sender,
      receiver: recipient,
    };
    const response = await sendMail("POST", "mails/", mail);
    if (!response) return;
    setToast(true, "Mail Send", "success");
    discardHandler();
  };

  return (
    <>
      {isSendingMail && <Spinner />}
      {sendMailError?.isVisible && (
        <Toast updateError={resetSendMailError}>{sendMailError?.message}</Toast>
      )}
      {toastData?.isVisible && (
        <Toast variant={toastData?.severity} updateError={resetSendMailError}>
          {toastData?.message}
        </Toast>
      )}
      <form className="flex flex-col gap-2">
        <Input
          startAdornment={<PersonRoundedIcon />}
          config={{
            placeholder: "Recipient Email",
            required: true,
            type: "email",
            value: recipient,
            error: isRecipientInValid,
            helperText: recipientErrorText,
            onChange: recipientChangeHandler,
            onBlur: recipientBlurHandler,
          }}
        />
        <Input
          startAdornment={<FeedbackRoundedIcon />}
          config={{
            placeholder: "Subject",
            required: true,
            type: "text",
            value: subject,
            error: isSubjectInvalid,
            helperText: subjectErrorText,
            onChange: subjectChangeHandler,
            onBlur: subjectBlurHandler,
          }}
        />
        <Input
          config={{
            placeholder: "Enter the body...",
            multiline: true,
            rows: 10,
            required: true,
            type: "text",
            value: body,
            error: isBodyInvalid,
            helperText: bodyErrorText,
            onChange: bodyChangeHandler,
            onBlur: bodyBlurHandler,
          }}
        />
        <DialogActions>
          <Button onClick={discardHandler} size="lg" color="error">
            Discard
          </Button>
          <Button
            onClick={sendMailHandler}
            endIcon={<SendIcon />}
            size="lg"
            variant="contained"
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default ComposeMail;
