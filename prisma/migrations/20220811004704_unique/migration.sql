/*
  Warnings:

  - A unique constraint covering the columns `[userId,categoryId]` on the table `UserCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCategory_userId_categoryId_key" ON "UserCategory"("userId", "categoryId");
