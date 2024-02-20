import { Module, ModuleConfig } from "../_types/module";
import { ProviderKey, ProviderValue } from "../_types/provider-key";
import { validateProviderKesy } from "./module-config-validation";
import { getProviderMeta, providerKeyToStrng } from "./providers";

type ProviderValueContainer = {
  value: ProviderValue;
};

type ProvidersMap = Map<ProviderKey, ProviderValueContainer>;

const createResolveProvider = (map: ProvidersMap) => {
  return function getProvider(key: ProviderKey): ProviderValue {
    if (map.has(key)) {
      return map.get(key)!.value;
    }

    const meta = getProviderMeta(key);

    if (meta.type === "dependency") {
      throw new Error(`Can't resolve dependency ${providerKeyToStrng(key)}`);
    }

    const result = meta.adapter(
      ...(meta.deps?.map((dep) => getProvider(dep)) ?? []),
    );

    map.set(key, { value: result });

    return result;
  };
};

export const createModule = <
  Entry,
  Values extends ProviderValue[],
  Dependencies extends ProviderValue[],
>(
  config: ModuleConfig<Entry, Values, Dependencies>,
): Module<Entry, Dependencies> => {
  const dependenciesKeys = config.dependencies ?? [];
  const privateKeys = config.private ?? [];
  validateProviderKesy(config.entry, privateKeys, dependenciesKeys);

  const getEntry = (...dependencies: Dependencies) => {
    let providersMap: ProvidersMap = new Map();

    dependencies.forEach((dependency, index) => {
      providersMap.set(dependenciesKeys[index], { value: dependency });
    });

    const resolveProvider = createResolveProvider(providersMap);

    return resolveProvider(config.entry);
  };

  const dependencies = config.dependencies;

  return {
    dependencies: dependenciesKeys as any,
    getEntry,
  };
};
