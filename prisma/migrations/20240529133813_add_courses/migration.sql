/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `draft` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('text');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('free', 'paid');

-- CreateEnum
CREATE TYPE "MdxType" AS ENUM ('courseLanding', 'courseShortDescription', 'contentBlockText', 'lessonShortDescription');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "draft" BOOLEAN NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "landing" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "shortDescriptionId" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT,
    "shortDescriptionId" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "text" TEXT,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseDependency" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "dependsOnId" TEXT NOT NULL,

    CONSTRAINT "CourseDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseProduct" (
    "id" TEXT NOT NULL,
    "access" "AccessType" NOT NULL,
    "price" INTEGER,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MdxText" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "MdxType" NOT NULL,
    "relationId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "MdxText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseDependency_courseId_dependsOnId_key" ON "CourseDependency"("courseId", "dependsOnId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseProduct_courseId_key" ON "CourseProduct"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseDependency" ADD CONSTRAINT "CourseDependency_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseDependency" ADD CONSTRAINT "CourseDependency_dependsOnId_fkey" FOREIGN KEY ("dependsOnId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProduct" ADD CONSTRAINT "CourseProduct_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
