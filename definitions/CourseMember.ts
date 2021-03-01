import User from "./User";
import School from "./School";
import SchoolMember from "./SchoolMember";

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
