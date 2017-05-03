const routes = [
  {
    path: '',
    method: 'GET',
    handler: (req, res) => {
      res.view('index.html');
    },
  },
  {
    path: '/analytics',
    method: 'GET',
    handler: (req, res) => {
      res.view('analytics.html');
    },
  },
  {
    path: '/login',
    method: 'GET',
    handler: (req, res) => {
      res.view('login.html');
    },
  },
];

module.exports = routes;
