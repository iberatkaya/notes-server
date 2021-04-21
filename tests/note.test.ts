import app from "../src/app";
import request from "supertest";
import { Server } from "http";
import { addNote, signUp } from "./utils";
import { User } from "../src/models/user/user";

describe("Note Requests", () => {
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

  it("should create a new note", async () => {
    const authRes = await signUp(agent);
    expect(authRes.status).toEqual(200);
    expect(authRes.body.success).toEqual(true);

    const res = await addNote(agent);
    expect(res.status).toEqual(200);
    expect(res.body.success).toEqual(true);
  });

  it("should not create a note with invalid body", async () => {
    const authRes = await signUp(agent);
    expect(authRes.status).toEqual(200);
    expect(authRes.body.success).toEqual(true);

    const res = await addNote(agent, {
      body: "",
      title: "Test Note",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });

  it("should not create a note with invalid title", async () => {
    const authRes = await signUp(agent);
    expect(authRes.status).toEqual(200);
    expect(authRes.body.success).toEqual(true);

    const res = await addNote(agent, {
      body: "Test note body.",
      title: "",
    });
    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
  });
});
