export class User {
    private userId: string;
    private name: string;
    private mobile: number;
    private email: string;
    private photoUrl: string;

    constructor(userId: string, name: string, mobile: number, email: string, photoUrl: string) {
        this.userId = userId;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.photoUrl = photoUrl;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getMobile(): number {
        return this.mobile;
    }

    public setMobile(mobile: number) {
        this.mobile = mobile;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhotoUrl(): string {
        return this.photoUrl;
    }

    public setPhotoUrl(photoUrl: string) {
        this.photoUrl = photoUrl;
    }
}