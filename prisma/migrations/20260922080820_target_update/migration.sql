/*
  Warnings:

  - You are about to alter the column `targetAmount` on the `targets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `achievedAmount` on the `targets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `maturityAmount` on the `targets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "targets" ALTER COLUMN "targetAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "achievedAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "maturityAmount" SET DATA TYPE DECIMAL(10,2);
