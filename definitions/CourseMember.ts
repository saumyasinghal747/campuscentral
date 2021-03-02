import {User, SchoolMember} from "./internal";
import School from "./School";

// So this is like Schoology's Enrollment

export default class CourseMember {
    public user: User;
    public school: School;
    public schoolMembership: SchoolMember;

    constructor(){

    }

    // now grades for the specific course
    getGrades(){

    }
}
