module.exports = {
  apps: [
    {
      name: 'augreen-backend',
      script: 'dist/index.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
