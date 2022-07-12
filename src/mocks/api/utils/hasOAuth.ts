import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { OAuth } from '../../database/auth';

export const hasOAuth = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    if (!req.headers.has('authorization')) {
        return {
            status: false,
            res: res(
                ctx.status(403),
                ctx.json({ success: false, error: 'Forbidden', error_code: 'OAUTH_VALIDATION_BEARER_TOKEN' })
            )
        };
    }

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token !== OAuth) {
        return {
            status: false,
            res: res(
                ctx.status(403),
                ctx.json({ success: false, error: 'Forbidden', error_code: 'OAUTH_VALIDATION_BEARER_TOKEN' })
            )
        };
    }

    return { status: true };
};
