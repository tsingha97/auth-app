const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

// Increase Jest timeout to allow for longer DB connections and operations
jest.setTimeout(30000);

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    const MONGO_URI_TEST =
      process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/auth-app-test";
    await mongoose.connect(MONGO_URI_TEST);
  });

  afterAll(async () => {
    // Ensure the connection and database exist before dropping
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("should login an existing user", async () => {
    // Register a user to login
    await request(app).post("/api/auth/register").send({
      username: "loginuser",
      email: "login@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should send a password reset email", async () => {
    // Register a user for forgot password test
    await request(app).post("/api/auth/register").send({
      username: "forgotuser",
      email: "forgot@example.com",
      password: "nASgUufpW8XYVjcRfa",
    });

    const res = await request(app).post("/api/auth/forgot-password").send({
      email: "forgot@example.com",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Password reset email sent");
  });

  it("should reset the password", async () => {
    // Register a user for reset password test
    const email = "reset@example.com";
    await request(app).post("/api/auth/register").send({
      username: "resetuser",
      email,
      password: "password123",
    });

    // Trigger forgot password to generate a reset token
    await request(app).post("/api/auth/forgot-password").send({
      email,
    });

    // Retrieve the user from the database and get the reset token
    const user = await User.findOne({ email });
    expect(user).toBeDefined();
    expect(user.passwordResetToken).toBeDefined();

    const resetToken = user.passwordResetToken;

    // Call the reset password endpoint with the token and new password
    const res = await request(app)
      .post(`/api/auth/reset-password/${resetToken}`)
      .send({
        password: "newpassword123",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Password reset successful");

    // Optionally, you could test that the new password works for login
    const loginRes = await request(app).post("/api/auth/login").send({
      email,
      password: "newpassword123",
    });
    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty("token");
  });
});
