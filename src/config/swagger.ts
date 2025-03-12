import swaggerJsdoc from 'swagger-jsdoc';

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'Documentation complète de mon projet en TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3030',  // L'URL de ton serveur
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/services/*.ts', './src/middlewares/*.ts'], // Chemins des fichiers à documenter
};

// Générer la documentation Swagger à partir des annotations dans le code
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs };
