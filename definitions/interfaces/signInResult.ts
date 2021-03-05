import {User} from "../internal";

export default interface signInResult {
    valid: boolean;
    result:  User | {
        code: string;
        // invalid-email
        // wrong-password

        message: string;
        // No account associated with this email. Perhaps you meant to signup?
    }
}
