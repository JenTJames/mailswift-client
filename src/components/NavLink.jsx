import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ children, icon, to }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? "text-emerald-500 p-2 hover:bg-emerald-200 hover:text-emerald-500 font-bold rounded-md"
          : "text-slate-400 p-2 hover:bg-emerald-200 hover:text-emerald-500 rounded-md";
      }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-lg">{children}</p>
      </div>
    </RouterNavLink>
  );
};

export default NavLink;
