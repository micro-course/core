function bound<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  const methodName = context.name;
  if (context.private) {
    throw new Error(
      `'bound' cannot decorate private properties like ${
        methodName as string
      }.`,
    );
  }
  context.addInitializer(function () {
    this[methodName as keyof This] = target.bind(this) as any;
  });
}
