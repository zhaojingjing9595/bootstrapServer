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
      // await License.deleteMany();

      // await Server.insertMany(servers_details);
      // await License.insertMany(License_details);

        await Server_Connection.deleteMany();
        const user = await User.findOne({ Client_Id: "Adam" })
        const userId = user._id
        const newConnections = server_connection.map((e) => ({ ...e, User_id: userId }))
        console.log(newConnections)
      await Server_Connection.insertMany(newConnections);

      console.log('Data Imported!'.green.inverse);
      process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
}

importData();