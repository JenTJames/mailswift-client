import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, Tooltip, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import { DateTime } from "luxon";

import InboxContext from "../contexts/inbox-context";
import useHttp from "../hooks/use-http";

import Avatar from "./Avatar";
import Spinner from "./Spinner";
import Toast from "./Toast";

const Envelope = ({ mail, filterMails, markMailAsRead }) => {
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isSpamHovered, setIsSpamHovered] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");

  const inboxContext = useContext(InboxContext);

  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname.split("/")[1]);
  }, [location]);

  const {
    fireRequest: flagMail,
    isLoading: isFlaggingMail,
    error: flagMailError,
    resetError: resetFlagMailError,
  } = useHttp();

  const getDate = (timestamp) => {
    const date = DateTime.fromISO(timestamp);
    const today = DateTime.local().startOf("day");
    const yesterday = today.minus({ days: 1 });

    if (date.hasSame(today, "day")) {
      return date.toFormat("hh:mm a");
    } else if (date.hasSame(yesterday, "day")) {
      return "Yesterday";
    } else {
      return date.toFormat("MMM dd, yyyy");
    }
  };

  const truncateText = (text) => {
    const maxLength = 67;
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
  };

  const loadMailHandler = () => {
    inboxContext.setMailID(mail.id);
    if (mail.isRead === false) markMailAsRead(mail.id);
  };

  const flagMailHandler = async (flag, value = true) => {
    const response = await flagMail(
      "PUT",
      `mails/${mail.id}?flag=${flag}&flagValue=${value}`
    );
    if (!response.isSuccess) return;
    filterMails(mail.id);
    inboxContext.setMailID(0);
  };

  const deleteMailHandler = () => {
    console.log("Deleting Mail...");
  };

  return (
    <>
      {isFlaggingMail && <Spinner />}
      {flagMailError?.isError && (
        <Toast variant="error" updateError={resetFlagMailError}>
          {flagMailError?.error}
        </Toast>
      )}
      <div
        style={{
          borderLeft: !mail.isRead ? "5px solid #22C55E" : "",
        }}
        className="flex items-center w-full border rounded-md gap-3 hover:bg-emerald-100 cursor-pointer p-2"
        onClick={loadMailHandler}
      >
        <Avatar variant="circle" bgColor="orange" />
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <Typography variant="p" className="text-slate-500">
              {mail.sender.id ? mail.sender.name : mail.receiver.name}
            </Typography>
            <Typography variant="p" className="text-slate-500">
              {getDate(mail.sentAt)}
            </Typography>
          </div>
          <Typography variant="h6" className="text-slate-700">
            {mail.subject}
          </Typography>
          <Typography variant="p" className="text-slate-500">
            {truncateText(mail.body)}
          </Typography>
          {currentRoute !== "sent-mails" && (
            <div className="flex justify-end">
              <Tooltip
                title={currentRoute === "trash" ? "Delete" : "Move to Trash"}
              >
                <IconButton
                  onClick={() => {
                    currentRoute === "trash"
                      ? deleteMailHandler()
                      : flagMailHandler("trash");
                  }}
                  onMouseEnter={() => setIsDeleteHovered(true)}
                  onMouseLeave={() => setIsDeleteHovered(false)}
                >
                  <DeleteOutlineRoundedIcon
                    color={isDeleteHovered ? "error" : "disabled"}
                  />
                </IconButton>
              </Tooltip>
              {currentRoute !== "trash" && (
                <Tooltip
                  title={currentRoute === "spam" ? "Unspam" : "Mark as Spam"}
                >
                  <IconButton
                    onClick={() => {
                      flagMailHandler(
                        "spam",
                        currentRoute === "spam" ? false : true
                      );
                    }}
                    onMouseEnter={() => setIsSpamHovered(true)}
                    onMouseLeave={() => setIsSpamHovered(false)}
                  >
                    <OutlinedFlagTwoToneIcon
                      color={isSpamHovered ? "warning" : "disabled"}
                    />
                  </IconButton>
                </Tooltip>
              )}
              {currentRoute === "trash" && (
                <Tooltip title="Restore">
                  <IconButton
                    onClick={() => {
                      flagMailHandler("trash", false);
                    }}
                    onMouseEnter={() => setIsSpamHovered(true)}
                    onMouseLeave={() => setIsSpamHovered(false)}
                  >
                    <RestoreRoundedIcon
                      color={isSpamHovered ? "success" : "disabled"}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Envelope;
