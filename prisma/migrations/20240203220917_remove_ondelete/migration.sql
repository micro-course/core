-- DropForeignKey
ALTER TABLE "MapNodeCourseData" DROP CONSTRAINT "MapNodeCourseData_mapNodeId_fkey";

-- DropForeignKey
ALTER TABLE "MapNodeImageData" DROP CONSTRAINT "MapNodeImageData_mapNodeId_fkey";

-- AddForeignKey
ALTER TABLE "MapNodeCourseData" ADD CONSTRAINT "MapNodeCourseData_mapNodeId_fkey" FOREIGN KEY ("mapNodeId") REFERENCES "MapNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapNodeImageData" ADD CONSTRAINT "MapNodeImageData_mapNodeId_fkey" FOREIGN KEY ("mapNodeId") REFERENCES "MapNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
