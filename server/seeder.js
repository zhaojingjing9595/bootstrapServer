import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db.js';
import Server from './models/serverModel.js';
import License from './models/LicenseModel.js';
import { servers_details } from './data/servers_details.js';
import { License_details } from './data/License_details.js';
import Server_Connection from './models/connectionModel.js';
import User from './models/userModel.js';
import { server_connection } from './data/server_connection.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Server.deleteMany();
    // await Server.insertMany(servers_details);
    
    // await License.deleteMany();
    // await License.insertMany(License_details);

    // import server-connection data
    await Server_Connection.deleteMany();
    const newObj = {
      Client_Id: 'Adam',
      Location: 'Israel',
      Server_Id: '22222',
      Client_Capacity: 3,
      License_Key: "5HFDD-ZPTAM-0OE4Z",
      License_Expiration_Time: 2,
      expireAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
      newConnections.push(newObj);
    console.log(newConnections);
    await Server_Connection.insertMany(newConnections);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};


importData();
