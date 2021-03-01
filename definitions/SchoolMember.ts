import User from "./User";
import School from "./School";
//import Course from "./Course";
import Group from "./Group";
import CourseMember from "./CourseMember";

// like schoology's enrollment

export default class SchoolMember {

    user: User;
    email: string;
    school: School;
    private courses: Array<CourseMember>; // should be an array of course memberships
    private groups: Array<Group>; // an array of group memberships

    constructor(user: User, school: School){
        // hmm do we really want to make a constructor. I guess on the serverside.

    }



}
