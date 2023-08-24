import { useState } from "react";

import InboxContext from "../../contexts/inbox-context";

const InboxContextProvider = ({ children }) => {
  const [mailId, setMailId] = useState(0);
  return (
    <InboxContext.Provider
      value={{
        mailID: mailId,
        setMailID: setMailId,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
};

export default InboxContextProvider;
