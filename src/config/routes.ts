export enum AppRoutes {
  Home = "/",
}

// (auth) é apenas um route group do Next.js, não aparece na URL
export enum AuthRoutes {
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ForgotPassword = "/forgot-password",
  ResetPassword = "/reset-password",
  SuccessResetPassword = "/sucess-reset-send-password",
  PendingApproval = "/pending-approval",
  BannedUser = "/banned-user",
}

export enum MembersRoutes {
  Members = "/members",
  Posts = "/posts",
  Events = "/events",
  Jobs = "/jobs",
  JobNew = "/jobs/new",
  JobEdit = "/jobs/:id/edit",
  Profile = "/profile",
}

export enum ApiRoutes {
  Login = "/auth/login",
  Register = "/auth/register",
  Logout = "/auth/logout",
  Me = "/auth/me",
  ConfirmCode = "/auth/confirm-code",
  ForgotPassword = "/password/forgot-password",
  ResetPassword = "/password/reset-password",
  Jobs = "/job",
  JobById = "/job/:id",
}
