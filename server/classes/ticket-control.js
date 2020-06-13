const fs = require('fs');
const path = require('path');

const Ticket = require('./ticket');

class TicketControll {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    const data = require('../db/data.json');

    if (this.today === data.today) {
      if (data.last && Number(data.last)) this.last = data.last;
      if (data.tickets) this.tickets = data.tickets;
      if (data.lastFour && Number(data.lastFour)) this.lastFour = data.lastFour;
    } else {
      this.restartCount();
    }
  }

  restartCount = () => {
    this.last = 0;
    this.tickets = [];
    this.lastFour = [];

    console.log('System restarted');
    this.saveFile();
  }

  nextNum = () => {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveFile();

    return `Tiket ${this.last}`;
  }

  lastTiket = () => `Tiket ${this.last}`;
  lastFourInQueue = () => this.lastFour;

  attendTicket = desktop => {
    if (this.tickets.length === 0) return 'Empty queue';

    const ticketNum = this.tickets[0].num;
    const ticket = new Ticket(ticketNum, desktop);

    this.tickets.shift();
    this.lastFour.unshift(ticket);

    if (this.lastFour.length > 4) this.lastFour.pop();
    this.saveFile();

    return ticket;
  }

  saveFile = () => {
    const jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour
    };
    const jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync(path.resolve(__dirname, '../db/data.json'), jsonDataString);
  }
}

module.exports = {
  TicketControll
};

