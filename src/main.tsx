import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import { Why } from "./pages/Why.tsx";
import { Blog } from "./pages/Blog.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/why" element={<Why />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
