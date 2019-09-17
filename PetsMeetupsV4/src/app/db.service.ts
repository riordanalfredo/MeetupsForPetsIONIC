import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { User } from 'src/models/User';
import { Pet } from 'src/models/Pet';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  USERS_LIST = 'users';
  USER_DETAILS_LIST = 'details';
  USER_PETS_LIST = 'pets';

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private angularFireStorage: AngularFireStorage,
    private authProvider: AuthService
  ) {
  }

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

  public updateUserDetails(user: User) {
    this.authProvider.updateEmail(user.getEmail());

    // addUser updates the details, but creates new details if it is not present.
    // The function can be reused for updating details.
    return this.addUser(user);
  }

  public async addPet(pet: Pet) {
    return await this.authProvider.getUser().then(user => {
      this.angularFireDatabase
        .list(this.getUserList(user.getUserId()) + '/' + this.USER_PETS_LIST)
        .push({
          name: pet.getName(),
          description: pet.getDescription(),
          avatarUrl: pet.getAvatarUrl()
        });
    });
  }

  private getAllUsersRef() {
    return this.angularFireDatabase.database.ref('/users');
  }

  private getAllPetsForUser(userId: string) {
    return this.angularFireDatabase.database.ref('/users/' + userId + '/pets');
  }

  private getUsersPhoneNumber(userId: string) {
    return this.angularFireDatabase.database.ref('/users/' + userId + '/details/mobile');
  }

  public getAllPets() {
    let petList = [];

    this.getAllUsersRef().on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        // Saves the user id to access the pets
        let key = childSnapshot.key;
        let phone = '';
        this.getUsersPhoneNumber(key).on('value', snapshot => {
          phone = snapshot.val();
        });
        // Find all the pets that belong to a particular user
        this.getAllPetsForUser(key).on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
            petList.push([phone, childSnapshot.val()]);
          });
        });
      });
    });

    return petList;
  }

  public async updatePetDetails(pet: Pet): Promise<void> {
    return new Promise<void>(resolve => {
      this.authProvider.getUser().then(user => {
        this.angularFireDatabase.object(this.getUserList(user.getUserId()) + '/' + this.USER_PETS_LIST + '/' + pet.getId()).set({
          name: pet.getName(),
          description: pet.getDescription(),
          avatarUrl: pet.getAvatarUrl()
        }).then(() => resolve())
          .catch(reason => console.log(reason));
      });
    });
  }

  public async deletePet(pet: Pet): Promise<void> {
    return new Promise<void>(resolve => {
      this.authProvider.getUser().then(user => {
        this.deletePetImage(pet).then(() => {
          this.angularFireDatabase.object(this.getUserList(user.getUserId()) + '/' + this.USER_PETS_LIST + '/' + pet.getId()).remove().then(() => resolve());
        });
      });
    });
  }

  public async getPets(): Promise<Array<Pet>> {
    let pets: Array<Pet> = new Array<Pet>();

    await this.authProvider.getUser().then(user => {
      this.angularFireDatabase.object(this.getUserList(user.getUserId()) + '/' + this.USER_PETS_LIST).query.once('value').then(snapshot => {
        snapshot.forEach(petSnapshot => {
          let id = petSnapshot.key;
          let name = petSnapshot.child('name').val();
          let description = petSnapshot.child('description').val();
          let avatarUrl = petSnapshot.child('avatarUrl').val();

          pets.push(new Pet(id, name, description, avatarUrl));
        });
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

        this.getPets().then(pets => {
          let user = new User(userId, details.child('name').val(), details.child('mobile').val(), details.child('email').val(), details.child('photoUrl').val());

          pets.forEach(pet => user.addPet(pet));

          users.push(user);
        });
      });
    });

    return new Promise<Array<User>>(resolve => resolve(users));
  }

  public uploadPetImage(image: any): AngularFireUploadTask {
    const imagePath = `pet_${new Date().getTime()}.jpg`;

    return this.angularFireStorage.ref(imagePath).putString(image, 'data_url');
  }

  public async deletePetImage(pet: Pet): Promise<void> {
    return new Promise<void>(resolve => {
      let petRef = pet.getAvatarUrl().match(/pet_.*jpg/)[0];
      this.angularFireStorage.ref(petRef).delete().subscribe(() => resolve());
    });
  }
}
