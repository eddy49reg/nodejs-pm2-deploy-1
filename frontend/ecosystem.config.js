require("dotenv").config({ path: "./.env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF = "origin/master",
  DEPLOY_PATH,
  DEPLOY_SSH_KEY,
  NODE_ENV,
} = process.env;

module.exports = {
  apps: [
    {
      name: "frontend",
      env_production: {
        NODE_ENV,
      },
    },
  ],

  deploy: {
    production: {
      ssh_options: "StrictHostKeyChecking=no",
      key: DEPLOY_SSH_KEY,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "git@github.com:eddy49reg/web-plus-pm2-deploy.git",
      path: DEPLOY_PATH,
      "post-deploy":
        "export NVM_DIR=\"$HOME/.nvm\" && [ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\" && cd frontend && (export NODE_OPTIONS=--openssl-legacy-provider && npm install && npm run build) && rm -rf /home/user/mesto-frontend/ && mkdir -p /home/user/mesto-frontend/ && cp -R build/* /home/user/mesto-frontend/ && chmod -R 777 /home/user/mesto-frontend/",
    },
  },
};
