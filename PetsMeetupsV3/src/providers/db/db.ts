import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../../models/User';
import { Pet } from '../../models/Pet';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class DbProvider {

  USERS_LIST = 'users';
  USER_DETAILS_LIST = 'details';
  USER_PETS_LIST = 'pets';

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authProvider: AuthProvider
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

  public updateUserDetails(user: User) {
    this.authProvider.updateEmail(user.getEmail());

    // addUser updates the details, but creates new details if it is not present.
    // The function can be reused for updating details.
    return this.addUser(user);
  }

  public addPet(userId: string, pet: Pet) {
    return this.angularFireDatabase.list(this.getUserList(userId) + '/' + this.USER_PETS_LIST).push({
      name: pet.getName(),
      description: pet.getDescription(),
      avatarUrl: pet.getAvatarUrl()
    });
  }

  public async getPets(userId: string): Promise<Array<Pet>> {
    let pets: Array<Pet> = new Array<Pet>();

    await this.angularFireDatabase.object(this.getUserList(userId) + '/' + this.USER_PETS_LIST).query.once('value').then(snapshot => {
      snapshot.forEach(petSnapshot => {
        let id = petSnapshot.key;
        let name = petSnapshot.child('name').val();
        let description = petSnapshot.child('description').val();
        let avatarUrl = petSnapshot.child('avatarUrl').val();

        pets.push(new Pet(id, name, description, avatarUrl));
      });
    });

    return new Promise<Array<Pet>>(resolve => resolve(pets));
  }

  public async getAllUsers(): Promise<Array<User>> {
    let users: Array<User> = new Array<User>();

    await this.angularFireDatabase.object(this.USERS_LIST).query.once('value').then(snapshot => {
      snapshot.forEach(userSnapshot => {
        let userId = userSnapshot.key;
        let details = userSnapshot.child(this.USER_DETAILS_LIST);
        
        this.getPets(userId).then(pets => {
          let user = new User(userId, details.child('name').val(), details.child('mobile').val(), details.child('email').val(), details.child('photoUrl').val());

          pets.forEach(pet => user.addPet(pet));

          users.push(user);
        });
      });
    });

    return new Promise<Array<User>>(resolve => resolve(users));
  }


  public async getAllPets(): Promise<Array<Pet>> {
    let returnedPets: Array<Pet> = new Array<Pet>();
    await this.angularFireDatabase.object(this.USERS_LIST).query.once('value').then(snapshot => {
      snapshot.forEach(userSnapshot => {
        let userId = userSnapshot.key;
        this.getPets(userId).then(pets => {
          pets.forEach(pet => returnedPets.push(pet));
        });
      });
    });

    return new Promise<Array<Pet>>(resolve => resolve(returnedPets));
  }
}
