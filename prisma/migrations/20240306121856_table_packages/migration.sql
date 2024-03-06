-- CreateTable
CREATE TABLE "package" (
    "id" SERIAL NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
