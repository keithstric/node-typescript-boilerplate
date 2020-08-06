import express, {Request, Response} from 'express';

export const apiRouter = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: The base route
 *     responses:
 *       401:
 *         $ref: '#/components/responses/Message'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
apiRouter.get('/', (req: Request, res: Response) => {
	res.send('Welcome to node-typescript-boilerplate, route="/api"');
});
