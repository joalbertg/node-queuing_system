const { io } = require('../server');
const { TicketControll } = require('../classes');

const ticketControll = new TicketControll();

io.on('connection', client => {
  console.log('User connected');

  client.emit('currentState', {
    current: ticketControll.lastTiket(),
    lastFour: ticketControll.lastFourInQueue()
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('nextTicket', (data, callback) => {
    callback({
      ticket: ticketControll.nextNum()
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
      ticket: ticketControll.attendTicket(data.desktop)
    });

    client.broadcast.emit('lastFour', {
      lastFour: ticketControll.lastFourInQueue()
    });
  });
});

