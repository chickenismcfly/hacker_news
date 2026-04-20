import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "./Providers";
import HeaderNavigation from "./HeaderNavigation";
import TopStoriesPage from "./top-stories/page";
import NewStoriesPage from "./new-stories/page";

export function App() {
  return (
    <Providers>
      <BrowserRouter>
        <HeaderNavigation />
        <main className="bg-slate-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/top-stories" replace />} />
              <Route path="/top-stories" element={<TopStoriesPage />} />
              <Route path="/new-stories" element={<NewStoriesPage />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </Providers>
  );
}
