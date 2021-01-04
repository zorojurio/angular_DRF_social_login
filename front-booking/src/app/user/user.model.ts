export class User {
  constructor(
    public username: string,
    private userToken: string,
    // tslint:disable-next-line:variable-name
    private _tokenExpirationDate: Date
  ) {
  }

  get token(): any {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this.userToken;
  }

}
