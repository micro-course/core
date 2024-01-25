import Yaml from "yaml";
import { ParsingError, ValidationError } from "@/shared/lib/errors";
import Ajv from "ajv";

const ajv = new Ajv();

export class ContentQuery {
  constructor() {}

  public async fetchContentFile<T>(
    fetcher: () => Promise<string>,
    schema: object,
  ) {
    const content = await fetcher();
    const resultObject = await this.parseAndValidate(content, schema);

    return resultObject as T;
  }

  private async parseAndValidate<T>(value: string, schema: object) {
    try {
      const resultObject = Yaml.parse(value);

      if (await ajv.validate(schema, resultObject)) {
        return resultObject as T;
      } else {
        throw new ValidationError([...(ajv.errors ?? [])]);
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        throw e;
      }

      const error = new ParsingError(value);
      error.cause = e;
      throw error;
    }
  }
}
