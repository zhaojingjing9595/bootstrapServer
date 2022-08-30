import mongoose from 'mongoose';

const serverSchema = mongoose.Schema(
  {
    Server_Id: {
      type: String,
      required: true,
    },
    Server_IP_Address: {
      type: String,
      required: true,
      unique: true,
    },
    Client_Capacity: {
      type: Number,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Server = mongoose.model('Servers_details', serverSchema);
export default Server;
