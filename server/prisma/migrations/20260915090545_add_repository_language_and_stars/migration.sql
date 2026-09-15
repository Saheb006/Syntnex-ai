-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "language" TEXT,
ADD COLUMN     "stars" INTEGER NOT NULL DEFAULT 0;
