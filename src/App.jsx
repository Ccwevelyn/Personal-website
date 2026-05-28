import { Outlet } from "react-router-dom";
import { SiteCursor } from "./components/SiteCursor";

export default function App() {
  return (
    <>
      <SiteCursor />
      <Outlet />
    </>
  );
}
