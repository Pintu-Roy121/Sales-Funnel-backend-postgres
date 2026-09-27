/*
  Warnings:

  - You are about to drop the column `district` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `thana` on the `leads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "leads" DROP COLUMN "district",
DROP COLUMN "division",
DROP COLUMN "thana";
