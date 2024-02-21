import {
  ProviderKey,
  ProviderValue,
  ValuesToProviderKeys,
} from "./provider-key";

// ADAPTER PROVIDER
export type AdapterProviderConfig<
  Value,
  Dependencies extends ProviderValue[] = [],
> = {
  debugName?: string;
  adapter: (...args: Dependencies) => Value;
  deps?: { [I in keyof Dependencies]: ProviderKey<Dependencies[I]> };
};

export type AdapterProviderMeta = {
  type: "adapter";
  adapter: (...args: ProviderValue[]) => ProviderValue;
  deps?: ValuesToProviderKeys<ProviderValue[]>;
};

// DEPENDENCY PROVIDER
export type DependencyProviderMeta = {
  type: "dependency";
};

export type ProviderMeta = AdapterProviderMeta | DependencyProviderMeta;
