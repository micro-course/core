/*
  Warnings:

  - The `width` column on the `MapNode` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `MapNode` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rotation` column on the `MapNode` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `scale` column on the `MapNode` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MapNode" DROP COLUMN "width",
ADD COLUMN     "width" INTEGER NOT NULL DEFAULT 100,
DROP COLUMN "height",
ADD COLUMN     "height" INTEGER NOT NULL DEFAULT 100,
DROP COLUMN "rotation",
ADD COLUMN     "rotation" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "scale",
ADD COLUMN     "scale" INTEGER NOT NULL DEFAULT 1;
