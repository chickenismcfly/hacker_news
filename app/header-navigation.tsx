import { NavLink } from "react-router-dom";
import { ThemeSelector } from "@/app/components/theme-selector";

const HeaderNavigation = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-primary-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-lg text-primary-700 tracking-tight">
          Hacker News
        </span>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <NavLink
              to="/top-stories"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-600"
                    : "text-slate-600 hover:text-primary-700"
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
                    ? "text-primary-600"
                    : "text-slate-600 hover:text-primary-700"
                }`
              }
            >
              New Stories
            </NavLink>
          </nav>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
