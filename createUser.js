const bcrypt = require("bcryptjs");
const User = require("./model/User");
const { faker } = require("@faker-js/faker");

const createUser = async (numberOfUser) => {
  console.log("drop all user");
  await User.collection.drop();
  for (let i = 0; i < numberOfUser; i++) {
    let password = faker.animal.cat();
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const singleUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
    };

    const found = await User.findOne({ email: singleUser.email });
    console.log("Creating User");
    if (!found) {
      const result = await User.create(singleUser);
      console.log("==============");
      console.log(`Create ${result.name} success`);
    }
  }
  console.log("Done");
};

module.exports = createUser;
