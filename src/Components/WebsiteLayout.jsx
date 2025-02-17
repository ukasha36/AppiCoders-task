import { i } from "framer-motion/client";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../src/views/webComponents/Home//Header/Header";

import { useEffect } from "react";

export default function WebsiteLayout() {
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
}
