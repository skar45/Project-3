require('dotenv').config()

export default {
  oidc: {
    clientId: process.env.Client_Id || '0oa1d3kgklSfhS18Z5d6',
    issuer: process.env.Issuer || 'https://dev-7705867.okta.com/oauth2/default',
    redirectUri: 'https://sleepy-retreat-90049.herokuapp.com/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
  },
  resourceServer: {
    messagesUrl: 'https://sleepy-retreat-90049.herokuapp.com/api/messages',
  },
};
