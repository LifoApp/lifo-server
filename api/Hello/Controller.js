const paths = [
  {
    method: 'GET',
    path: '',
    handler: (req, res) => {
      res({
        statusCode: 200,
        message: 'Welcome to the Lifo API'
      }).code(200);
    }
  }
];

module.exports = paths;
