import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import seque from '../config/seque.js';
import User from '../models/user.js';

const UserSeeder = async () => {
    try
    {
        let users = await User.findOne()
        if (users == null) {
            await User.create({
                id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e90',
                username: 'rgomez',
                client_system_id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e95',
                name: 'Ricardo Gomez',
                password:  await bcrypt.hash("Acpatic2013",7),
                email: 'rgomez@infxsolution.com',
                state: true,
                lastCompany: '99',
            });
        }

        console.log('User seeding completed successfully!');
    }
    catch(error){
        console.error('Error during User seeding:', error);
    }
   
}

export default UserSeeder