import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from './models/ticket';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usersMap: Map<String,any> = new Map();
  title = 'AngularFirebaseDemo';
  coursesList: string[] = [];
  data: User[] = [];
  tickets: Ticket[] = [];

  
  constructor(private database: AngularFireDatabase, private firestore:AngularFirestore){
    console.log("Data from realtime database");
    this.database.database.ref().child('courses').once('value').then(
      snapshot => {
        snapshot.forEach(child =>{
          console.log(child.key + ": " + child.val());
          this.coursesList.push(child.val());
        });
      });

      console.log("Data from firebase firestore");
      this.firestore.collection('users').ref.get().then(
      snapshots=> {
        snapshots.forEach((doc) => {
           this.data.push(doc.data() as User);
            console.log(doc.id, " => ", doc.data());  
       })
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

    console.log("Data from firebase firestore");
    this.firestore.collection('tickets').ref.get().then(
    snapshots=> {
      snapshots.forEach((doc) => {
         this.tickets.push(doc.data() as Ticket);
          console.log(doc.id, " => ", doc.data());  
     })
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  }
}
