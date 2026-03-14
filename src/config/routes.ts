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
}

export enum MembersRoutes {
  Root = "/members",
  Posts = "/members/posts",
  Events = "/members/events",
  Jobs = "/members/jobs",
  Profile = "/members/profile",
}

export enum ApiRoutes {
  Login = "/auth/login",
  Register = "/auth/register",
  Logout = "/auth/logout",
  ConfirmCode = "/auth/confirm-code",
  ForgotPassword = "/password/forgot-password",
  ResetPassword = "/password/reset-password",
}
