import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db.js';
import Server from './models/serverModel.js';
import License from './models/LicenseModel.js';
import { servers_details } from './data/servers_details.js';
import { License_details } from './data/License_details.js';


dotenv.config();

connectDB();

const importData = async () => { 
    try {
        await Server.deleteMany();
        await License.deleteMany();
      
        await Server.insertMany(servers_details);
        await License.insertMany(License_details);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.res.inverse);
        process.exit(1);
    }
}

importData();