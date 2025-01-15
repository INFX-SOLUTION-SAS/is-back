import Client from "../models/client.js"
import { v4 as uuidv4 } from 'uuid';

const ClientsSeeder = async () => {

    let clients = await Client.findOne()
    if (clients == null) {
        await Client.create({
            id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e95',
            identification: "901666902",
            name: 'INFX SOLUTION S.A.S',
            contact: '3004274928',
            email: 'rgomez@infxsolution.com',
            address: '',
            type: 'OWNER',
            state: true,
            company: 999
        });
    }

}

export default ClientsSeeder