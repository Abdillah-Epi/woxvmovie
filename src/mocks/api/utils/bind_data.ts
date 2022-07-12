import { ResponseComposition, RestContext, RestRequest } from 'msw';
import MakeRules from './make_rules';
import { requestValidators } from './requests';

export const ShouldBindJSON = async <T>(
    req: RestRequest,
    ctx: RestContext,
    res?: ResponseComposition,
    rules?: string[]
) => {
    if (!res) return req.body as T;
    if (!rules) return req.body as T;
    const request = MakeRules(rules);
    const isValid = await requestValidators(request, req, res, ctx);
    if (!isValid) return false;
    return req.body as T;
};
