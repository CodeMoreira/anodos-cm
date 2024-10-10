/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `contact_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contact_groups_name_key" ON "contact_groups"("name");
