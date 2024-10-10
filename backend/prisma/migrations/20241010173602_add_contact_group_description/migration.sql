/*
  Warnings:

  - Added the required column `description` to the `contact_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_groups" ADD COLUMN     "description" TEXT NOT NULL;
