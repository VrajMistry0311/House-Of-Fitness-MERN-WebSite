import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Contact = () => {
  return (
    <div className="contactContainer">
      <div>
        <h1>Reach Out To Us</h1>
        <a
          target="blank"
          className="mailBtn"
          href="https://api.whatsapp.com/send?phone=918320696869&app=facebook&entry_point=page_cta">
          <Button><WhatsAppIcon className="whatsAppIcon" /> +91 83206 96869</Button>
        </a>
      </div>
    </div>
  );
};

export default Contact;
