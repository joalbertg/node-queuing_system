const socket = io();

//socket.on('connect', () => console.log('Server connect!!!'));
//socket.on('disconnect', () => console.log('Lost connection!!!'));

const desktopTitle = document.querySelector('h1');
const currentAttendance = document.querySelector('h4 > small');
const buttons = document.querySelector('button');
const searchParams = new URLSearchParams(window.location.search);

//socket.on('currentState', currentTicket => {
  //console.log(currentTicket);
  //lblNuevoTicket.textContent = currentTicket.current;
//});

const getDesktop = () => {
  if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Required Destop.');
  }

  return searchParams.get('escritorio');
}

desktopTitle.textContent = `Desktop ${getDesktop()}`;

buttons.addEventListener('click', () => {
  socket.emit('attendTicket', { desktop: getDesktop() }, resp => {
    if (resp.error) {
      window.location = 'index.html';
      throw new Error(resp.message);
    }

    if (resp.ticket.num) {
      currentAttendance.textContent = `Ticket ${resp.ticket.num}`;
    } else {
      currentAttendance.textContent = resp.ticket;
    }
  });
});

