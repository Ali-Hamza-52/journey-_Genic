import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const requestData = await req.json();

    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: "alihamzabrw52@gmail.com",
      subject: requestData.subject,
      html: `
     <div
  style="
    max-width: 380px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  "
>
  <h2 style="color: #664bff; margin-bottom: 20px">Hi, Ali Hamza</h2>
  <div style="margin-bottom: 20px">
    <label style="display: block; margin-bottom: 10px; color: #3a2525"
      >Received Message From:</label
    >
    <p
      style="
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      Name: ${requestData.name}<br />
      Email: ${requestData.email}
    </p>
  </div>
  <div style="margin-bottom: 20px">
    <label style="display: block; margin-bottom: 10px; color: #333"
      >Subject:</label
    >
    <p
      style="
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      ${requestData.subject}
    </p>
  </div>
  <div style="margin-bottom: 20px">
    <label style="display: block; margin-bottom: 10px; color: #333"
      >Message:</label
    >
    <p
      style="
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      ${requestData.message}
    </p>
  </div>
</div>

    `,
    });

    if (error) {
      return NextResponse.json(
        { message: "Error sending emails" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });

  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Email not sent successfully",
    });
  }
}
