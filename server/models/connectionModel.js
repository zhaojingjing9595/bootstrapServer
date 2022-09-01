import mongoose from 'mongoose';

const serverConnectionSchema = mongoose.Schema(
  {
    Client_Id: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Server_Id: {
      type: String,
      required: true,
    },
    Client_Capacity: {
      type: Number,
      required: true,
    },
    License_Key: {
      type: String,
      required: true,
      unique:true
    },
    License_Expiration_Time: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Server_Connection = mongoose.model(
  'Server_Connection',
  serverConnectionSchema
);
export default Server_Connection;
