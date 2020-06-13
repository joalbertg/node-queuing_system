const socket = io();

//socket.on('connect', () => console.log('Server connect!!!'));
//socket.on('disconnect', () => console.log('Lost connection!!!'));

const lblTicket1 = document.getElementById('lblTicket1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblTicket4 = document.getElementById('lblTicket4');

const lblEscritorio1 = document.getElementById('lblEscritorio1');
const lblEscritorio2 = document.getElementById('lblEscritorio2');
const lblEscritorio3 = document.getElementById('lblEscritorio3');
const lblEscritorio4 = document.getElementById('lblEscritorio4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblDesktops = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('currentState', data => {
  renderHTML(data.lastFour);
});

socket.on('lastFour', data => {
  renderHTML(data.lastFour);

  const audio = new Audio('audio/new-ticket.mp3');
  audio.play();
});

const renderHTML = lastFour => {
  for(let i = 0; i < lastFour.length; i++) {
    lblTickets[i].textContent = `Ticket ${lastFour[i].num}`;
    lblDesktops[i].textContent = `Desktop ${lastFour[i].desktop}`;
  }
}

