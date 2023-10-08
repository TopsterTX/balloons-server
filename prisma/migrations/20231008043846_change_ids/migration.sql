/*
  Warnings:

  - The primary key for the `Balloon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BalloonsOnColors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BalloonsOnColors" DROP CONSTRAINT "BalloonsOnColors_balloonId_fkey";

-- DropForeignKey
ALTER TABLE "BalloonsOnColors" DROP CONSTRAINT "BalloonsOnColors_colorId_fkey";

-- AlterTable
ALTER TABLE "Balloon" DROP CONSTRAINT "Balloon_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Balloon_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Balloon_id_seq";

-- AlterTable
ALTER TABLE "BalloonsOnColors" DROP CONSTRAINT "BalloonsOnColors_pkey",
ALTER COLUMN "balloonId" SET DATA TYPE TEXT,
ALTER COLUMN "colorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BalloonsOnColors_pkey" PRIMARY KEY ("colorId", "balloonId");

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Color_id_seq";

-- AddForeignKey
ALTER TABLE "BalloonsOnColors" ADD CONSTRAINT "BalloonsOnColors_balloonId_fkey" FOREIGN KEY ("balloonId") REFERENCES "Balloon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalloonsOnColors" ADD CONSTRAINT "BalloonsOnColors_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
