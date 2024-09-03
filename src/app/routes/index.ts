import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";

const router = Router();

type TRoute = {
   path: string;
   route: Router;
};

const routes: TRoute[] = [
   {
      path: "/users",
      route: UserRoute,
   },
];

routes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
