import { UserController } from "../controllers/userController";
import { TemplateController } from "../controllers/templateController";
import { authenticateToken, authorizeRole } from "../middleware/auth";
export enum Role {
  ADMIN = "admin",
  OBSERVER = "observer",
  NONE = "",
}

export const Routes = [
  {
    method: "post",
    route: "/users/signup",
    controller: UserController,
    action: "create",
    middleware: [],
  },
  {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register",
    middleware: [],
  },
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
    middleware: [],
  },
  {
    method: "post",
    route: "/users/email/:socketId",
    controller: UserController,
    action: "email",
    middleware: [authenticateToken, authorizeRole([Role.ADMIN])],
  },
  {
    method: "post",
    route: "/users/verify",
    controller: UserController,
    action: "verify",
    middleware: [authenticateToken],
  },
  {
    method: "post",
    route: "/users/refreshtoken",
    controller: UserController,
    action: "refreshToken",
    middleware: [],
  },
  {
    method: "post",
    route: "/users/logout",
    controller: UserController,
    action: "logout",
    middleware: [],
  },
  // Template routes
  {
    method: "get",
    route: "/templates",
    controller: TemplateController,
    action: "getAllTemplates",
    middleware: [],
  },
  {
    method: "post",
    route: "/templates",
    controller: TemplateController,
    action: "createTemplate",
    middleware: [],
  },
  {
    method: "get",
    route: "/templates/:id",
    controller: TemplateController,
    action: "getTemplateByUserId",
    middleware: [],
  },
  {
    method: "put",
    route: "/templates/update",
    controller: TemplateController,
    action: "updateTemplate",
    middleware: [],
  },

  // Button routes
];
