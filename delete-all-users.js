// Delete all users from MongoDB database
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const User = require('./models/User');
const AutomationData = require('./models/AutomationData');

async function deleteAllUsers() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        console.log('🔌 Connecting to MongoDB...\n');
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB\n');

        // Count users before deletion
        const countBefore = await User.countDocuments();
        console.log(`📊 Users before deletion: ${countBefore}\n`);

        if (countBefore > 0) {
            // Delete all users
            const result = await User.deleteMany({});
            console.log(`🗑️ Deleted ${result.deletedCount} users\n`);

            // Also delete all automation data
            const automationResult = await AutomationData.deleteMany({});
            console.log(`🗑️ Deleted ${automationResult.deletedCount} automation data records\n`);

            // Verify deletion
            const countAfter = await User.countDocuments();
            console.log(`📊 Users after deletion: ${countAfter}\n`);

            if (countAfter === 0) {
                console.log('✅ All users successfully removed from database!');
            }
        } else {
            console.log('⚠️ No users found to delete');
        }

        await mongoose.disconnect();
        console.log('\n✅ Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

deleteAllUsers();
