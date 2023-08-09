import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";

const Restricted = ({ component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="w-full h-full bg-slate-100 flex">
      <Sidebar />
      {component}
    </div>
  );
};

export default Restricted;
