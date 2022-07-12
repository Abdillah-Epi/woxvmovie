import { validateAll } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer';
import { ResponseComposition, RestContext, RestRequest } from 'msw';
const messages = {
    required: (field: any) => `${field} is required`,
    alpha_numeric: (field: any) => `${field} contains unallowed characters`,
    alpha: (field: any) => `${field} contains unallowed characters`,
    email: (field: any) => `${field} is an invalid email address`,
    min: (field: any) => `${field} is too short`,
    max: (field: any) => `${field} is too long`,
    string: (field: any) => `${field} must be a string`
};

interface ErrorRequest {
    message: string;
    validation: string;
    field: string;
}

export let requestValidators = async (rules: any, req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return await validateAll(req.body, rules, messages)
        .then(() => true)
        .catch((e: ErrorRequest[]) => {
            let errs: { [key: string]: string }[];
            errs = e.map((err: ErrorRequest) => {
                return {
                    [`VALIDATOR_${err.field.toUpperCase()}_${err.validation.toUpperCase()}`]: `rule: ${err.validation}: ${err.message}.`
                };
            });
            res(ctx.status(400), ctx.json({ success: false, error: errs, error_code: 'VALIDATE_PAYLOAD' }));
            return false;
        });
};
