import User from "./User";
import Group from "./Group";
import School from "./School";
import SchoolMember from "./SchoolMember";

export default class GroupMember {
    user: User;
    group: Group;
    school: School;
    schoolMembership: SchoolMember;
    constructor(schoolMember: SchoolMember, group: Group) {
        if (schoolMember.school !== group.school) throw new Error("schoolMember and group do not originate from the same School.");
        this.user = schoolMember.user;
        this.group = group;
        this.school = group.school;
        this.schoolMembership = schoolMember;
    }
}
