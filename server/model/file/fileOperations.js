import preDB from  '../../utils/dbconnector'

/**
 * @param typename
 * @param owner
 * @param path
 * @returns {Promise}
 */
export function file_upload(typename, owner, path, filename, size) {
    return new Promise(async (resolve, reject) => {
        try{
            let data = {
                type: typename,
                owner: owner,
                path: path,
                is_delete: 0,
                filename: filename,
                size: size
            }
            await preDB.none('INSERT INTO dc_file(${this~}) VALUES(${type}, ${owner}, $(path), $(is_delete), $(filename), $(size))', data)
            resolve()
        } catch (e){
            console.log(e||e.stack)
            reject(e)
        }
    })
}