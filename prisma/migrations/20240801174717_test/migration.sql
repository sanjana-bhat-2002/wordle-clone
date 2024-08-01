/*
  Warnings:

  - The `accountVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountVerified",
ADD COLUMN     "accountVerified" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "EmailVerificationStatus";
