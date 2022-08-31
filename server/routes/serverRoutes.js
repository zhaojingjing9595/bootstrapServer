import { Router } from 'express';
import { connectToServer } from '../controller/serverController.js';
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

export default serverRoutes;
