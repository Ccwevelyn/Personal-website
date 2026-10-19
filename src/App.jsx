import { Outlet, ScrollRestoration } from "react-router-dom";
import { SiteCursor } from "./components/SiteCursor";

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <SiteCursor />
      <Outlet />
    </>
  );
}
