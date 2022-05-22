/**
 * @swagger
 * components:
 *  schemas:
 *      Albums:
 *          type: object
 *          properties:
 *
 *             id:
 *                 type: string
 *                 description: ObjectId of Albums
 *             name:
 *                 type: string
 *                 description: Name of Albums
 *             gender:
 *                 type: string
 *                 description: Gender of Albums
 *             listeners:
 *                 type: number
 *                 description: Listeners of Albums
 *
 *          required:
 *             - id
 *             - name
 *             - gender
 *             - lister
 *          example:
 *             id: 23544545fgddfs
 *             name: Sonrisa
 *             gender: Salsa
 *             listeners: 12344
 * @swagger
 * /usuarios:
 *  get:
 *    summary: Get all albums
 *    tags: [Albums]
 *    responses:
 *      200:
 *          description: Correct!
 *      500: 
 *          description: Error!
 * 
 * @swagger
 * /usuarios:
 *  post:
 *    summary: Create new album
 *    tags: [Albums]
 *    description: _id es string y no es requerido.
 *                 Name es string y es requerido.
 *                 Gender es string y es requerido.
 *                 Listeners es number y es requerido.
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                  
 *    responses:
 *      201:
 *          description: Successfully created a new album!
 *      500:
 *          description: Failed to create a new album!
 *      400:
 *          description: Error!
 * 
 * 
 * @swagger
 * /usuarios/id:
 *  put:
 *      summary: Edit a Album
 *      tags: [Albums]
 *      description: _id es string y no es requerido.
 *                   Name es string y es requerido.
 *                   Gender es string y es requerido.
 *                   Listeners es number y es requerido.
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *              type: objectId
 *          required: true
 *          description: Identificador del Album
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *      responses:
 *          200:
 *              description: Successfully updated album with id ${id}!
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: object
 *          304:
 *              description: Album with id ${id} not updated!
 *          400:
 *              description: Error!
 *
 * 
 * @swagger
 * /usuarios/id:
 *  delete:
 *      summary: Delete a Album
 *      tags: [Albums]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *              type: objectId
 *          required: true
 *          description: Identificador del Album
 *      responses:
 *          202:
 *              description: Successfully removed album with id ${id}!
 *          400:
 *              description: Failed to remove album with id ${id}!
 *          404:
 *              description: Album with id ${id} does not exist!
 *          500:
 *              description: Error!
 *
 */ 

