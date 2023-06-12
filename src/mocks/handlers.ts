import { rest } from "msw";
import { realTokenMock } from "./mockUser";
import { videogamesCollectionMock } from "./videogamesMocks";
import FeedbackMessages from "../utils/feedbackMessages/feedbackMessages";
import { getVideogamesDataMock } from "./factories/videogames/videogamesFactory";

export const apiUrl = import.meta.env.VITE_APP_API_URL;

export const videogamesFactory = getVideogamesDataMock(12);

export const handlers = [
  rest.post(`${apiUrl}/user/login`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: realTokenMock }));
  }),

  rest.get(`${apiUrl}/videogames`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ videogames: videogamesCollectionMock })
    );
  }),

  rest.delete(`${apiUrl}/videogames/:videogameId`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Videogame deleted" }));
  }),

  rest.post(`${apiUrl}/videogames/create`, (_req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ videogame: videogamesCollectionMock[0] })
    );
  }),
];

export const errorHandlers = [
  rest.post(`${apiUrl}/user/login`, (_req, res, ctx) => {
    return res(ctx.status(401));
  }),

  rest.get(`${apiUrl}/videogames`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),

  rest.delete(`${apiUrl}/videogames/:videogameId`, (_req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ message: "Videogame not found" }));
  }),

  rest.post(`${apiUrl}/videogames/create`, (_req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: FeedbackMessages.createFailed })
    );
  }),
];

export const paginationHandlers = [
  rest.get(`${apiUrl}/videogames`, (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    searchParams.set("skip", "0");
    searchParams.set("limit", "5");

    return res(
      ctx.status(200),
      ctx.json({
        videogames: videogamesFactory,
        totalVideogames: videogamesFactory.length,
      })
    );
  }),
];
