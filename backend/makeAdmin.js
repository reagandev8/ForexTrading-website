import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const email = process.argv[2];
        if (!email) {
            console.log('Please provide an email address. Example: node makeAdmin.js user@example.com');
            process.exit(1);
        }

        const user = await User.findOne({ email });

        if (user) {
            await User.updateOne({ email }, { role: 'admin' });
            console.log(`Success! User ${email} has been given admin privileges.`);
        } else {
            console.log(`Error: No user found with the email ${email}. Please register an account first.`);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

makeAdmin();
