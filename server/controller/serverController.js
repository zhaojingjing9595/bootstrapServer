import Client_Details from '../models/clientModel.js';
import Server_Connection from '../models/connectionModel.js';
import License from '../models/LicenseModel.js';
import Server from '../models/serverModel.js';
import User from '../models/userModel.js';

export const connectToServer = async (req, res, next) => {
  try {
    const user = await User.findOne({ Client_Id: req.body.Client_Id });
    const server = await Server.findOne({ Server_Id: req.body.Server_Id });
    //   save new server_connection into DB
    const newConnectionObj = new Server_Connection({
      Client_Id: req.body.Client_Id,
      Location: req.body.Location,
      Server_Id: req.body.Server_Id,
      Client_Capacity: server.Client_Capacity,
      License_Key: req.body.License_Key,
      License_Expiration_Time: req.body.License_Expiration_Time,
      expireAt: new Date(
        Date.now() + req.body.License_Expiration_Time * 60 * 1000
      ).toISOString(),
    });
    const newConnection = await newConnectionObj.save();

    //   update license.status => "unavailable"
    const license = await License.findOne({
      License_Key: req.body.License_Key,
    });
    license.Status = 'unavailable';
    const newLicense = await license.save();

    //   save new client_details into DB
    const newClientDetailObj = new Client_Details({
      User_Id: user._id,
      Client_Id: req.body.Client_Id,
      Client_Password: req.body.Client_Password,
      License_Key: req.body.License_Key,
      Location: req.body.Location,
    });
    const newClientDetail = await newClientDetailObj.save();
    if (newConnectionObj) {
      res.send(newConnectionObj);
    } else {
      throw new Error('Fail to connect to the server');
    }
  } catch (error) {
    next(error);
  }
};


export const getConnectionDetail = async (req, res, next) => {
  try {
    const connections = await Server_Connection.findOne({
      License_Key: req.params.licenseKey,
    });
    if (connections) {
      res.send(connections);
    } else {
      res.status(401);
      throw new Error('Fail to get the connection details');
    }
  } catch (error) {
    next(error);
  }
};
