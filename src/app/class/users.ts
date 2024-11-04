export class UserRole {
    constructor (
        public id: number,
        public roleName : string
    ) {}
}
export class Usuarios {
    constructor (
        public documentId : string,
        public userName : string,
        public userLastName : string,
        public email : string,
        public password : string,
        public roleId : UserRole,
        public createAcounteDate : Date
    ) {}
}
