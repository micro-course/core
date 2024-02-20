import { ProviderKey } from "../_types/provider-key";
import { getProviderMeta, providerKeyToStrng } from "./providers";

const checkIsDependencyProviders = (key: ProviderKey) => {
  const providerMeta = getProviderMeta(key);

  return providerMeta.type === "dependency";
};

export const isDependencyExist = (
  key: ProviderKey,
  privateKeys: ProviderKey[],
  moduleDepsKeys: ProviderKey[],
) => {
  return privateKeys.includes(key) || moduleDepsKeys.includes(key);
};

const getDependenciesCirles = (
  keys: ProviderKey[],
  path = new Set<ProviderKey>(),
): string[] => {
  return keys.flatMap((key) => {
    if (path.has(key)) {
      const circle = [...path, key].map(providerKeyToStrng).join(" -> ");

      return [circle];
    }

    const providerMeta = getProviderMeta(key);

    if (providerMeta.type !== "adapter") {
      return [];
    }

    const deps = providerMeta.deps ?? [];

    return getDependenciesCirles(deps, new Set([...path, key]));
  });
};

type ValidationError = {
  type: "error";
  message: string;
};

export const validateProviderKesy = (
  entryKey: ProviderKey,
  privateKeys: ProviderKey[],
  moduleDepsKeys: ProviderKey[],
) => {
  let errors: ValidationError[] = [];

  moduleDepsKeys.forEach((key) => {
    if (!checkIsDependencyProviders(key)) {
      errors.push({
        type: "error",
        message: `Provider ${providerKeyToStrng(key)} not dependency`,
      });
    }
    checkIsDependencyProviders(key);
  });

  [entryKey, ...privateKeys].forEach((key) => {
    const providerMeta = getProviderMeta(key);

    if (providerMeta.type === "dependency") {
      errors.push({
        type: "error",
        message: `Provider ${providerKeyToStrng(
          key,
        )} has dependency type, it not allowed in private module providers`,
      });
      return;
    }

    providerMeta.deps?.forEach((key) => {
      if (!isDependencyExist(key, privateKeys, moduleDepsKeys)) {
        errors.push({
          type: "error",
          message: `Provider ${providerKeyToStrng(
            key,
          )} has not exist dependency`,
        });
      }
    });

    const circles = getDependenciesCirles(providerMeta.deps ?? []);
    circles.forEach(() => {
      return {
        type: "error",
        message: `Provider ${providerKeyToStrng(
          key,
        )} has circles: \n ${circles.join(",\n")}`,
      };
    });
  });

  return errors;
};
