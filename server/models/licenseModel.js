import mongoose from 'mongoose';

const licenseSchema = mongoose.Schema(
  {
    License_Id: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
    License_Key: {
      type: String,
      required: true,
    },
    License_Expiration_Time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const License = mongoose.model('License_details', licenseSchema);
export default License;
