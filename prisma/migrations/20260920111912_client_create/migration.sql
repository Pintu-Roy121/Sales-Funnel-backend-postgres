-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "clientOldId" TEXT NOT NULL,
    "clientType" TEXT,
    "clientFName" TEXT NOT NULL,
    "clientLName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientOldId_key" ON "clients"("clientOldId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_phone_key" ON "clients"("phone");

ALTER SEQUENCE "clients_id_seq" RESTART WITH 1000;