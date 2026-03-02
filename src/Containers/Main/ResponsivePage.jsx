import { useEffect, useState } from "react";
 export default function useResponsive() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [drawerHeight, setDrawerHeight] = useState(getDrawerHeight(window.innerWidth));

  const isMobile = windowWidth <= 600;
  const isTablet = windowWidth > 600 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  function getDrawerHeight(width) {
    if (width <= 600) return "65.5vh";         // mobile
    if (width <= 1024) return "73vh";        // tablet
    return "82vh";                           // desktop
  }

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setWindowWidth(width);
      setDrawerHeight(getDrawerHeight(width));
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop, drawerHeight };
}
