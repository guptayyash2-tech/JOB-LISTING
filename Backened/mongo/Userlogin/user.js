const mongoose = require('mongoose');

// Define the schema
const userregister = new mongoose.Schema({
  username: {
    type: String,
    required: true,        
    minlength: 3,         
    maxlength: 50
  },
  emailid: {
    type: String,
    required: true,
    unique: true,          
    lowercase: true,       
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] 
  },
  mobilenumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Invalid mobile number format'] 
  },
  password: {
    type: String,
    required: true,
    minlength: 8           
  },
  image:{
    type: String
 },
},
{ timestamps: true });   

// Export model
module.exports = mongoose.model('User', userregister);
