import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../../ProductPhoto/logo.jpg"
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/hf_house_of_fitness/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              className="logoImage"
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={logo}
              alt="Founder"
            />
            <Typography>House Of Fitness</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              House of Fitness is a supplement store curated for everyone's nutrition, health, and supplemental needs.
              We offer the lowest prices with 100% original and authentic products to our customers with single call customer service and lightning fast delivery.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/houseoffitnessahm"
              target="blank"
            >
              <FacebookIcon className="facebookSvgIcon" />
            </a>

            <a href="https://www.instagram.com/hf_house_of_fitness/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
