import Realm from "./abstract/Realm";
import School from "./School";
import GroupMember from "./GroupMember";

export default class Group implements Realm {
    id: string;
    school: School;
    members: Array<GroupMember>;
}
