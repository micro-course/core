export const createSimpleMutext = () => {
  const mutext = {
    blocked: Promise.resolve(),
    block: async () => {
      await mutext.blocked;
      mutext.blocked = new Promise((res) => {
        mutext.resolve = res;
      });
    },
    resolve: () => {},
  } as {
    blocked: Promise<void>;
    block: () => Promise<void>;
    resolve: () => void;
  };

  return mutext;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
