-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('amount', 'pcs', 'both');

-- CreateTable
CREATE TABLE "targets" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "targetType" "TargetType" NOT NULL DEFAULT 'both',
    "targetAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "targetPcs" INTEGER NOT NULL DEFAULT 0,
    "achievedAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "maturityAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "achievedPcs" INTEGER NOT NULL DEFAULT 0,
    "maturityPcs" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "setById" INTEGER NOT NULL,
    "teamLeadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "targets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "targets_userId_idx" ON "targets"("userId");

-- CreateIndex
CREATE INDEX "targets_month_idx" ON "targets"("month");

-- CreateIndex
CREATE INDEX "targets_teamLeadId_idx" ON "targets"("teamLeadId");

-- CreateIndex
CREATE UNIQUE INDEX "targets_userId_month_key" ON "targets"("userId", "month");

-- AddForeignKey
ALTER TABLE "targets" ADD CONSTRAINT "targets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "targets" ADD CONSTRAINT "targets_setById_fkey" FOREIGN KEY ("setById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "targets" ADD CONSTRAINT "targets_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
