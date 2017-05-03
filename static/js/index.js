(($) => {
  const updateLiveCount = () => {
    const end = moment();
    const start = moment(end).subtract(5, 'minutes');
    const url = `/api/locations/1/count?start=${start.utc().toISOString()}&end=${end.utc().toISOString()}&slice=5`;
    $.ajax({
      dataType: 'json',
      url,
    }).then((data) => {
      $('#live-count').text(data.result[0].count);
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  };

  const updateInterval = 1000 * 30;
  let updateTimer$ = 0;
  const updateTimer = () => {
    updateLiveCount();
    updateTimer$ = setTimeout(updateTimer, updateInterval);
  };
  updateTimer();
})($);
