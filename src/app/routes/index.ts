import { Router } from "express";
import { ClientRoutes } from "../modules/client/client.route";
import { TargetRoutes } from "../modules/target/target.route";
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
  {
    path: "/target",
    route: TargetRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
