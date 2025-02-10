const fs = require('fs');
const dotenv = require('dotenv');

// Determine the environment and corresponding .env file
const envFile = (() => {
    const env = process.env.NODE_ENV || 'local'; // Default to 'local' if not set
    switch (env) {
        case 'staging':
            return '.env.staging';
        case 'production':
            return '.env.production';
        default:
            return '.env.local';
    }ƒ
})();



// Load the environment file
if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
} else {
    console.error(`Error: ${envFile} not found!`);
    process.exit(1);
}

// Export configuration variables
module.exports = {
    isDebug: process.env.DEBUG === 'true',
    envPath: envFile
};
