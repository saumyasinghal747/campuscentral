import { isValidEmail } from "./utilities";
import { v4 as generateUID } from 'uuid';
import { db, usersDB } from "../plugins/mongo";
import { SchoolMember } from "./internal";
export class User {
    // internal thing for linking accs
    uid: string;
    _id:string;
    firstName: string;
    lastName: string;
    email: string; // an overall controlling email, but each SchoolMember can have a different email
    institutions: Array<SchoolMember>;

    constructor({uid, firstName, lastName, email}:{uid:string,firstName:string, lastName:string, email:string}){
        this.uid = uid;
        this._id = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        if (!isValidEmail(email)) throw new Error("Invalid email");
        this.email = email; // server side email validation? yes.

    }

    // add functions that communicate with database

    static create({firstName, lastName, email}:{firstName:string, lastName:string, email:string}):User {
        // email is required? indeed. first name and last name are required too.
        // validate email!
        if (!isValidEmail(email)) {

            // should also check whether email is taken or not

            throw new Error("Invalid email");
        }

        // generate a new uid.
        const uid:string = generateUID();
        const user =  new User({
            uid, email, firstName, lastName
        });
        // create user object

        // add it to the database.
        db.collection('users').insertOne(user);

        db.collection('users').indexes().then(console.log)
        // return it
        return user;

    }

}
