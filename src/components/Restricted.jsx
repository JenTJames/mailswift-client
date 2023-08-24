import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import EnvelopeContainer from "./EnvelopeContainer";
import InboxContextProvider from "./Providers/InboxContextProvider";

const Restricted = ({ component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <InboxContextProvider>
      <div className="w-full h-full bg-slate-100 flex">
        <Sidebar />
        <EnvelopeContainer />
        {component}
      </div>
    </InboxContextProvider>
  );
};

export default Restricted;
