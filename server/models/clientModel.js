import mongoose from 'mongoose';

const clientDetailsSchema = mongoose.Schema(
  {
    User_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    Client_Id: {
      type: String,
      required: true,
      unique: true,
    },
    Client_Password: {
      type: String,
      required: true,
    },
    License_Key: {
      type: String,
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

const Client_Details = mongoose.model('Client_Details', clientDetailsSchema);
export default Client_Details;
