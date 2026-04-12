import { Webhook as SvixWebhook } from "svix";
import user from "../models/user.js";

// API controller to manage Clerk user with database
export const clerkWebhook = async (req, res) => {
  try {
    // create webhook instance
    const webhook = new SvixWebhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString('utf8')

    // verify webhook
    await webhook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = JSON.parse(payload);

    switch (type) {

      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        await user.create(userData);
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        await user.findByIdAndUpdate(data.id, userData);
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        await user.findByIdAndDelete(data.id);
        res.json({ success: true });
        break;
      }

      default:
        res.json({ message: "Event not handled" });
        break;
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhook;