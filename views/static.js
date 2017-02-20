const routes = [
  {
    path: '/{path*}',
    method: 'GET',
    handler: {
      file: req => req.params.path,
    },
  },
];

module.exports = routes;
