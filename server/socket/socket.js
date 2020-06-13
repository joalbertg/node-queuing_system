const { io } = require('../server');
const { TicketControll } = require('../classes');

const ticketControl = new TicketControll();

io.on('connection', client => {
  console.log('User connected');

  client.emit('currentState', {
    current: ticketControl.lastTiket()
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('nextTicket', (data, callback) => {
    callback({
      ticket: ticketControl.nextNum()
    });
  });

  client.on('attendTicket', (data, callback) => {
    console.log(data)
    if(!data.desktop) {
      return callback({
        error: true,
        message: 'Required desktop.'
      });
    }

    callback({
      ticket: ticketControl.attendTicket(data.desktop)
    });
  });
});

