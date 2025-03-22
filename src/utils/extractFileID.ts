//  This function takes cloudinary url and extracts the fileID from it and then return it

export const extractFileID = (cloudinaryURL: string) => {
    const url = new URL(cloudinaryURL);
    const filePath = url.pathname;
    const fileID = filePath.split('/')[filePath.split('/').length - 1].split('.')[0];
    return fileID
}