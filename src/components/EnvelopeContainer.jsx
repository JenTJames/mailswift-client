import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import useHttp from "../hooks/use-http";

import EnvelopeContainerDetails from "./EnvelopeContainerDetails";
import Input from "./Input";
import Envelope from "./Envelope";
import Spinner from "./Spinner";
import Toast from "./Toast";

const EnvelopeContainer = () => {
  const [mails, setMails] = useState([]);

  const location = useLocation();

  const {
    fireRequest: fetchMails,
    isLoading: isFetchingMails,
    error: fetchMailsError,
    resetError: resetFetchMailsError,
  } = useHttp();

  useEffect(() => {
    const getMails = async () => {
      const endpoint = "mails/" + location.pathname.split("/")[1] + "/users/2";
      const response = await fetchMails("GET", endpoint);
      if (!response) return;
      setMails(response.data);
    };
    getMails();
  }, [location, fetchMails]);

  return (
    <>
      {isFetchingMails && <Spinner />}
      {fetchMailsError?.isError && (
        <Toast variant="error" updateError={resetFetchMailsError}>
          {fetchMailsError?.error}
        </Toast>
      )}
      <div className="w-[400px] border h-full flex flex-col gap-3 p-5">
        <EnvelopeContainerDetails />
        <Input
          variant="filled"
          startAdornment={<SearchRoundedIcon />}
          config={{
            placeholder: "Search",
          }}
        />
        <div className="flex flex-col">
          {mails.map((mail) => (
            <Envelope mail={mail} key={mail.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EnvelopeContainer;
