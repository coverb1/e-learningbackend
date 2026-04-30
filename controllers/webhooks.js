import { Webhook } from 'svix';
import User from '../models/user.js';

export const clerkWebhook = async (req, res) => {
  try {
    // Create Svix webhook instance
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Get raw body
    const payload = req.body;

    // Get headers from Clerk
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook
    const event = webhook.verify(payload, headers);
    const { type, data } = event;

    switch (type) {

      // User created
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        break;
      }

      // User updated
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        break;
      }

      // User deleted
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      }
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log("Webhook error:", error.message);
    console.log("Full error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};