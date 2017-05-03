const routes = [
  {
    path: '',
    method: 'GET',
    handler: (req, res) => {
      res.view('demo.html');
    },
  },
];

module.exports = routes;
