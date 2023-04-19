import React, { Fragment } from "react";
import Layout from "../layout";
import AboutContent from "./AboutContent";

const About = () => {
  return (
    <Fragment>
      <Layout children={<AboutContent />} />
    </Fragment>
  );
};

export default About;
