import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "./providers";
import HeaderNavigation from "./header-navigation";
import TopStoriesPage from "./top-stories/page";
import NewStoriesPage from "./new-stories/page";

export function App() {
  return (
    <Providers>
      <BrowserRouter basename="/hacker_news">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-700 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <HeaderNavigation />
        <main id="main-content" tabIndex={-1} className="bg-primary-50 min-h-screen">
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
