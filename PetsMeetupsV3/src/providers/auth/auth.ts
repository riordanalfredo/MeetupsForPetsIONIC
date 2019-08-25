import { Injectable } from "@angular/core";
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from "../../models/User";
import { DataSnapshot } from "@angular/fire/database/interfaces";

@Injectable()
export class AuthProvider {
    private user: firebase.User;

    constructor(
        public angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase
    ) {
        angularFireAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    authenticated() {
        return this.getUser() != null;
    }

    private getSnapshotChild(snapshot: DataSnapshot, child: string): any {
        return snapshot.hasChild(child) ? snapshot.child(child).val() : null;
    }

    getUser(): Promise<User> {
        let name = '';
        let mobile = 0;
        let email = '';
        let photoUrl = '';

        let userDetailsPath = '/users/' + this.user.uid + '/details';
        return this.angularFireDatabase.object(userDetailsPath).query.once('value').then(snapshot => {
            name = this.getSnapshotChild(snapshot, 'name');
            mobile = this.getSnapshotChild(snapshot, 'mobile');
            email = this.getSnapshotChild(snapshot, 'email');
            photoUrl = this.getSnapshotChild(snapshot, 'photoUrl');

            return new Promise((resolve, reject) => {
                if (name == null && mobile == null && email == null)
                    reject('Failed to retrieve user data from database.');
                else
                    resolve(new User(this.user.uid, name, mobile, email, photoUrl));
            });
        });
    }

    signInWithEmail(email: string, password: string) {
        console.log('Sign in with email.');
        return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    signUpWithEmail(email: string, password: string) {
        console.log('Sign up with email.');
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.angularFireAuth.auth.signOut();
    }
}