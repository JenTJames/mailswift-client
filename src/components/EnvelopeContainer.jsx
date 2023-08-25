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
    setMails(response.data);
  }, [location, fetchMails]);

  useEffect(() => {
    getMails();
  }, [getMails]);

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
          totalUnread={mails.length}
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
              <Envelope mail={mail} key={mail.id} />
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
