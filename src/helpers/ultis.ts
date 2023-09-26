import { extname } from 'path';

export const validationFile = (
  req: any,
  file: any,
  cb: (error: Error, acceptFile: boolean) => void,
) => {
  const ext = extname(file.originalname);
  const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  if (!allowedExtArr.includes(ext)) {
    req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
    cb(null, false);
  } else {
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 5) {
      req.fileValidationError =
        'File size is too large. Accepted file size is less than 5 MB';
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
};
