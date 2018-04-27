/**
 * Strip all the proceeding folders in the name. If the name is a folder,
 * then return the folder name with a slash at the end. If it is a file,
 * then remove the file extension
 * @param {String} name The file of folder to format
 */
export function formatName(name: string): string {
  const shortName = /[^/]*$/.exec(name)[0];
  const dotIndex = shortName.indexOf('.');
  if (dotIndex > -1) {
    return shortName.slice(0, dotIndex);
  } else {
    return shortName + '/';
  }
}

/**
 * Strip the src/ folder from the beginning of a directory string
 * @param {String} directory The directory we are stripping
 */
export function stripSrc(directory: string): string {
  if (directory.indexOf('src/') === 0) {
    return directory.slice(4);
  }
  return directory;
}
