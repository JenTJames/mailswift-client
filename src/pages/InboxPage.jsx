import { useContext, useState, useEffect } from "react";

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
    console.log(inboxContext.mailID);
    const mailId = inboxContext.mailID;
    const getMail = async () => {
      const mail = await fetchMail("GET", "mails/" + mailId);
      if (!mail) setMail(mail);
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
        <div className="flex justify-center items-center w-7/12">
          <p className="text-slate-500 text-2xl">Select a mail</p>
        </div>
      </>
    );
  return <div>InboxPage</div>;
};

export default InboxPage;
