import * as crypto from "crypto";

export interface DataObject {
  [key: string]: string | DataObject | DataObject[] | string[];
}

export class Hmac {
  static create(
    data: DataObject,
    key: string,
    algo = "sha256",
  ): string | false {
    if (!crypto.getHashes().includes(algo)) return false;

    data = Hmac.strValAndSort(data);

    return crypto
      .createHmac(algo, key)
      .update(JSON.stringify(data).replaceAll("/", "\\/"))
      .digest("hex");
  }

  static verify(data: DataObject, key: string, sign: string, algo = "sha256") {
    const _sign = Hmac.create(data, key, algo);

    return _sign && _sign.toLowerCase() === sign.toLowerCase();
  }

  private static strValAndSort(data: DataObject): DataObject {
    data = Hmac.sortObject(data);

    for (const item in data)
      if (data.hasOwnProperty(item))
        if (typeof data[item] === "object" && !Array.isArray(data[item]))
          data[item] = Hmac.strValAndSort(data[item] as DataObject);
        else data[item] = (data[item] as string).toString();

    return data;
  }

  private static sortObject(obj: DataObject): DataObject {
    if (Array.isArray(obj)) return obj;

    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {} as DataObject);
  }
}
