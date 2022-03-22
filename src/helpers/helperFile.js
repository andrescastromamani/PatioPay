import Resizer from 'react-image-file-resizer';

const defaultImage = 'https://patioserviceonline.com/uploads/ventrega/popup/1647351931-default-merchant.jpg';

export const resizeFile = (file) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                'JPEG',
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    }
    return new Promise((resolve) => {
        resolve(file);
    })
}
export const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
};
export const previewImage = async (file) => {
    if (file) {
        const dataUri = await resizeFile(file);
        document.getElementById('previewImage').src = dataUri;
    } else {
        document.getElementById('previewImage').src = defaultImage;
    }
}
export const previewImageEdit = async (file) => {
    if (file) {
        const dataUri = await resizeFile(file);
        document.getElementById('previewImageEdit').src = dataUri;
    } else {
        document.getElementById('previewImage').src = defaultImage;
    }
}