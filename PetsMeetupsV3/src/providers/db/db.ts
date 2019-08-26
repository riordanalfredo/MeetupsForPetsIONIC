import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../../models/User';
import { Pet } from '../../models/Pet';

@Injectable()
export class DbProvider {
  USERS_LIST = 'users';
  USER_DETAILS_LIST = 'details';
  USER_PETS_LIST = 'pets';

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  private getUserList(userId: string): string {
    return '/' + this.USERS_LIST + '/' + userId;
  }

  public addUser(user: User) {
    return this.angularFireDatabase
      .object(this.getUserList(user.getUserId()) + '/' + this.USER_DETAILS_LIST)
      .set({
        name: user.getName(),
        mobile: user.getMobile(),
        email: user.getEmail(),
        photoUrl: user.getPhotoUrl()
      });
  }

  public addPet(userId: string, pet: Pet) {
    return this.angularFireDatabase
      .list(this.getUserList(userId) + '/' + this.USER_PETS_LIST)
      .push({
        name: pet.getName(),
        description: pet.getDescription(),
        avatarUrl: pet.getAvatarUrl()
      });
  }

  private getAllUsers() {
    return this.angularFireDatabase.database.ref('/users');
  }

  private getAllPetsForUser(userId: string) {
    return this.angularFireDatabase.database.ref('/users/' + userId + '/pets');
  }

  public getAllPets() {
    let petList = [];

    this.getAllUsers().on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        // Saves the user id to access the pets
        let key = childSnapshot.key;
        // Find all the pets that belong to a particular user
        this.getAllPetsForUser(key).on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
            petList.push([childSnapshot.key, childSnapshot.val()]);
          });
        });
      });
    });

    return petList;
  }
}
