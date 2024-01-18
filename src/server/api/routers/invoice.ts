import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const invoiceRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),

  getInvoice: protectedProcedure.input(z.object({id: z.string()})).query(async({ctx,input})=>{
    const invoice = await ctx.db.invoice.findUnique({where:{id:input.id}})
    if (!invoice) throw new Error('Invoice not found')
    const client = await ctx.db.client.findUnique({where:{id:invoice.clientId}})
    if (!client) throw new Error('Client not found')
    const business = await ctx.db.business.findUnique({where:{id:invoice.businessId}})
    if (!business) throw new Error('Business not found')
    return {

        id: input.id,
        invoice_no: invoice.invoiceId ?? 2,
        clientData: {
          fullName: `${client.fName ?? ''} ${client.lName ?? ''}`,
          address: client.address,
          phone: client.contactNumber,
          email: client.email


        },
        businessData:{
          logo: business.logo,
          company: business.name,
          email: business.email,
          abn: business.abn,
          phone: business.contactNumber,
          address: business.address,
        },

        trans_date:new Intl.DateTimeFormat('en-AU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(invoice.createdAt),
        due_date: new Intl.DateTimeFormat('en-AU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(invoice.dueDate),
        items: invoice.items,
        quote: invoice.quote,

      }
    }
  ),

  createInvoice: protectedProcedure
  .input(z.object({ 
    clientId:z.string(),
    businessId:z.string(),
    items: z.array(z.object({
      sno: z.number(),
      name: z.string(),
      desc: z.string(),
      qty: z.number(),
      rate: z.number(),
    })),
    quote: z.boolean(),
    dueDate: z.date()

   }))
  .mutation(async (opts) => {
    await Promise.all(opts.input.items.map(
      async (item)  =>( await opts.ctx.db.item.findUnique({ where: { name: item.name } })?
      {}: opts.ctx.db.item.create({data:{name:item.desc}}))
    ))

    return await opts.ctx.db.invoice.create({
      data: {
        clientId: opts.input.clientId,
        items: opts.input.items,
        quote: opts.input.quote,
        businessId: opts.input.businessId,
        dueDate: opts.input.dueDate
      },
    });
  })
  ,
  getItem: protectedProcedure.query(async (opts) => {
    const item = await opts.ctx.db.item.findMany()

    return {data: item.map((item) => ({id:item.id, name:item.name}))};
    
  })
  ,
  getSecretMessage: protectedProcedure.query(() => {
    return "this is a secret message!";
  }),
});
