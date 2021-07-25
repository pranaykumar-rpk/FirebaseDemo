import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usersMap: Map<String,any> = new Map();
  title = 'AngularFirebaseDemo';
  coursesList: string[] = [];
  
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
      snapshots.forEach(snapshot=>{
        console.log(snapshot.data());
      })
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
}
