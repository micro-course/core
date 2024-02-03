import { ParsingError, ValidationError } from "@/shared/lib/errors";
import * as Yaml from "yaml";
import Ajv from "ajv";

export class ContentParser {
  private ajv = new Ajv({
    strict: false,
  });

  async parse<T>(text: string, schema: object) {
    try {
      const resultObject: unknown = await Yaml.parse(text);

      if (this.ajv.validate(schema, resultObject)) {
        return resultObject as T;
      } else {
        console.log(this.ajv.errors);
        throw new ValidationError([...(this.ajv.errors ?? [])]);
      }
    } catch (error) {
      console.log(error);
      throw new ParsingError(text, "ContentParsing error", error);
    }
  }
}
