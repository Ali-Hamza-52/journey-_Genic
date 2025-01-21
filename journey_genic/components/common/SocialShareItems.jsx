"use client";
import React, { useState, useEffect } from "react";
import { Typography } from "../ui/typography";
import {
  EmailShare,
  FacebookShare,
  LinkedinShare,
  TwitterShare,
  WhatsappShare,
} from "react-share-kit";

const SocialShareItems = () => {
  const [url, setUrl] = useState("");
  
  // Fetch the current URL on the client side when the component moun
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href); // Set URL on the client side
    }
  }, []);

  return (
    <>
      <Typography variant="h4">Share</Typography>
      <div className="flex gap-3">
        {url && ( // Render components only when the URL is available
          <>
            <FacebookShare url={url} />
            <WhatsappShare url={url} />
            <LinkedinShare url={url} />
            <TwitterShare url={url} />
            <EmailShare url={url} />
          </>
        )}
      </div>
    </>
  );
};

export default SocialShareItems;
