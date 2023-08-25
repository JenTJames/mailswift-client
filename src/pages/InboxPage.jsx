import { useContext, useState, useEffect } from "react";
import { Typography } from "@mui/material";

import InboxContext from "../contexts/inbox-context";
import useHttp from "../hooks/use-http";

import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

const InboxPage = () => {
  const [mail, setMail] = useState(null);

  const inboxContext = useContext(InboxContext);

  const {
    fireRequest: fetchMail,
    isLoading: isFetchingMail,
    error: fetchMailError,
    resetError: resetFetchMailError,
  } = useHttp();

  useEffect(() => {
    const mailId = inboxContext.mailID;
    const getMail = async () => {
      const mail = await fetchMail("GET", "mails/" + mailId);
      if (!mail) return;
      setMail(mail.data);
    };
    if (mailId) getMail();
  }, [inboxContext.mailID, fetchMail]);

  if (!mail)
    return (
      <>
        {isFetchingMail && <Spinner />}
        {fetchMailError?.isVisible && (
          <Toast updateError={resetFetchMailError}>
            {fetchMailError?.message}
          </Toast>
        )}
        <div className="flex justify-center items-center w-full">
          <Typography variant="p" className="text-slate-500 text-2xl">
            Select a mail
          </Typography>
        </div>
      </>
    );
  else {
    const lines = mail?.body.split("\n").map((line, index) => (
      <div key={index}>
        {line}
        <br />
      </div>
    ));
    return (
      <div className="w-full flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-1">
          <Typography variant="h5" className="text-slate-700">
            {mail?.subject}
          </Typography>
          <Typography variant="h6" className="text-slate-400">
            {mail?.sender?.email}
          </Typography>
        </div>
        <Typography variant="p" className="text-slate-700">
          {lines}
        </Typography>
      </div>
    );
  }
};

export default InboxPage;
