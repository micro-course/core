export class FileFetcher {
  async fetchFile(url: string, token?: string) {
    return fetch(url, {
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    }).then((r) => {
      return r.text();
    });
  }
}
