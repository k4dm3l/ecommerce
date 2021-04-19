const bcrypt = require('bcrypt');
const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');

const { config } = require('../../config');

function buildAdminUser(password) {
  return {
    password,
    username: config.authAdminUsername,
    email: config.authAdminEmail
  };
}

async function hasAdminUser(mongoDb) {
  const adminUser = await mongoDb.getAll('users', {
    username: config.authAdminUsername
  });

  return adminUser && adminUser.length;
}

async function createAdminUser(mongoDb) {
  const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
  const userId = await mongoDb.create('users', buildAdminUser(hashedPassword));
  return userId
}

async function seedAdmin() {
  try {
    const mongoDb = new MongoLib();

    if (await hasAdminUser(mongoDb)) {
      console.log(chalk.yellow("Admin user already exists"));
      return process.exit(1);
    }

    const adminUserId = await createAdminUser(mongoDb);
    console.log(chalk.green('Admin user created with id: ', adminUserId));
    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedAdmin();