import cuid from "cuid";
import { ProviderKey, ProviderValue } from "../_types/provider-key";
import {
  AdapterProviderConfig,
  AdapterProviderMeta,
  ProviderMeta,
} from "../_types/providers";

const providersMeta = new WeakMap<ProviderKey, ProviderMeta>();

const createProviderKey = <Value>(
  meta: ProviderMeta,
  debugName?: string,
): ProviderKey<Value> => {
  const key = {
    id: cuid(),
    debugName,
    __data: null as Value,
  };
  providersMeta.set(key, meta);

  return key;
};

export const createAdapterProvider = <
  Value,
  Dependencies extends ProviderValue[],
>(
  config: AdapterProviderConfig<Value, Dependencies>,
): ProviderKey<Value> => {
  return createProviderKey(
    {
      type: "adapter",
      adapter: config.adapter as AdapterProviderMeta["adapter"],
      deps: config.deps as AdapterProviderMeta["deps"],
    },
    config.debugName,
  );
};

//
export const createDependencyProvider = <Value>(
  debugName?: string,
): ProviderKey<Value> => createProviderKey({ type: "dependency" }, debugName);

export const getProviderMeta = <Value>(key: ProviderKey<Value>) => {
  const meta = providersMeta.get(key);

  if (!meta) {
    throw new Error(`Provider ${providerKeyToStrng(key)} meta not found`);
  }
  return meta;
};

export const providerKeyToStrng = <Value>(key: ProviderKey<Value>) => {
  return key.debugName ?? "unknown";
};
