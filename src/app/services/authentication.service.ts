import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: any;

  constructor(private afAuth: AngularFireAuth, public afs: AngularFirestore, private router: Router) {
  }

  createUser(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
      let newUser = {
        uid: user.user.uid,
        email: user.user.email,
        isAdmin: false
      }
      this.isAdmin.next(false)
      this.afs.collection('user').add(newUser).then(user => {
        user.get().then((result) => {
          this.currentUser = result
          this.router.navigate(['']);
        }).catch((err) => {
          console.log(err);
        });
      })
    })
  }
  logoutUser() {
    this.afAuth.signOut().then(() => {;
      this.isAdmin.next(false);
      this.router.navigate(['login'])
    });
  }

  loginUser(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.afs.collection("user").ref.where("uid", "==", user.user.uid).onSnapshot(snap => {
        snap.forEach(userRef => {
          this.currentUser = userRef.data();
          if (this.currentUser.isAdmin) {
            this.isAdmin.next(true);
          } else {
            this.isAdmin.next(false)
          }
          this.router.navigate(['']);
        })
      })
    })
  }


}
