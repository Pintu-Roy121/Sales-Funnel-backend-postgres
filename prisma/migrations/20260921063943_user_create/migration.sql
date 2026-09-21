-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'team_lead', 'employee', 'activation_ops', 'lead_viewer', 'lead_generator', 'atl');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'terminated');

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
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_atlId_fkey" FOREIGN KEY ("atlId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER SEQUENCE "users_id_seq" RESTART WITH 2000;