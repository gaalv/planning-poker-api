/*
  Warnings:

  - Added the required column `reveal` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "reveal" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "choice" TEXT NOT NULL DEFAULT '';
