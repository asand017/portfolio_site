import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { HOME_URL } from "../utils/constants";
import { parseLetters } from "../utils/utils";
import PageContext from "../contexts/PageContext";
import anime from "animejs/lib/anime.es.js";

const Name = ({ name }) => {
  const { currentPage, setCurrentPage, state, dispatch } = useContext(PageContext);
  const navigate = useNavigate();
  const typedTitle = parseLetters("<" + name + "/>");

  useEffect(() => {
    anime
      .timeline({ duration: 75 })
      .add({
        targets: ".typed-container .name-letter",
        opacity: [0, 1],
        easing: "easeInCubic",
        delay: (el, i) => 100 * (i + 1),
      });
  }, []);

  useEffect(() => {
    console.log("currentPager: " + currentPage);
    console.log("state changed detected: " + JSON.stringify(state));
    // if(state?.route === currentPage){
      if(state?.status === "done"){
        setCurrentPage(HOME_URL);
        navigate(HOME_URL);
      }
    // }
  }, [state]);

  const goHome = () => {
    console.log("current page (from name comp): " + currentPage);
    dispatch({
      type: "close",
      route: currentPage
    })
  }

  return (
    <div
      className="typed-container flex justify-center items-center content-center text-xl
       md:text-5xl hover:cursor-pointer"
      onClick={async () => {
        goHome();
      }}
    >
      {typedTitle.map((letter, index) => (
        <span key={index} className="name-letter">
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Name;
