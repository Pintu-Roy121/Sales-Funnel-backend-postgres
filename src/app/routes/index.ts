import { Router } from "express";
import { ClientRoutes } from "../modules/client/client.route";
import { LeadRoutes } from "../modules/lead/lead.route";
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
  },
  {
    path: "/lead",
    route: LeadRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
