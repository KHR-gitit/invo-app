import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

  

export const clientRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),
  create: protectedProcedure
    .input(
      z.object({
        fName: z.string().min(1),
        lName: z.string().min(1),
        address: z.string().min(1),
        contactNumber: z.string().min(1),
        email: z.string().min(1),
        businessId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.client.create({
        data: {
          fName: input.fName,
          lName: input.lName,
          address: input.address,
          contactNumber: input.contactNumber,
          email: input.email,
          businessId: input.businessId,
        }
      })
    })
  })