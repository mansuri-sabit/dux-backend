// Count users in MongoDB database
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const User = require('./models/User');

async function countUsers() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        console.log('🔌 Connecting to MongoDB...\n');
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB\n');

        // Count total users
        const totalUsers = await User.countDocuments();
        console.log(`📊 Total Users in Database: ${totalUsers}\n`);

        if (totalUsers > 0) {
            // List all users
            console.log('👥 All Users:');
            console.log('═══════════════════════════════════════════════════════');
            const users = await User.find({}, 'username email accountStatus createdAt').sort({ createdAt: -1 });

            users.forEach((user, index) => {
                console.log(`${index + 1}. Username: ${user.username}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Status: ${user.accountStatus}`);
                console.log(`   Created: ${user.createdAt}`);
                console.log('───────────────────────────────────────────────────────');
            });
        } else {
            console.log('❌ No users found in database\n');
        }

        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

countUsers();
