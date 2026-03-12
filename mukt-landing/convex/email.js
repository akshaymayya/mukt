import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendWelcomeEmail = action({
  args: { 
    name: v.string(), 
    email: v.string() 
  },
  handler: async (ctx, args) => {
    // We only send emails if it looks like a real email (not a Twitter/LinkedIn fallback ID)
    if (!args.email || !args.email.includes("@")) {
      return { success: false, reason: "Invalid email" };
    }

    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      
      if (!resendApiKey || resendApiKey === "placeholder_api_key") {
        console.warn("RESEND_API_KEY is not configured yet. Email was not sent.");
        return { success: false, reason: "missing_api_key" };
      }

      const resend = new Resend(resendApiKey);

      const data = await resend.emails.send({
        from: "Mukt <welcome@mukt.app>", // You will need to verify a domain in Resend to change this
        to: [args.email],
        subject: "Welcome to early access for Mukt!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #121826;">
            <h1 style="color: #00d094;">Welcome to Mukt, ${args.name}!</h1>
            <p>Thank you for supporting us by enrolling in early access.</p>
            <p>We are building a platform to help middle-income earners escape the predatory debt trap. By joining the waitlist, you will be one of the very first to get access to our Debt Map, Strategy Engine, and automated negotiation tools when we officially launch.</p>
            <br/>
            <p>We're working hard to finalize the platform. We will send you another email as soon as your account is ready to be fully activated.</p>
            <br/>
            <p>Hold on tight, the good times are coming.</p>
            <p><strong>- The Mukt Team</strong></p>
          </div>
        `
      });

      return { success: true, id: data.id };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message };
    }
  },
});
