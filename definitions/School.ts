import Realm from "./abstract/Realm";
import User from "./User";
import SchoolMember from "./SchoolMember";

export default class School implements Realm {
    id: string;
    title: string;
    address1:string;
    address2: string
    city: string;
    state: string;
    postal_code: string;
    country: string;
    website: string;
    phone: string;
    fax: string;
    picture_url: string;
    members: Array<SchoolMember>;
    constructor({id, title, address1, address2, city, state, postal_code, country, website, phone, fax, picture_url}) {
        this.id = id;
        this.title = title;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.postal_code = postal_code;
        this.country = country;
        this.website = website;
        this.phone = phone;
        this.fax = fax;
        this.picture_url = picture_url;
    }

    registerMember(user: User): SchoolMember{
        // TODO: interactions with database to add user to memberlist or whatever
        return new SchoolMember(user, this);
    }

    isMember(user: User):boolean{
        return this.members.filter(m => m.user === user).length === 1 ;
    }
}
