import { isValidEmail } from "./utilities";
import { v4 as generateUID } from 'uuid';
import { client } from "../plugins/mongo";
import { SchoolMember } from "./internal";
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export class User {
    // internal thing for linking accs
    uid: string;
    _id:string;
    firstName: string;
    passwordHash: string;
    lastName: string;
    photoURL:string;
    verified: boolean;
    email: string; // an overall controlling email, but each SchoolMember can have a different email
    institutions: Array<number>; // school member ids

    constructor({uid, firstName, lastName, email, passwordHash, verified}:{uid:string,firstName:string, lastName:string, email:string, passwordHash:string, verified:boolean}){
        this.uid = uid;
        this._id = uid;
        this.verified = verified
        // TODO: set photoURL to some default value

        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        if (!isValidEmail(email)) throw new Error("Invalid email");
        this.email = email; // server side email validation? yes.


    }

    static fromJSON({uid, firstName, lastName, email, passwordHash, institutions, verified}:{uid:string,firstName:string, lastName:string, email:string, passwordHash:string, institutions:Array<number>, verified:boolean}):User{
        const user = new User({uid, firstName, lastName, email, passwordHash, verified});
        user.institutions = institutions;
        return user;
    }

    async sendEmailVerification(){
        // lets hold off on the
    }

    async setPhotoURL(photoURL:string):Promise<void>{
        this.photoURL = photoURL;
        // TODO: check if this works
        const users = client.db("campuscentral").collection("users");
        users.updateOne({uid: this.uid}, {photoURL});
    }

    static async isEmailAvailable(email: string): Promise<boolean> {
        const users = client.db("campuscentral").collection("users");
        try {
            const user = await users.findOne({email});
            if (!user) {
                throw new Error("User not found");
            }
            return false;
        }
        catch (e) {
            return true;
        }
    }
    // add functions that communicate with database

    static async create({firstName, lastName, email,passwordHash}:{firstName:string, lastName:string, email:string,passwordHash:string}):Promise<User> {
        // email is required? indeed. first name and last name are required too.
        // validate email!
        if (!(await isValidEmail(email)) ) {

            // should also check whether email is taken or not
            throw new Error("Invalid email");
        }
        else if (!(await User.isEmailAvailable(email))) {
            throw new Error("Email is already in use");
        }

        // generate a new uid.
        const uid:string = generateUID();
        const user =  new User({
            uid, email, firstName, lastName, passwordHash, verified:false
        });
        user.institutions = [];
        // create user object

        // add it to the database.
        //db.collection('users').insertOne(user);
        console.log(user.toJSON())
        const users = client.db("campuscentral").collection("users");
        await users.insertOne(user.toJSON());

        //db.collection('users').indexes().then(console.log)
        // return it
        return user;

    }

    public toJSON(): Object {
        return {
            _id:this._id,
            uid:this.uid,
            firstName: this.firstName,
            passwordHash: this.passwordHash,
            lastName: this.lastName,
            photoURL:this.photoURL,
            email: this.email,
            institutions: this.institutions
            // just add a fetch() method for SchoolMember class
        }
    }
}
