import { Router } from "express";
import { ClientRoutes } from "../modules/client/client.route";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/client",
    route: ClientRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
