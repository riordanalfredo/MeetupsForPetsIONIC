export class Pet {
    private name: string;
    private description: string;
    private avatarUrl: string;

    constructor(name: string, description: string, avatarUrl: string) {
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