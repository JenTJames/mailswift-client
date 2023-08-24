import React from "react";

const InboxContext = React.createContext({
  mailID: 0,
  setMailID: () => {},
});

export default InboxContext;
