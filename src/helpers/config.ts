import { diskStorage } from 'multer';
import { unlink } from 'node:fs/promises';
import { join } from 'path';

export const storageConfig = () =>
  diskStorage({
    destination: 'uploads',
    filename(req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    },
  });

export const removeFile = async (path: string) => {
  try {
    await unlink(join(__dirname, `../../../${path}`));
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
};
