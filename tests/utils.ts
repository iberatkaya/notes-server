import request from "supertest";
import { idText } from "typescript";
import { AddNoteReqBody } from "../src/interfaces/requests/add_note_request_body/add_note_request_body";
import { EditNoteReqBody } from "../src/interfaces/requests/edit_note_request_body/edit_note_request_body";
import { SignUpReqBody } from "../src/interfaces/requests/signup_request_body/signup_request_body";
import { removeUndefinedFromObject } from "../src/utils/utils";

export const defaultEmail = "ibk@gmail.com";
export const defaultName = "Berat";
export const defaultPassword = "123456";
export const defaultEditedNoteTitle = "Edited Note Title";
export const defaultEditedNoteBody = "Edited note body.";

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

export const getNotes = async (
  agent: request.SuperAgentTest,
  page: string = "0",
  user: {
    email: string;
    password: string;
  } = {
    email: defaultEmail,
    password: defaultPassword,
  }
): Promise<request.Response> => {
  const res = await agent
    .get("/note/getnotes?page=" + page)
    .auth(user.email, user.password)
    .send();
  return res;
};

export const editNote = async (
  agent: request.SuperAgentTest,
  id: string,
  body = defaultEditedNoteBody,
  title = defaultEditedNoteTitle,
  user: {
    email: string;
    password: string;
  } = {
    email: defaultEmail,
    password: defaultPassword,
  }
): Promise<request.Response> => {
  const editNoteReqBody: EditNoteReqBody = {
    body: body,
    title: title,
    id: id,
  };

  removeUndefinedFromObject(editNoteReqBody);

  const res = await agent
    .post("/note/editnote")
    .auth(user.email, user.password)
    .send(editNoteReqBody);
  return res;
};
