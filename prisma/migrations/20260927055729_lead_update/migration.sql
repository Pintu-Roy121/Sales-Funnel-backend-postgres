/*
  Warnings:

  - You are about to drop the column `district` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `packageName` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `serviceType` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `thana` on the `leads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "connectivity_locations" ALTER COLUMN "packageName" DROP NOT NULL,
ALTER COLUMN "packageName" DROP DEFAULT,
ALTER COLUMN "remarks" DROP NOT NULL,
ALTER COLUMN "remarks" DROP DEFAULT;

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "district",
DROP COLUMN "division",
DROP COLUMN "packageName",
DROP COLUMN "serviceType",
DROP COLUMN "thana",
ALTER COLUMN "detailedAddress" DROP DEFAULT;
