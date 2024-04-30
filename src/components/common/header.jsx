import { useState, useContext, useEffect } from "react";
import {
  ABOUT_URL,
  HOME_URL,
  PROJECTS_URL,
  TRANSITION_DELAY,
} from "../../utils/constants";
import HamburgerSVG from "../../assets/hamburger-svg";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import Name from "./name";
import useFetchPortfolio from "../../hooks/useFetchPortfolio";
import PageContext from "../../contexts/PageContext";

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const {
    currentPage,
    setCurrentPage,
    nextPage,
    setNextPage,
    state,
    dispatch,
  } = useContext(PageContext);
  const screenSize = useScreenSize();
  const { name } = useFetchPortfolio();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (state?.route === currentPage && state?.status === "done") {
      processNav(nextPage);
    }
  }, [state]);

  const processNav = (route) => {
    setCurrentPage(route);
    navigate(route);
  };

  const signalFadeOut = (nextRoute) => {
    if (nextRoute !== currentPage) {
      setMenuOpen(!menuOpen);
      setNextPage(nextRoute);
      dispatch({
        type: "close",
        route: currentPage,
      });
    }
  };

  return (
    <div className="">
      {/* Header */}
      {screenSize?.width < 640 && (
        <>
          <div className="flex h-14 justify-between">
            <Name name={name} />
            <button
              id="sidebar-toggle"
              className={`text-white rotate-${menuOpen ? "45" : "0"} transition duration-200 ease-in-out focus:outline-none`}
              onClick={() => {
                console.log("menuOpen: " + menuOpen);
                setMenuOpen(!menuOpen);
              }}
            >
              <HamburgerSVG />
            </button>
          </div>

          <div
            id="sidebar"
            className={`duration-${TRANSITION_DELAY} fixed bottom-0 left-0 top-0 z-50 flex w-52 -translate-x-full transform flex-col place-content-between bg-gray-100 px-4 py-4 transition ease-in-out dark:bg-gray-800 ${menuOpen ? "translate-x-0" : ""}`}
          >
            <nav
              className={`duration-${TRANSITION_DELAY} flex flex-col space-y-3 pt-4 text-black transition-colors ease-in-out dark:text-white`}
            >
              <div
                className={""}
                onClick={() => {
                  signalFadeOut(HOME_URL);
                }}
              >
                home
              </div>
              <div
                className={""}
                onClick={() => {
                  signalFadeOut(ABOUT_URL);
                }}
              >
                about me
              </div>
              <div
                className={""}
                onClick={() => {
                  signalFadeOut(PROJECTS_URL);
                }}
              >
                projects
              </div>
              {/* <div
                className={""}
                onClick={() => {
                  signalFadeOut(CONTACT_URL);
                }}
              >
                contact me
              </div> */}
            </nav>

            {/* Dark mode slider */}
            <div className="w-full justify-self-end pb-16">
              <Switch
                checked={darkMode}
                onChange={() => {
                  console.log("toggle dark mode");
                  setDarkMode(!darkMode);
                }}
              />
              <span className="text-black dark:text-white">Dark Mode</span>
            </div>
          </div>

          {menuOpen && (
            <div
              className="fixed top-0 z-20 h-screen w-screen bg-black opacity-60"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            ></div>
          )}
        </>
      )}
      {screenSize?.width >= 640 && (
        <nav className={"flex h-14 justify-between p-1"}>
          <ul className={"flex flex-row justify-center space-x-4"}>
            <li className={"content-center"}>
              <div
                className={"hover:cursor-pointer"}
                onClick={() => {
                  signalFadeOut(HOME_URL);
                }}
              >
                home
              </div>
            </li>
            <li className={"content-center"}>
              <div
                className={"hover:cursor-pointer"}
                onClick={() => {
                  signalFadeOut(ABOUT_URL);
                }}
              >
                about me
              </div>
            </li>
            <li className={"content-center"}>
              <div
                className={"hover:cursor-pointer"}
                onClick={() => {
                  signalFadeOut(PROJECTS_URL);
                }}
              >
                projects
              </div>
            </li>
            {/* <li className={"content-center"}>
              <div
                className={"hover:cursor-pointer"}
                onClick={() => {
                  signalFadeOut(CONTACT_URL);
                }}
              >
                contact me
              </div>
            </li> */}
          </ul>
          <Name name={name} />
        </nav>
      )}
    </div>
  );
};

export default Header;