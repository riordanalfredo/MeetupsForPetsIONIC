import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../../models/User';
import { Pet } from '../../models/Pet';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  USERS_LIST = 'users';
  USER_DETAILS_LIST = 'details';
  USER_PETS_LIST = 'pets';

  constructor(
    private angularFireDatabase: AngularFireDatabase
  ) {
  }

  private getUserList(userId: string): string {
    return '/' + this.USERS_LIST + '/' + userId;
  }

  public addUser(user: User) {
    return this.angularFireDatabase.object(this.getUserList(user.getUserId()) + '/' + this.USER_DETAILS_LIST).set({
      name: user.getName(),
      mobile: user.getMobile(),
      email: user.getEmail(),
      photoUrl: user.getPhotoUrl()
    });
  }

  public addPet(userId: string, pet: Pet) {
    return this.angularFireDatabase.list(this.getUserList(userId) + '/' + this.USER_PETS_LIST).push({
      name: pet.getName(),
      description: pet.getDescription(),
      avatarUrl: pet.getAvatarUrl()
    });
  }

}
