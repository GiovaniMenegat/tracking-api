/*
  Warnings:

  - Added the required column `hash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "hashRt" TEXT;
