import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { businessRouter } from "./routers/business";
import { clientRouter } from "./routers/client";
import { invoiceRouter } from "./routers/invoice";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  bussiness: businessRouter,
  client: clientRouter,
  invoice: invoiceRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
