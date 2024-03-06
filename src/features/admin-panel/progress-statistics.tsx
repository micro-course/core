"use client";
import { useState } from "react";
import { UserSelect } from "./_ui/user-select";
import { useQuery } from "@tanstack/react-query";
import { useServerAction } from "@/shared/lib/server-action/client";
import { getProgressStatisticsAction } from "./_actions/get-progress-statistics";
import { UserId, CourseId } from "@/kernel";
import { CourseSelect } from "./_ui/course-select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export function ProgressStatistics() {
  const getProgressStatistics = useServerAction(getProgressStatisticsAction);
  const [userId, setUserId] = useState<UserId>();
  const [courseId, setCourseId] = useState<CourseId>();

  const res = useQuery({
    queryKey: ["statistics", "progress-statistics", { userId, courseId }],
    queryFn: () => getProgressStatistics({ userId, courseId }),
  });

  if (res.isPending) {
    return <div>Loading...</div>;
  }

  if (res.isError) {
    return <div>Error {res.error.message}</div>;
  }

  return (
    <div>
      <div className="flex gap-4 mb-10">
        <CourseSelect
          onChange={setCourseId}
          value={courseId}
          courses={res.data.allCourses}
        />
        <UserSelect
          onChange={setUserId}
          value={userId}
          users={res.data.allUsers}
        />
      </div>
      <div className="flex  flex-col gap-4">
        {res.data.coursesStatistics.map((course) => {
          return (
            <div key={course.id}>
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {course.title}
              </h2>
              <div className="flex flex-col gap-2 p-4 border rounded">
                <div>id: {course.id}</div>
                <div>slug: {course.slug}</div>
                <div>Всего учеников: {course.started}</div>
                <div>Прошедших учеников: {course.completed}</div>
              </div>
              <Table>
                <TableCaption>Список прогресса по урокам</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id урока</TableHead>
                    <TableHead>Slug урока</TableHead>
                    <TableHead className="max-w-[200px]">Название</TableHead>
                    <TableHead>Начато</TableHead>
                    <TableHead>Пройдено</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.lessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell>{lesson.id}</TableCell>
                      <TableCell>{lesson.slug}</TableCell>
                      <TableCell>{lesson.title}</TableCell>
                      <TableCell>{lesson.started}</TableCell>
                      <TableCell>{lesson.completed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
