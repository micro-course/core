import {
  ProviderKey,
  ProviderValue,
  ValuesToProviderKeys,
} from "./provider-key";

export type ModuleConfig<
  Entry,
  Private extends ProviderValue[],
  Dependencies extends ProviderValue[],
> = {
  private?: ValuesToProviderKeys<Private>;
  entry: ProviderKey<Entry>;
  dependencies?: ValuesToProviderKeys<Dependencies>;
};

export type Module<Entry, Dependencies extends ProviderValue[]> = {
  getEntry: (...args: Dependencies) => Entry;
  dependencies: ValuesToProviderKeys<Dependencies>;
};
