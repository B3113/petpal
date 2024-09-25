import { optional, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const petRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.pet.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        species: z.string(),
        breed: z.string(),
        birthDate: z.date(),
        image: z.string(),
        description: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pet.create({
        data: {
          name: input.name,
          species: input.species,
          breed: input.breed,
          birthDate: input.birthDate,
          image: input.image,
          description: input.description,
          status: input.status,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        species: z.string().optional(),
        breed: z.string().optional(),
        birthDate: z.date().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pet.update({
        where: { id: input.id },
        data: {
          name: input.name,
          species: input.species,
          breed: input.breed,
          birthDate: input.birthDate,
          image: input.image,
          description: input.description,
          status: input.status,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pet.delete({ where: { id: input.id } });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
