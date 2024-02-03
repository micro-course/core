import { useQuery } from "@tanstack/react-query";
import { useGetCoursesToAddQuery } from "../../queries";

export function useCoursesToAdd() {
  const { data, error } = useQuery({
    ...useGetCoursesToAddQuery(),
  });

  console.log(data, error);
}
