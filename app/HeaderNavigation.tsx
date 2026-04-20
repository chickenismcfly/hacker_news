import { NavLink } from "react-router-dom";

const HeaderNavigation = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-lg text-hn-orange tracking-tight">
          Hacker News
        </span>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/top-stories"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-hn-orange"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            Top Stories
          </NavLink>
          <NavLink
            to="/new-stories"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-hn-orange"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            New Stories
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default HeaderNavigation;
