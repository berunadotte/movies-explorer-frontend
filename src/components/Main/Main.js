import React from "react";
import Header from "../Header/Header";
import AboutMe from "./AboutMe/AboutMe";
import Promo from "./Promo/Promo";
import Portfolio from "./Portfolio/Portfolio";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
      <Header />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
