import axios from "axios";
import Resizer from 'react-image-file-resizer';

const defaultImage = 'https://patioserviceonline.com/uploads/ventrega/popup/1647351931-default-merchant.jpg';

export const fileUpload = async (file) => {
    const formData = new FormData();
    formData.append('popup', file);
    return await axios({
        method: 'POST',
        url: 'http://patioserviceonline.com/api/v2/?route=app_cliente&type=subir_popup',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const previewImage = async (file) => {
    if (file) {
        const dataUri = await resizeFile(file);
        document.getElementById('previewImage').src = dataUri;
    } else {
        document.getElementById('previewImage').src = defaultImage;
    }
}

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