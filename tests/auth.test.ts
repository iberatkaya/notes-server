import app from "../src/app";
import request from "supertest";
import { Server } from "http";
import { signUp } from "./utils";
import { User } from "../src/models/user/user";

describe("Auth Requests", () => {
  /**
   * Store the server instance to cancel later.
   * If not canceled Jest cannot exit.
   */
  let server: Server;

  /**
   * Store the superagent instance to send requests.
   */
  let agent: request.SuperAgentTest;

  beforeEach((done) => {
    server = app.listen(4000, () => {
      agent = request.agent(server);
      done();
    });
  });

  afterEach(async (done) => {
    await User.remove({}).exec();

    return server && server.close(done);
  });

  it("should create a new user", async () => {
    const res = await signUp(agent);
    expect(res.status).toEqual(200);
    expect(res.body.success).toEqual(true);
  });

  it("should not create a user with same email", async () => {
    const firstRes = await signUp(agent);
    expect(firstRes.status).toEqual(200);
    expect(firstRes.body.success).toEqual(true);

    const secondRes = await signUp(agent);
    expect(secondRes.status).toEqual(500);
    expect(secondRes.body.success).toEqual(false);
  });

  it("should not create a user with short password", async () => {
    const res = await signUp(agent, {
      email: "berat@gmail.com",
      name: "berat",
      password: "12345",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it("should not create a user with invalid email", async () => {
    const res = await signUp(agent, {
      email: "berat",
      name: "berat",
      password: "12345",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it("should not create a user with empty email", async () => {
    const res = await signUp(agent, {
      email: "",
      name: "berat",
      password: "12345",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it("should not create a user with empty name", async () => {
    const res = await signUp(agent, {
      email: "berat@gmail.com",
      name: "",
      password: "12345",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it("should not create a user with empty password", async () => {
    const res = await signUp(agent, {
      email: "berat@gmail.com",
      name: "berat",
      password: "",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });
});
