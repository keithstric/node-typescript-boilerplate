/**
 * This file sets up swagger-js and swagger-ui-express to
 * automatically generate swagger documentation and swagger.json. It also
 * sets up the reusable models for swagger.
 * For jsDoc structure visit:
 * - https://github.com/Surnet/swagger-jsdoc/blob/master/docs/GETTING-STARTED.md
 * - https://github.com/Surnet/swagger-jsdoc/tree/master/example/v2
 * - https://swagger.io/docs/specification/paths-and-operations/
 * - https://www.oodlestechnologies.com/blogs/Integrate-Swagger-in-your-NodeJS-Application/
 */
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application, Request, Response } from 'express';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'node-typescript-boilerplate',
			version: '1.0.0',
			description: 'node-typescript-boilerplate api',
			contact: {
				name: 'Keith Strickland',
				email: 'keithstric@gmail.com'
			}
		},
		components: {
			schemas: {
				Error: {
					type: 'object',
					properties: {
						data: {
							type: 'object'
						},
						hasMore: {
							type: 'number'
						},
						id: {
							type: 'number'
						},
						message: {
							type: 'string'
						},
						name: {
							type: 'string'
						},
						previous: {
							type: 'array',
							items: {
								type: 'object'
							}
						},
						type: {
							type: 'string'
						}
					}
				},
				Log: {
					type: 'object',
					properties: {
						message: {
							type: 'string'
						},
						level: {
							type: 'string'
						},
						service: {
							type: 'string'
						},
						timestamp: {
							type: 'string'
						}
					}
				},
				Person: {
					allOf: [
						{
							type: 'object',
							properties: {
								first_name: {
									type: 'string'
								},
								last_name: {
									type: 'string'
								},
								email: {
									type: 'string'
								},
								password: {
									type: 'string'
								}
							}
						}
					]
				},
			},
			responses: {
				Error: {
					description: 'Error Object',
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/Error'
							}
						}
					}
				},
				Message: {
					description: 'Message Object',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									message: {
										type: 'string'
									}
								}
							}
						}
					}
				},
				Person: {
					description: 'Person Object',
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/Person'
							}
						}
					}
				}
			},
			parameters: {
				ObjectQueryParam: {
					in: 'query',
					name: 'params',
					description: 'A JSON object that includes the query parameters to query the DB',
					schema: {
						type: 'object',
						additionalProperties: {
							type: 'object'
						}
					},
					style: 'form',
					explode: true
				}
			}
		},
		basePath: '/'
	},
	apis: [
		'./dist/routes/app.js'
	]
};

const swaggerOptions = {
	customCssUrl: '/theme-material.css'
}

const swaggerSpec = swaggerJsdoc(options);
const swaggerDocs = (app: Application) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
	app.get('/api-docs.json', (req: Request, res: Response) => {
		res.send(swaggerSpec);
	});
};

export default swaggerDocs;
