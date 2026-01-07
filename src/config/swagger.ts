import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express, type Request, type Response } from "express";

const APP_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ThinkFlow API",
      version: "1.0.0",
      description: "API documentation for ThinkFlow App",
    },
    servers: [
      {
        url: APP_URL,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local development server",
      },
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT Bearer token",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message here",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Success message here",
            },
            data: {
              type: "object",
              description: "Response data",
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                message: "Authentication required",
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                message: "Resource not found",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation failed",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                message: "Validation error details",
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/modules/**/*.ts",
    "./dist/modules/**/*.js",
    "./src/modules/**/*.js",
    "./src/modules/**/**.ts",
    "./dist/modules/**/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app: Express) {
  app.get("/swagger.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "ThinkFlow API Docs",
      customCss: ".swagger-ui .topbar { display: none }",
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
        showRequestDuration: true,
      },
    })
  );

  app.get("/api-docs", (_req: Request, res: Response) => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ThinkFlow API Documentation</title>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 2.5em;
            }
            .header p {
              margin: 10px 0 0;
              opacity: 0.9;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ThinkFlow API</h1>
            <p>Documentation v1.0.0</p>
          </div>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        </body>
      </html>
    `;
    res.send(html);
  });

  console.log(
    `API Documentation available at (HTML Docs) : ${APP_URL}/api-docs`
  );
}
