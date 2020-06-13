const socket = io();

socket.on('connect', () => console.log('Server connect!!!'));
socket.on('disconnect', () => console.log('Lost connection!!!'));

const buttons = document.querySelector('button');
const lblNuevoTicket = document.getElementById('lblNuevoTicket');

socket.on('currentState', currentTicket => {
  console.log(currentTicket);
  lblNuevoTicket.textContent = currentTicket.current;
});

buttons.addEventListener('click', () => {
  socket.emit('nextTicket', null, nextTicket => {
    lblNuevoTicket.textContent = nextTicket.ticket;
  });
});

