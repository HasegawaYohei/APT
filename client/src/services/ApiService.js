import { remote } from 'electron';

export default (filepath) => {
  const fs = remote.require('fs');
  const filenameList = fs.readdirSync(filepath);
  const fileList = [];

  filenameList.forEach((filename) => {
    const data = fs.readFileSync(`${filepath}${filename}`);
    fileList.push({
      filename,
      data,
    });
  });

  return fileList;
};
