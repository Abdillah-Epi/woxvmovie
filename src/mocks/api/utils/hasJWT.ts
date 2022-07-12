import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { AccessToken } from '../../database/auth';

export const hasJWT = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    if (!req.headers.has('jwttoken')) {
        return {
            status: false,
            res: res(ctx.status(401), ctx.json({ success: false, error: 'Unauthorized', error_code: 'JWT_ERROR' }))
        };
    }
    const token = req.headers.get('jwttoken')?.split(' ')[1];
    if (token !== AccessToken) {
        return {
            status: false,
            res: res(ctx.status(401), ctx.json({ success: false, error: 'Unauthorized', error_code: 'JWT_ERROR' }))
        };
    }

    return { status: true };
};
