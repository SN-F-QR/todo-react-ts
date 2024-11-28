import { OAuth2Client, TokenPayload, TokenInfo } from "google-auth-library";
import { NextFunction, Request, Response } from "express";
import User from "./models/User";
import UserInterface from "../shared/User";
import jwtDecode from "jwt-decode";
import dotenv from "dotenv";

dotenv.config({});

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "http://localhost:5050");

const verify = (code: string) => {
  console.log(`Verifying code: ${code}`);
  console.log(`Client ID: ${CLIENT_ID}`);
  return client
    .getToken(code)
    .then((tokenResponse) => {
      // client.setCredentials(tokenResponse.tokens); // get assess token (opaque)
      // see tokenResponse.tokens here https://googleapis.dev/nodejs/google-auth-library/5.4.1/interfaces/Credentials.html
      console.log(tokenResponse.tokens);
      if (tokenResponse.tokens.id_token) {
        // retrieve user info from access token
        return jwtDecode(tokenResponse.tokens.id_token as string) as { name: string; sub: string };
      }
    })
    .catch((err) => {
      console.log(`Error verifying code: ${err}`);
    });
};

const getOrCreateUser = (user: { name: string; sub: string }) => {
  return User.findOne({ googleid: user.sub }).then(
    (existingUser: UserInterface | null | undefined) => {
      if (existingUser !== null && existingUser !== undefined) return existingUser;
      const newUser = new User({
        name: user.name,
        googleid: user.sub,
      });
      return newUser.save();
    }
  );
};

const login = (req: Request, res: Response) => {
  verify(req.body.code)
    .then((user) => {
      if (user === undefined) return;
      console.log(`User sub: ${user.sub}`);
      return getOrCreateUser(user);
    })
    .then((user) => {
      if (user === null || user === undefined) {
        throw new Error("Unable to retrieve user.");
      }
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to login: ${err}`);
      res.status(401).send({ err });
    });
};

const logout = (req: Request, res: Response) => {
  req.session.user = undefined;
  res.send({});
};

const populateCurrentUser = (req: Request, _res: Response, next: NextFunction) => {
  req.user = req.session.user;
  next();
};

// We use any because
const ensureLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ err: "Not logged in." });
  }
  next();
};

export default {
  ensureLoggedIn,
  populateCurrentUser,
  login,
  logout,
};
