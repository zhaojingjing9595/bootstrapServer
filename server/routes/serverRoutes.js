import { Router } from 'express';
import { connectToServer, getConnectionDetail } from '../controller/serverController.js';
import { checkLicenseAvailability, checkLocationExist, checkServerCapacity } from '../middleware/serverMiddleware.js';

const serverRoutes = Router();

serverRoutes
  .route('/')
  .post(
    checkLicenseAvailability,
    checkLocationExist,
    checkServerCapacity,
    connectToServer
);
  
serverRoutes.route('/:id').get(getConnectionDetail);

export default serverRoutes;
