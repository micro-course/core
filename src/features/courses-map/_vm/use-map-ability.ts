import { useAbilityStrict } from "@/entities/user/session";
import { createMapAbility } from "../_domain/ability";

export const useMapAbility = () => useAbilityStrict(createMapAbility);
