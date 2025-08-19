import mongoose from 'mongoose';
import 'dotenv/config'; // Automatically loads environment variables from .env file

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
      const clientOptions = {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
      };
    
    await mongoose.connect(dbURI, clientOptions);
    
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
}
export default connectDB;

