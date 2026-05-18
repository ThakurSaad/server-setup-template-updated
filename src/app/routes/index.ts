import express from "express";
import AuthRoutes from "../module/auth/auth.routes";
import AdminRoutes from "../module/admin/admin.routes";
import UserRoutes from "../module/user/user.routes";
import DashboardRoutes from "../module/dashboard/dashboard.routes";
import ManageRoutes from "../module/manage/manage.routes";
import NotificationRoutes from "../module/notification/notification.routes";
import FeedbackRoutes from "../module/feedback/feedback.routes";
import ReviewRoutes from "../module/review/review.routes";

const router = express.Router();
// const express = require("express");
// const router = express.Router();
// const AuthRoutes = require("../module/auth/auth.routes");
// const AdminRoutes = require("../module/admin/admin.routes");
// const UserRoutes = require("../module/user/user.routes");
// const DashboardRoutes = require("../module/dashboard/dashboard.routes");
// const ManageRoutes = require("../module/manage/manage.routes");
// const NotificationRoutes = require("../module/notification/notification.routes");
// const FeedbackRoutes = require("../module/feedback/feedback.routes");
// const ReviewRoutes = require("../module/review/review.routes");

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
    path: "/admin",
    route: DashboardRoutes,
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export = router;
