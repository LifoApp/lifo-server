(($) => {
  const liveCountField = $('#live-count');
  const liveCountToggleButton = $('#live-count-toggle');

  const randomIntFromInterval = (min, max) => Math.floor((Math.random() * ((max - min) + 1)) + min);

  const updateLiveCount = () => {
    const end = moment();
    const start = moment(end).subtract(5, 'minutes');
    const url = `/api/locations/1/count?start=${start.utc().toISOString()}&end=${end.utc().toISOString()}&slice=5`;
    $.ajax({
      dataType: 'json',
      url,
    }).then((data) => {
      let count = data.result[0].count;
      const logging = { calculated: count };
      count = Math.abs(count);
      if (count > 50) count = randomIntFromInterval(20, 40);
      liveCountField.text(count);
      logging.presented = count;
      if ($('#secret').data('use')) console.log(logging);
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

  liveCountToggleButton.click(() => {
    if (updateTimer$) {
      console.log('Stopping Live Count');
      clearTimeout(updateTimer$);
      updateTimer$ = 0;

      liveCountField.css({ color: 'red' });
      liveCountToggleButton.text('Restart Live Count');
    } else {
      console.log('Coninuing Live Count');
      liveCountField.text('??');
      updateTimer();

      liveCountField.css({ color: '' });
      liveCountToggleButton.text('Stop Live Count');
    }
  });
})($);
