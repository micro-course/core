import { createMapAbility } from "../_domain/ability";
import { useAbility } from "@/entities/user/_vm/use-ability";

export const useMapAbility = () => useAbility(createMapAbility);
