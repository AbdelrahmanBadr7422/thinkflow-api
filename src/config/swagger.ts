import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express, type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_URL = process.env.API_URL || "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ThinkFlow API",
      version: "1.0.0",
      description: "API documentation for ThinkFlow App",
      contact: {
        name: "ThinkFlow Support",
        email: "support@thinkflow.com",
      },
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
    "./dist/modules/**/*.js",
    "../modules/**/*.ts",

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
            .links {
              text-align: center;
              padding: 20px;
              background: #f5f5f5;
            }
            .links a {
              margin: 0 15px;
              text-decoration: none;
              color: #667eea;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ThinkFlow API</h1>
            <p>Documentation v1.0.0</p>
          </div>
          <div class="links">
            <a href="/docs">Swagger UI</a>
            <a href="/swagger.json">Raw JSON</a>
            <a href="/health">Health Check</a>
            <a href="/">Home</a>
          </div>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
          <script>
            window.onload = function() {
              const ui = SwaggerUIBundle({
                url: '/swagger.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIBundle.SwaggerUIStandalonePreset
                ],
                layout: "BaseLayout",
                defaultModelsExpandDepth: 1,
                defaultModelExpandDepth: 3,
                displayRequestDuration: true,
                filter: true
              });
              window.ui = ui;
            };
          </script>
        </body>
      </html>
    `;
    res.send(html);
  });

  console.log(
    `API Documentation available at (HTML Docs) : ${APP_URL}/api-docs`
  );
}
