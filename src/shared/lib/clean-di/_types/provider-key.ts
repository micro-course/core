export type ProviderValue = any;

export type ProviderKey<Value = ProviderValue> = {
  debugName?: string;
  __data: Value;
};

export type ValuesToProviderKeys<Values extends ProviderValue[]> = {
  [I in keyof Values]: ProviderKey<Values[I]>;
};
