module.exports = {
    apps : [{
      name   : "backend",
      script : "./index.js",
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      },
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "4G"
    }]
  }