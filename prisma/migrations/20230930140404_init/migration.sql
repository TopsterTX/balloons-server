-- CreateEnum
CREATE TYPE "BalloonType" AS ENUM ('Foil', 'Common');

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balloon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "isSale" BOOLEAN,
    "type" "BalloonType" NOT NULL,

    CONSTRAINT "Balloon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalloonsOnColors" (
    "balloonId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "BalloonsOnColors_pkey" PRIMARY KEY ("colorId","balloonId")
);

-- AddForeignKey
ALTER TABLE "BalloonsOnColors" ADD CONSTRAINT "BalloonsOnColors_balloonId_fkey" FOREIGN KEY ("balloonId") REFERENCES "Balloon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalloonsOnColors" ADD CONSTRAINT "BalloonsOnColors_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
