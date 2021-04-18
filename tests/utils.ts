import request from "supertest";
import { AddNoteReqBody } from "../interfaces/requests/add_note_request_body/add_note_request_body";
import { SignUpReqBody } from "../interfaces/requests/signup_request_body/signup_request_body";

export const defaultEmail = "ibk@gmail.com";
export const defaultName = "Berat";
export const defaultPassword = "123456";

export const signUp = async (
  agent: request.SuperAgentTest,
  user: SignUpReqBody = {
    email: defaultEmail,
    name: defaultName,
    password: defaultPassword,
  }
): Promise<request.Response> => {
  const signupBody: SignUpReqBody = {
    email: user.email ?? defaultEmail,
    name: user.name ?? defaultName,
    password: user.password ?? defaultPassword,
  };

  const res = await agent.post("/auth/signup").send(signupBody);
  return res;
};

export const addNote = async (
  agent: request.SuperAgentTest,
  note: AddNoteReqBody = {
    body: "Test note body.",
    title: "Test Note",
  },
  user: {
    email: string;
    password: string;
  } = {
    email: defaultEmail,
    password: defaultPassword,
  }
): Promise<request.Response> => {
  const addNoteReqBody: AddNoteReqBody = {
    body: note.body ?? "Test note body.",
    title: note.title ?? "Test Note",
  };

  const res = await agent
    .post("/note/addnote")
    .auth(user.email, user.password)
    .send(addNoteReqBody);
  return res;
};
