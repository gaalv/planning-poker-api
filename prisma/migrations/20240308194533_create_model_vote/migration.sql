/*
  Warnings:

  - You are about to drop the column `reveal` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `choice` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "reveal";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "choice";

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "vote" TEXT NOT NULL,
    "userId" TEXT,
    "roomId" TEXT,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
