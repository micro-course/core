export class FileFetcher {
  constructor(private authToken?: string) {}

  async fetchText(url: string) {
    return fetch(url, {
      headers: {
        ...(this.authToken
          ? {
              Authorization: `Bearer ${this.authToken}`,
            }
          : {}),
      },
    }).then((res) => res.text());
  }
}
