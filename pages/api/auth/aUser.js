import nextConnect from 'next-connect';
import authMidWare from '../../../middleware/userAuthMiddleware';
import { extractUser } from '../../../utils/auth/userHelper';

const handler = nextConnect();
handler.use(authMidWare);

handler.get(async (req, res) => {
    
    res.json({ user: extractUser(req) })

    });

export default handler;
