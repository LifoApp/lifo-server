(($) => {
  $.ajax({
    dataType: 'json',
    url: '/api/locations/1/count',
  }).then((data) => {
    console.log(data);
  });
})($);
