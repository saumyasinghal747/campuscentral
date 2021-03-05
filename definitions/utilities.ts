const {validate} = require('deep-email-validator')
const bcrypt = require('bcrypt');
const saltRounds = 10;
export async function isValidEmail(email: string) {
    const res = await validate({
        email,
        sender:email,
        validateSMTP: false
    });
    return res.valid;
}

export async function hashPassword(password: string):Promise<string>{

    return await bcrypt.hash(password, saltRounds)
}

export async function validatePassword(password: string, hash: string): Promise<boolean> {
    //return passwordHash.verify(password, hash);
    return await bcrypt.compare(password, hash);
}

