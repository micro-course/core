-- CreateTable
CREATE TABLE "MapNode" (
    "id" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 100,
    "height" INTEGER NOT NULL DEFAULT 100,
    "rotation" INTEGER NOT NULL DEFAULT 0,
    "scale" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "hidden" BOOLEAN NOT NULL,
    "zIndex" INTEGER,

    CONSTRAINT "MapNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapNodeCourseData" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "mapNodeId" TEXT,

    CONSTRAINT "MapNodeCourseData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapNodeImageData" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "mapNodeId" TEXT,

    CONSTRAINT "MapNodeImageData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MapNodeCourseData_courseId_key" ON "MapNodeCourseData"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "MapNodeCourseData_mapNodeId_key" ON "MapNodeCourseData"("mapNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "MapNodeImageData_mapNodeId_key" ON "MapNodeImageData"("mapNodeId");

-- AddForeignKey
ALTER TABLE "MapNodeCourseData" ADD CONSTRAINT "MapNodeCourseData_mapNodeId_fkey" FOREIGN KEY ("mapNodeId") REFERENCES "MapNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapNodeImageData" ADD CONSTRAINT "MapNodeImageData_mapNodeId_fkey" FOREIGN KEY ("mapNodeId") REFERENCES "MapNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
