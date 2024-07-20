import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  transactions = [
    { name: 'Transaction1', status: 'Completed', price: 100 },
    { name: 'Transaction2', status: 'Pending', price: 150 },
    { name: 'Transaction3', status: 'Completed', price: 100 },
    { name: 'Transaction4', status: 'Pending', price: 150 },
    { name: 'Transaction5', status: 'Completed', price: 100 },
  ];

}
