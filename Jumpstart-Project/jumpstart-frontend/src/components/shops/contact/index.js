import React, { Fragment } from "react";
import Layout from "../layout";
import ContactContent from "./ContactContent";

const About = () => {
  return (
    <Fragment>
      <Layout children={<ContactContent />} />
    </Fragment>
  );
};

export default About;
