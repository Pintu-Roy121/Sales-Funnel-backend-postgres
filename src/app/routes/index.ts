import { Router } from "express";
import { ClientRoutes } from "../modules/client/client.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: () => {},
  },
  {
    path: "/client",
    route: ClientRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
