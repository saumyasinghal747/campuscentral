import { isValidEmail } from "./utilities";
import School from "./School";
import SchoolMember from "./SchoolMember";
export default class User {
    // internal thing for linking accs
    uid: number;
    firstName: string;
    lastName: string;
    email: string; // an overall controlling email, but each SchoolMember can have a different email
    institutions: Array<SchoolMember>;
    // cyclic attributes like courses

    constructor({uid, firstName, lastName, email}){
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        if (!isValidEmail(email)) throw new Error("Invalid email");
        this.email = email; // server side email validation? yes.

    }

    // add functions that communicate with database

}
