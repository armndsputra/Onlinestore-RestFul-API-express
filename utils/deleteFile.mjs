import { constants } from 'node:buffer';
import { unlink, existsSync, access } from 'node:fs';

export const deleteFileOne = (filePath) => {
    if (existsSync(filePath)) {
        unlink(filePath, (err) => {
            if (err) throw err
            console.log('file was deleted')
        });
    }
}

export const deleteFileMany = (filePaths) => {
    filePaths.map(filePath => {
        access(filePath, constants.F_OK, (err) => {
            if (err) { return console.error(`File does not exist: ${filePath}`); }
            unlink(filePath, (err) => {
                if (err) throw err;
                console.log('File deleted successfully');
            });
        })
    })
}