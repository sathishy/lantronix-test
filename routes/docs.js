const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger API',
    version: '1.0.0',
    description: 'Describing RESTful API with Swagger'
  }
}

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./controllers/*/*.js']
}

const router = express.Router();

const specs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
