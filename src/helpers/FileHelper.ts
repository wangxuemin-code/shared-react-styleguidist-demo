export class FileHelper {
  public static downloadBase64(fileName: string, base64: string) {
    const anchor = document.createElement('a');
    anchor.download = fileName;
    anchor.style.display = 'none';

    // need to prepend mime type
    if (base64.indexOf('data:') < 0) {
      base64 = 'data:' + this.getMimeType(fileName) + ';base64,' + base64;
    }

    const blob = this.dataURIToBlob(base64);
    const url = URL.createObjectURL(blob);

    anchor.href = url;
    document.body.appendChild(anchor);

    anchor.click();

    anchor.parentNode!.removeChild(anchor);
  }

  private static dataURIToBlob(dataURI: string) {
    var binStr = atob(dataURI.split(',')[1]),
      len = binStr.length,
      arr = new Uint8Array(len),
      mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];

    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    return new Blob([arr], {
      type: mimeString
    });
  }

  public static getMimeType(fileName: string) {
    const arr = fileName.split('.');

    if (arr.length > 0) {
      const fileType = arr[arr.length - 1].toLowerCase();

      switch (fileType) {
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'gif':
          return 'image/gif';
        case 'zip':
          return 'application/zip';
        case 'pdf':
          return 'application/pdf';
        case 'json':
          return 'application/json';
      }
    }

    return 'text/plain';
  }
}
