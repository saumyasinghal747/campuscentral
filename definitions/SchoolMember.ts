import {User} from "./internal";
import School from "./School";
//import Course from "./Course";
import { v4 as generateUID } from 'uuid';
import Group from "./Group";
import CourseMember from "./CourseMember";

// like schoology's enrollment

export class SchoolMember {

    user: User;
    id: number;
    _id: number;
    email: string;
    school: School;
    courses: Array<CourseMember>; // should be an array of course memberships
    groups: Array<Group>; // an array of group memberships

    constructor(user: User, school: School, id:string){
        // hmm do we really want to make a constructor. I guess on the serverside.
        this.user = user;
        this.school=school;
    }

    toJSON(root:boolean=false){
        // root won't be included by these automatic things, so we can take advantage
        if (!root){
            // we are a child.
            return this._id; // so User will have an array of IDs
        }
    }

    static async create(user: User, school: School){
        // to be used internally and called from User.addInstitution()
    }

}
