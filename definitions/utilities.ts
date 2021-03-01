import validate from 'deep-email-validator'

export async function isValidEmail(email: string) {
    const res = await validate(email);
    return res.valid;
}
