import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const businessRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),

  create: protectedProcedure
  .input(z.object({
        logo: z.string().min(1),
        name: z.string().min(1),
        address: z.string().min(1),
        contactNumber: z.string().min(1),
        email: z.string().min(1),
        abn: z.string().min(1), 
    }))
  .mutation(async (opts) => { 
    const createdBusiness = await opts.ctx.db.business.create({
        data: {
            logo: opts.input.logo,
            name: opts.input.name,
            address: opts.input.address,
            contactNumber: opts.input.contactNumber,
            email: opts.input.email,
            createdById: opts.ctx.session.user.id,
            abn: opts.input.abn,
        },
    });
    return createdBusiness;
}),
  getBusiness: protectedProcedure.query(async (opts) => {
    const business = await opts.ctx.db.business.findMany()

    return {data: business.map((business) => ({id:business.id, name:business.name}))};
    
  })
,
  getSecretMessage: protectedProcedure.query(() => {
    return "this is a secret message!";
  }),
});