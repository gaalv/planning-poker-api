/*
  Warnings:

  - You are about to drop the column `vote` on the `votes` table. All the data in the column will be lost.
  - Added the required column `value` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "votes" DROP COLUMN "vote",
ADD COLUMN     "value" TEXT NOT NULL;
