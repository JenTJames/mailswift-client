import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import useHttp from "../hooks/use-http";

import EnvelopeContainerDetails from "./EnvelopeContainerDetails";
import Input from "./Input";
import Envelope from "./Envelope";
import Toast from "./Toast";
import { Typography } from "@mui/material";

const EnvelopeContainer = () => {
  const [mails, setMails] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);

  const location = useLocation();

  const {
    fireRequest: fetchMails,
    isLoading: isFetchingMails,
    error: fetchMailsError,
    resetError: resetFetchMailsError,
  } = useHttp();

  const getMails = useCallback(async () => {
    const token = localStorage.getItem("token");
    const payload = token.split(".")[1];
    const { id } = JSON.parse(atob(payload));
    const endpoint =
      "mails/" + location.pathname.split("/")[1] + "/users/" + id;
    const response = await fetchMails("GET", endpoint);
    if (!response) return;
    setTotalUnread(
      response.data.filter((mail) => mail.isRead === false).length
    );
    setMails(response.data);
  }, [location, fetchMails]);

  useEffect(() => {
    getMails();
  }, [getMails]);

  const filterMails = (id) => {
    setMails((currentMails) => currentMails.filter((mail) => mail.id !== id));
  };

  const markMailAsRead = (id) => {
    setMails((currentMails) => {
      const tempMails = [...currentMails];
      const targetMailIndex = tempMails.findIndex((mail) => mail.id === id);
      if (tempMails[targetMailIndex].isRead === true) return currentMails;
      tempMails[targetMailIndex].isRead = true;
      return tempMails;
    });
    setTotalUnread((currentUnread) => --currentUnread);
  };

  return (
    <>
      {fetchMailsError?.isError && (
        <Toast variant="error" updateError={resetFetchMailsError}>
          {fetchMailsError?.error}
        </Toast>
      )}
      <div className="w-6/12 border h-full flex flex-col gap-3 p-5">
        <EnvelopeContainerDetails
          totalMessages={mails.length}
          totalUnread={totalUnread}
          refreshInbox={getMails}
          animateReloadIcon={isFetchingMails}
        />
        <Input
          variant="filled"
          startAdornment={<SearchRoundedIcon />}
          config={{
            placeholder: "Search",
          }}
        />
        {mails.length > 0 ? (
          <div className="flex flex-col">
            {mails.map((mail) => (
              <Envelope
                key={mail.id}
                mail={mail}
                filterMails={filterMails}
                markMailAsRead={markMailAsRead}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-center items-center">
            <Typography variant="subtitle1" className="text-slate-400">
              You don't have any mail
            </Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default EnvelopeContainer;
