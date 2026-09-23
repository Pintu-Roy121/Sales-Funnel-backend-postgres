-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('CORP', 'HOME', 'SOHO');

-- CreateEnum
CREATE TYPE "ClientClass" AS ENUM ('new', 'existing', 'lost');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('open', 'won', 'lost', 'junk');

-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('pending', 'noc_pending', 'fiber_pending', 'system_pending', 'sdv_pending', 'done', 'rejected');

-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('pending', 'in_progress', 'active', 'suspended', 'canceled');

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "locationId" INTEGER;

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "kamId" INTEGER NOT NULL,
    "teamLeadId" INTEGER NOT NULL,
    "atlId" INTEGER,
    "createdById" INTEGER,
    "clientType" "ClientType" NOT NULL DEFAULT 'CORP',
    "clientClass" "ClientClass" NOT NULL DEFAULT 'new',
    "organizationName" TEXT,
    "division" TEXT NOT NULL,
    "detailedAddress" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "clientFName" TEXT NOT NULL,
    "clientLName" TEXT NOT NULL,
    "clientDesignation" TEXT,
    "clientMobileNumber" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientIndustry" TEXT,
    "houseHold" TEXT,
    "existingPreviousIsp" TEXT,
    "connectivityMethod" TEXT NOT NULL,
    "serviceClass" TEXT NOT NULL,
    "serviceType" TEXT[],
    "addOnType" TEXT NOT NULL DEFAULT 'none',
    "packageName" TEXT,
    "interactionCount" INTEGER NOT NULL DEFAULT 0,
    "mrcAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "otcAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "expectedClosingMonth" TEXT NOT NULL,
    "maturityStage" TEXT NOT NULL DEFAULT 'Lead Generated',
    "maturityPercentage" DECIMAL(65,30) NOT NULL DEFAULT 10,
    "remarks" TEXT,
    "expectedActivationDate" TIMESTAMP(3),
    "lostNote" TEXT,
    "wonDocumentUrl" TEXT,
    "proposalDocumentUrl" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'open',
    "totalUser" INTEGER NOT NULL DEFAULT 0,
    "activationStatus" "ActivationStatus" NOT NULL DEFAULT 'pending',
    "actualActivationDate" TIMESTAMP(3),
    "startBillingDate" TIMESTAMP(3),
    "isActivationMailSend" BOOLEAN NOT NULL DEFAULT false,
    "isBillingMailSend" BOOLEAN NOT NULL DEFAULT false,
    "billingStatus" "BillingStatus" NOT NULL DEFAULT 'pending',
    "popName" TEXT NOT NULL DEFAULT '',
    "nid" TEXT,
    "serviceId" TEXT,
    "billingAccess" TEXT,
    "myStoreId" TEXT,
    "ticketId" TEXT,
    "pppoeUser" TEXT,
    "pppoePassword" TEXT,
    "ispType" TEXT NOT NULL DEFAULT '',
    "locationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maturity_histories" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "stage" TEXT NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "oldMrcAmount" DECIMAL(65,30),
    "newMrcAmount" DECIMAL(65,30),
    "oldOtcAmount" DECIMAL(65,30),
    "newOtcAmount" DECIMAL(65,30),
    "oldExpectedClosingMonth" TEXT,
    "newExpectedClosingMonth" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL DEFAULT 'Pipeline metrics updated.',

    CONSTRAINT "maturity_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connectivity_locations" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "packageName" TEXT NOT NULL DEFAULT '',
    "remarks" TEXT NOT NULL DEFAULT '',
    "mrc" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "otc" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "tkPerMb" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "connectivity_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_details" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "designation" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "detailedAddress" TEXT,
    "paymentMethod" TEXT,
    "trxId" TEXT,
    "activationDate" TEXT,

    CONSTRAINT "billing_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technical_details" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "designation" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,

    CONSTRAINT "technical_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_serviceClass_idx" ON "leads"("serviceClass");

-- CreateIndex
CREATE INDEX "leads_clientType_idx" ON "leads"("clientType");

-- CreateIndex
CREATE INDEX "leads_clientClass_idx" ON "leads"("clientClass");

-- CreateIndex
CREATE INDEX "leads_maturityStage_idx" ON "leads"("maturityStage");

-- CreateIndex
CREATE INDEX "leads_atlId_idx" ON "leads"("atlId");

-- CreateIndex
CREATE INDEX "leads_serviceId_idx" ON "leads"("serviceId");

-- CreateIndex
CREATE INDEX "leads_billingAccess_idx" ON "leads"("billingAccess");

-- CreateIndex
CREATE INDEX "leads_myStoreId_idx" ON "leads"("myStoreId");

-- CreateIndex
CREATE INDEX "leads_ticketId_idx" ON "leads"("ticketId");

-- CreateIndex
CREATE INDEX "maturity_histories_leadId_idx" ON "maturity_histories"("leadId");

-- CreateIndex
CREATE INDEX "connectivity_locations_leadId_idx" ON "connectivity_locations"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "billing_details_leadId_key" ON "billing_details"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "technical_details_leadId_key" ON "technical_details"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_division_district_thana_key" ON "locations"("division", "district", "thana");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_kamId_fkey" FOREIGN KEY ("kamId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_atlId_fkey" FOREIGN KEY ("atlId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_histories" ADD CONSTRAINT "maturity_histories_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connectivity_locations" ADD CONSTRAINT "connectivity_locations_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_details" ADD CONSTRAINT "billing_details_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_details" ADD CONSTRAINT "technical_details_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
