import { Router } from "express";

const router = Router();

type TRoute = {
   path: string;
   route: Router;
};

const routes: TRoute[] = [];

routes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
