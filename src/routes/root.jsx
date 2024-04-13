import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { TRANSITION_DELAY } from "../utils/constants";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useScreenSize from "../hooks/useScreenSize";
import "../FadeTransition.css";
import Footer from "../components/footer";
import Header from "../components/header";
import Body from "../components/pages/body";
import { PageProvider } from "../contexts/PageContext";

const Root = () => {
  let location = useLocation();
  const screenSize = useScreenSize();
  const currentYear = new Date().getFullYear();
  const [darkMode, setDarkMode] = useState(false);

  const nodeRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    console.log("screen resolution: " + JSON.stringify(screenSize));
    console.log("location: " + JSON.stringify(location));
  }, []);

  return (
    <PageProvider>
      <div
        className={`${darkMode ? "dark" : ""} duration-${TRANSITION_DELAY} flex min-h-screen flex-col justify-between bg-white p-3 transition-colors ease-in-out dark:bg-gray-800`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Body>
          <Outlet />
        </Body>
        <Footer darkMode={darkMode} currentYear={currentYear} />
      </div>
    </PageProvider>
  );
};

export default Root;
