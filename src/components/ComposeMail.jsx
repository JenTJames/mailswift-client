import SendIcon from "@mui/icons-material/Send";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";

import Input from "./Input";

import useInput from "../hooks/use-input";
import { noValidate } from "../utils/validator";
import Button from "./Button";
import { DialogActions } from "@mui/material";

const ComposeMail = ({ discardHandler }) => {
  const {
    enteredValue: recipient,
    errorText: recipientErrorText,
    inputInValid: isRecipientInValid,
    onChangeHandler: recipientChangeHandler,
    onBlurHandler: recipientBlurHandler,
    // activateError: activateRecipientError,
  } = useInput(noValidate);
  const {
    enteredValue: subject,
    errorText: subjectErrorText,
    inputInValid: isSubjectInValid,
    onChangeHandler: subjectChangeHandler,
    onBlurHandler: subjectBlurHandler,
    // activateError: activateRecipientError,
  } = useInput(noValidate);
  const {
    enteredValue: body,
    errorText: bodyErrorText,
    inputInValid: isBodyInValid,
    onChangeHandler: bodyChangeHandler,
    onBlurHandler: bodyBlurHandler,
    // activateError: activateRecipientError,
  } = useInput(noValidate);

  return (
    <form className="flex flex-col gap-2">
      <Input
        startAdornment={<PersonRoundedIcon />}
        config={{
          placeholder: "Recipient Email",
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
          type: "text",
          value: subject,
          error: isSubjectInValid,
          helperText: subjectErrorText,
          onChange: subjectChangeHandler,
          onBlur: subjectBlurHandler,
        }}
      />
      <Input
        config={{
          placeholder: "Enter the body...",
          multiline: true,
          minRows: 10,
          type: "text",
          value: body,
          error: isBodyInValid,
          helperText: bodyErrorText,
          onChange: bodyChangeHandler,
          onBlur: bodyBlurHandler,
        }}
      />
      <DialogActions>
        <Button onClick={discardHandler} size="lg" color="error">
          Discard
        </Button>
        <Button endIcon={<SendIcon />} size="lg" variant="contained">
          Send
        </Button>
      </DialogActions>
    </form>
  );
};

export default ComposeMail;
