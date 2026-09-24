-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_locationId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_kamId_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "leads" ALTER COLUMN "kamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_kamId_fkey" FOREIGN KEY ("kamId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
