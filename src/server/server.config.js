module.exports = {
    apps: [
      {
        name: 'backend',
        script: './index.js',
        instances: 0,
        exec_mode: 'cluster',
        watch: true,
        env: {
          NODE_ENV: 'production',
          PORT: '8081'
        }
      }
    ]
  };