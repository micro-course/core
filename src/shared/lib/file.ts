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

export function validateFileSize(file: File, sizeMb: number) {
  const fileSize = file.size / 1024 / 1024; // in MiB
  if (fileSize > sizeMb) {
    return false;
  } else {
    return true;
  }
}

export function getImageSizes(file: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = document.createElement("img");

    const src = URL.createObjectURL(file);

    img.style.opacity = "0";
    img.style.position = "absolute";
    img.onload = function handleLoad() {
      resolve({
        width: img.width,
        height: img.height,
      });

      URL.revokeObjectURL(src);
      img.remove();
    };

    img.src = src;

    document.body.appendChild(img);
  });
}

export function fileToDataURI(file: File) {
  return new Promise<{ dataURI: string; name: string }>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        dataURI: reader.result as string,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  });
}

export function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export function blobToFile(blob: Blob, fileName: string) {
  return new File([blob], fileName, { type: blob.type });
}
