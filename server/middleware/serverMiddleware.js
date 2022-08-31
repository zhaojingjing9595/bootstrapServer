import Server from '../models/serverModel.js';
import License from '../models/LicenseModel.js';
import Server_Connection from '../models/connectionModel.js';

export const checkLicenseAvailability = async (req, res, next) => {
  try {
    const license = await License.findOne({
      License_Key: req.body.License_Key,
    });
    if (license && license.Status === 'available') {
      req.body = {
        ...req.body,
        License_Expiration_Time: license.License_Expiration_Time,
      };
      next();
    } else {
      res.status(401);
      throw new Error('this license is not available');
    }
  } catch (error) {
    next(error);
  }
};

export const checkLocationExist = async (req, res, next) => {
  try {
    const servers = await Server.find({ Location: req.body.Location });
    if (servers.length > 0) {
      req.body = { ...req.body, servers: servers };
      next();
    } else {
      res.status(401);
      throw new Error('this location does not exist');
    }
  } catch (error) {
    next(error);
  }
};

export const checkServerCapacity = async (req, res, next) => {
  try {
    const activeConnections = await Server_Connection.find({
      Location: req.body.Location,
    });
      const servers = req.body.servers
      for (let i = 0; i < servers.length; i++) {
        let sameServerId = activeConnections.filter(
          (x) => x.Server_Id === servers[i].Server_Id
        );
        if (sameServerId.length < servers[i].Client_Capacity) {
            req.body.Server_Id = servers[i].Server_Id;
            break;
        }
      }
      if (req.body.Server_Id) {
          next();
      } else { 
           res.status(401);
           throw new Error('the server capacity has reached its maximum');
      }
  } catch (error) {
    next(error);
  }
};
