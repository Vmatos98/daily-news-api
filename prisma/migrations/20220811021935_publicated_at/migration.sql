/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,id]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicatedAt` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "publicatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_categoryId_id_key" ON "News"("categoryId", "id");
