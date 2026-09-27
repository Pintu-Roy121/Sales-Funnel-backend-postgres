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

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('amount', 'pcs', 'both');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'team_lead', 'employee', 'activation_ops', 'lead_viewer', 'lead_generator', 'atl');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'terminated');

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "clientType" "ClientType" NOT NULL DEFAULT 'CORP',
    "clientClass" "ClientClass" NOT NULL DEFAULT 'new',
    "organizationName" TEXT NOT NULL,
    "detailedAddress" TEXT NOT NULL DEFAULT '',
    "clientFName" TEXT NOT NULL,
    "clientLName" TEXT NOT NULL,
    "clientDesignation" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "houseHold" TEXT,
    "clientIndustry" TEXT,
    "locationId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "kamId" INTEGER,
    "teamLeadId" INTEGER,
    "atlId" INTEGER,
    "createdById" INTEGER,
    "clientType" "ClientType" NOT NULL DEFAULT 'CORP',
    "clientClass" "ClientClass" NOT NULL DEFAULT 'new',
    "organizationName" TEXT,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "detailedAddress" TEXT NOT NULL,
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
    "addOnType" TEXT NOT NULL DEFAULT 'none',
    "interactionCount" INTEGER NOT NULL DEFAULT 0,
    "mrcAmount" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "otcAmount" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "expectedClosingMonth" TEXT NOT NULL,
    "maturityStage" TEXT NOT NULL DEFAULT 'Lead Generated',
    "maturityPercentage" DECIMAL(11,2) NOT NULL DEFAULT 10,
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
    "percentage" DECIMAL(5,2) NOT NULL,
    "oldMrcAmount" DECIMAL(11,2),
    "newMrcAmount" DECIMAL(11,2),
    "oldOtcAmount" DECIMAL(11,2),
    "newOtcAmount" DECIMAL(11,2),
    "oldExpectedClosingMonth" TEXT,
    "newExpectedClosingMonth" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL DEFAULT 'Pipeline metrics updated.',

    CONSTRAINT "maturity_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connectivity_locations" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "packageName" TEXT,
    "remarks" TEXT,
    "mrc" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "otc" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "tkPerMb" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "leadId" INTEGER NOT NULL,

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
CREATE TABLE "targets" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "targetType" "TargetType" NOT NULL DEFAULT 'both',
    "targetAmount" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "targetPcs" INTEGER NOT NULL DEFAULT 0,
    "achievedAmount" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "maturityAmount" DECIMAL(11,2) NOT NULL DEFAULT 0,
    "achievedPcs" INTEGER NOT NULL DEFAULT 0,
    "maturityPcs" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "setById" INTEGER NOT NULL,
    "teamLeadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'employee',
    "status" "UserStatus" NOT NULL DEFAULT 'inactive',
    "avatar" TEXT,
    "phone" TEXT,
    "department" TEXT,
    "designation" TEXT,
    "zone" TEXT,
    "eid" TEXT,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),
    "accessDepartment" TEXT[],
    "accessPath" TEXT[],
    "roleDepartment" TEXT[],
    "accessService" TEXT[],
    "createdById" INTEGER,
    "teamLeadId" INTEGER,
    "atlId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_phone_key" ON "clients"("phone");

-- CreateIndex
CREATE INDEX "clients_clientType_idx" ON "clients"("clientType");

-- CreateIndex
CREATE INDEX "clients_clientClass_idx" ON "clients"("clientClass");

-- CreateIndex
CREATE UNIQUE INDEX "locations_division_district_thana_key" ON "locations"("division", "district", "thana");

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
CREATE INDEX "targets_userId_idx" ON "targets"("userId");

-- CreateIndex
CREATE INDEX "targets_month_idx" ON "targets"("month");

-- CreateIndex
CREATE INDEX "targets_teamLeadId_idx" ON "targets"("teamLeadId");

-- CreateIndex
CREATE UNIQUE INDEX "targets_userId_month_key" ON "targets"("userId", "month");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_teamLeadId_idx" ON "users"("teamLeadId");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_atlId_idx" ON "users"("atlId");

-- CreateIndex
CREATE INDEX "users_createdById_idx" ON "users"("createdById");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_kamId_fkey" FOREIGN KEY ("kamId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "targets" ADD CONSTRAINT "targets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "targets" ADD CONSTRAINT "targets_setById_fkey" FOREIGN KEY ("setById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "targets" ADD CONSTRAINT "targets_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_atlId_fkey" FOREIGN KEY ("atlId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
