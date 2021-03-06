"use strict";

const {
  db,
  models: { User, Products, Cart, CartProducts },
} = require("../server/db");
const productSeedArray = require("./productSeed");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      firstName: "cody",
      lastName: "codylastname",
      admin: true,
      address: "123 main st, city, ST, ZIP",
      email: "cody@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "murphy",
      lastName: "murphylastname",
      address: "456 main st, city, ST, ZIP",
      email: "murphy@gmail.com",
      password: "123",
    }),
  ]);

  const products = await Promise.all(
    productSeedArray.map(product => {
      return Products.create(product);
    })
  );

  const cart = await Promise.all([
    Cart.create({
      userId: 1,
    }),
    Cart.create({
      userId: 2,
    })
  ]);

  await cart[0].addProducts([products[0], products[1]]);
  await cart[1].addProducts(products[3], products[4]);


  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded the cart`)
  console.log('seeded cart-products')
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
