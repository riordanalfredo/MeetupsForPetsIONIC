export class Pet {
  private id: string;
  private name: string;
  private description: string;
  private avatarUrl: string;

  constructor(id: string, name: string, description: string, avatarUrl: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.avatarUrl = avatarUrl;
  }

  public getId(): string {
      return this.id;
  }

  public getName(): string {
      return this.name;
  }

  public setName(name: string) {
      this.name = name;
  }

  public getDescription(): string {
      return this.description;
  }

  public setDescription(description: string) {
      this.description = description;
  }

  public getAvatarUrl(): string {
      return this.avatarUrl;
  }

  public setAvatarUrl(avatarUrl: string) {
      this.avatarUrl = avatarUrl;
  }
}
