export function selectFile(
  contentType: string,
  multiple: true,
): Promise<File[]>;
export function selectFile(contentType: string): Promise<File>;
export function selectFile(contentType: string, multiple?: boolean) {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple ?? false;
    input.accept = contentType;

    input.onchange = () => {
      let files = Array.from(input.files as Iterable<File>);
      if (multiple) resolve(files);
      else resolve(files[0]);
    };

    input.click();
  });
}
