import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const joinWaitlist = mutation({
    args: { name: v.string(), email: v.string() },
    handler: async (ctx, args) => {
        // Check if email already exists
        const existing = await ctx.db
            .query("waitlist")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existing) {
            return { success: false, message: "Email is already on the waitlist." };
        }

        // Add to waitlist table
        await ctx.db.insert("waitlist", {
            name: args.name,
            email: args.email,
        });

        return { success: true, message: "You're on the list!" };
    },
});
