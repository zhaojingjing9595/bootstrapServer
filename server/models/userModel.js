import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    Client_Id: {
      type: String,
      required: true,
      unique: true,
    },
    Client_Password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword =  function (enteredPassword) { 
  const match = enteredPassword === this.Client_Password;
  return match
}


const User = mongoose.model('User', userSchema);
export default User;
