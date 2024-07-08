import multer from "multer";
import {multerSaveFilesOrg} from "multerSaveFilesOrg";

export const remoteUpload = multer({
    storage:multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/portfolio/*'
    })
});