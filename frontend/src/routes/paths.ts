export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pagesRoot}/dashboard`,
  features: `/${rootPaths.pagesRoot}/features`,
  users: `/${rootPaths.pagesRoot}/users`,
  pricing: `/${rootPaths.pagesRoot}/pricing`,
  integrations: `/${rootPaths.pagesRoot}/integrations`,
  settings: `/${rootPaths.pagesRoot}/settings`,
  templatePages: `/${rootPaths.pagesRoot}/template-pages`,
  accountSettings: `/${rootPaths.pagesRoot}/account-settings`,

  login: `/Aurora/${rootPaths.authRoot}/login`,
  signup: `/Aurora/${rootPaths.authRoot}/sign-up`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  comingSoon: `/coming-soon`,
  404: `/${rootPaths.errorRoot}/404`,
};
