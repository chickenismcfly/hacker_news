import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "./providers";
import HeaderNavigation from "./header-navigation";
import TopStoriesPage from "./top-stories/page";
import NewStoriesPage from "./new-stories/page";

export function App() {
  return (
    <Providers>
      <BrowserRouter basename="/hacker_news">
        <HeaderNavigation />
        <main className="bg-primary-50 min-h-screen">
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
