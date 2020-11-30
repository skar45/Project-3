
export default {
  oidc: {
    clientId: '0oa1d3kgklSfhS18Z5d6',
    issuer: 'https://dev-7705867.okta.com/oauth2/default',
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8080/api/messages',
  },
};
