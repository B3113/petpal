import { optional, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const adoptRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.adoptionRequest.findMany({
        where: { userId: input.id },
        include: { pet: true, user: true } 
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role != "admin") {
      throw new Error("You are not authorized to perform this action");
    }
    return await ctx.db.adoptionRequest.findMany(
      { include: { pet: true, user: true } },
    );
  }),

  create: protectedProcedure
    .input(
      z.object({
        petId: z.string(),
        userId: z.string(),
        career: z.string(),
        birthdate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.adoptionRequest.create({
        data: {
          petId: input.petId,
          userId: input.userId,
          birthdate: input.birthdate,
          career: input.career,
          status: "pending",
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        specie: z.string().optional(),
        breed: z.string().optional(),
        birthdate: z.string().optional(),
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
          specie: input.specie,
          breed: input.breed,
          birthdate: input.birthdate,
          image: input.image,
          description: input.description,
          status: input.status,
        },
      });
    }),

 approve: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.adoptionRequest.update({
        where: { id: input.id },
        data: {
          status: "approved",
        },
      });
    }),

  reject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.adoptionRequest.update({
        where: { id: input.id },
        data: {
          status: "rejected",
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
