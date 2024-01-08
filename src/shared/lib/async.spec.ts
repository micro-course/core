import { createSimpleMutext, sleep } from "./async";

test("simple mutext", async () => {
  const signal = jest.fn();
  const mutext = createSimpleMutext();

  const funcAsync = async (base: number) => {
    await sleep(200);
    await mutext.block();
    signal(base, 1);
    await sleep(200);
    signal(base, 2);
    await sleep(200);
    mutext.resolve();
  };

  await Promise.all([funcAsync(1), funcAsync(2)]);

  expect(signal).toHaveBeenNthCalledWith(1, 1, 1);
  expect(signal).toHaveBeenNthCalledWith(2, 1, 2);
  expect(signal).toHaveBeenNthCalledWith(3, 2, 1);
  expect(signal).toHaveBeenNthCalledWith(4, 2, 2);
});
