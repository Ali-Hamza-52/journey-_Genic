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
      <Typography weight="semiBold" variant="h5">Share</Typography>
      <div className="flex gap-3 mt-2">
        {url && ( // Render components only when the URL is available
          <>
            <FacebookShare url={url} size={40}/>
            <WhatsappShare url={url} size={40}/>
            <LinkedinShare url={url} size={40}/>
            <TwitterShare url={url} size={40}/>
            <EmailShare url={url} size={40}/>
          </>
        )}
      </div>
    </>
  );
};

export default SocialShareItems;
