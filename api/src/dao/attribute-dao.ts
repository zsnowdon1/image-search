import { dbPool } from '../index.js';
import { AttributeDAO } from '../models/models.js';

const getAttributeByUserQuery =  `SELECT attribute.id, attribute.name FROM image_data.attribute INNER JOIN image_data.photo_user WHERE attribute.photo_id = photo_user.photo_id
    AND photo_user.username = ? limit 5`;

export async function getAttributesByUsername(username: string): Promise<Array<AttributeDAO>> {
    let connection = await dbPool.getConnection();
    const result: Array<AttributeDAO> = await connection.query(getAttributeByUserQuery, username)
        .then(result => result.map((attribute): AttributeDAO => {
            return {id: attribute.id, name: attribute.name}
        }))
        .catch(error => console.log(error));
    connection.end();
    return result;
};