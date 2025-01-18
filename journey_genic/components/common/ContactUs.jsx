"use client";

import React from "react";
import MainSectionWrapper from "./MainSectionWrapper";
import { Typography } from "../ui/typography";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/helpers/schemas/contact.schema";
import Swal from "sweetalert2";
import axiosInstance from "@/lib/axiosInstance";
import { Spinner } from "../ui/spinner"; 

const ContactUs = () => {
  //loading state
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });
  const sendMailToMe = async (formdata) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/send", formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        reset();
        setIsLoading(false);
        Swal.fire({
          title: "Email Sent!",
          text: "Email sent successfully",
          icon: "success",
        });
      } else {
        setIsLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Error sending email",
          icon: "error",
        });
      }
    } catch (err) {
      setIsLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Message Not Sent!",
        icon: "error",
      });
    }
  };

  const onSubmit = (data) => {
    console.log("Form Submitted: ", data);
    sendMailToMe(data);
  };

  return (
    <MainSectionWrapper>
      <div className="flex flex-col gap-5 py-6 justify-center items-center">
        <Typography variant="h3" weight="bold">
          Get In Touch
        </Typography>
        <Typography variant="t1">
          Feel free to contact us! Submit your queries here and we will get back
          to you as soon as possible.
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 w-full">
          {/* Address Card */}
          <div className="bg-gradient-to-br from-[#eef2fe] via-[#eef2fe] to-[#eef2fe] group hover:from-[#5046e5] hover:via-[#6a5de5] hover:to-[#8a7be5] transition-all duration-1000 flex flex-col items-center rounded-sm shadow-xl gap-3 py-10 px-2">
            <MapPin className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000" />
            <Typography
              className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000"
              weight="bold"
            >
              Address
            </Typography>
            <Typography className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000">
              Madina Garden Barkey Burewala
            </Typography>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-[#eef2fe] via-[#eef2fe] to-[#eef2fe] group hover:from-[#5046e5] hover:via-[#6a5de5] hover:to-[#8a7be5] transition-all duration-1000 flex flex-col items-center rounded-sm shadow-xl gap-3 py-10 px-2">
            <Phone className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000" />
            <Typography
              className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000"
              weight="bold"
            >
              Contact
            </Typography>
            <Typography className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000">
              +923063099643
            </Typography>
          </div>

          {/* Email Card */}
          <div className="bg-gradient-to-br from-[#eef2fe] via-[#eef2fe] to-[#eef2fe] group hover:from-[#5046e5] hover:via-[#6a5de5] hover:to-[#8a7be5] transition-all duration-1000 flex flex-col items-center rounded-sm shadow-xl gap-3 py-10 px-2">
            <Mail className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000" />
            <Typography
              className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000"
              weight="bold"
            >
              Email
            </Typography>
            <Typography className="text-[#6a63ea] group-hover:text-white transition-colors duration-1000">
              alihamzabrw52@gmail.com
            </Typography>
          </div>
        </div>

        {/* Map and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* Map */}
          <div className="w-full h-full aspect-video rounded-lg shadow-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1058.7124766690545!2d72.70032619640237!3d30.153167700296425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393cdec4cfa81e59%3A0xabff04fb9f35d4d0!2sBurewala%2C%20Vehari%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1733395442210!5m2!1sen!2s"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-3 w-full p-6 rounded-lg shadow-2xl bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" weight="bold" className="mb-3">
              Send us a Message
            </Typography>
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Your Name"
                className={`w-full py-3 px-4 rounded-sm focus:outline-blue-700 focus-visible:outline-blue-700 shadow-2xl ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                className={`w-full py-3 px-4 rounded-sm focus:outline-blue-700 focus-visible:outline-blue-700 shadow-2xl ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("subject")}
                type="text"
                placeholder="Your Subject"
                className={`w-full py-3 px-4 rounded-sm focus:outline-blue-700 focus-visible:outline-blue-700 shadow-2xl ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("message")}
                placeholder="Your Message"
                className={`w-full h-36 py-3 px-4 rounded-md focus:outrounded-smne-none resize-none focus-visible:outline-blue-700 shadow-2xl ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isLoading ? <Spinner /> : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </MainSectionWrapper>
  );
};

export default ContactUs;
