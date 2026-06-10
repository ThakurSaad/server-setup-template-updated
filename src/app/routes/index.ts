import express from "express";
import AuthRoutes from "../module/auth/auth.routes";
import AdminRoutes from "../module/admin/admin.routes";
import UserRoutes from "../module/user/user.routes";
import ManageRoutes from "../module/manage/manage.routes";
import NotificationRoutes from "../module/notification/notification.routes";
import FeedbackRoutes from "../module/feedback/feedback.routes";
import ReviewRoutes from "../module/review/review.routes";
import ChatRoutes from "../module/chat/chat.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/manage",
    route: ManageRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
  {
    path: "/feedback",
    route: FeedbackRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/chat",
    route: ChatRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export = router;
