/*
  Warnings:

  - You are about to drop the column `clientOldId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `fullAddress` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `thana` on the `clients` table. All the data in the column will be lost.
  - The `clientType` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `mrc` on the `connectivity_locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `otc` on the `connectivity_locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `tkPerMb` on the `connectivity_locations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `mrcAmount` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `otcAmount` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `maturityPercentage` on the `leads` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `percentage` on the `maturity_histories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `oldMrcAmount` on the `maturity_histories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `newMrcAmount` on the `maturity_histories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `oldOtcAmount` on the `maturity_histories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `newOtcAmount` on the `maturity_histories` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - Added the required column `organizationName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `locationId` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_locationId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_teamLeadId_fkey";

-- DropIndex
DROP INDEX "clients_clientOldId_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "clientOldId",
DROP COLUMN "companyName",
DROP COLUMN "district",
DROP COLUMN "division",
DROP COLUMN "fullAddress",
DROP COLUMN "thana",
ADD COLUMN     "clientClass" "ClientClass" NOT NULL DEFAULT 'new',
ADD COLUMN     "clientDesignation" TEXT,
ADD COLUMN     "clientIndustry" TEXT,
ADD COLUMN     "detailedAddress" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "houseHold" TEXT,
ADD COLUMN     "organizationName" TEXT NOT NULL,
DROP COLUMN "clientType",
ADD COLUMN     "clientType" "ClientType" NOT NULL DEFAULT 'CORP',
ALTER COLUMN "locationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "connectivity_locations" ALTER COLUMN "mrc" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "otc" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "tkPerMb" SET DATA TYPE DECIMAL(11,2);

-- AlterTable
ALTER TABLE "leads" ALTER COLUMN "teamLeadId" DROP NOT NULL,
ALTER COLUMN "detailedAddress" SET DEFAULT '',
ALTER COLUMN "mrcAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "otcAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "maturityPercentage" SET DATA TYPE DECIMAL(11,2);

-- AlterTable
ALTER TABLE "maturity_histories" ALTER COLUMN "percentage" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "oldMrcAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "newMrcAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "oldOtcAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "newOtcAmount" SET DATA TYPE DECIMAL(11,2);

-- AlterTable
ALTER TABLE "targets" ALTER COLUMN "targetAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "achievedAmount" SET DATA TYPE DECIMAL(11,2),
ALTER COLUMN "maturityAmount" SET DATA TYPE DECIMAL(11,2);

-- CreateIndex
CREATE INDEX "clients_clientType_idx" ON "clients"("clientType");

-- CreateIndex
CREATE INDEX "clients_clientClass_idx" ON "clients"("clientClass");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
