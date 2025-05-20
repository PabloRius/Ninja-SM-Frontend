import { Prisma } from "@prisma/client";

export const product: Prisma.ProductDefaultArgs = {};

export type Product = Prisma.ProductGetPayload<typeof product>;
