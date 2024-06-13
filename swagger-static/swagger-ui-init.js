
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/users": {
        "post": {
          "operationId": "AppController_createUser",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The user has been successfully created."
            },
            "400": {
              "description": "Bad Request"
            }
          },
          "tags": [
            "Users"
          ]
        },
        "get": {
          "operationId": "AppController_getUsers",
          "parameters": [],
          "responses": {
            "200": {
              "description": "All Users returned"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/users/{id}": {
        "put": {
          "operationId": "AppController_updateUser",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "The user has been successfully updated."
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Users"
          ]
        }
      }
    },
    "info": {
      "title": "Users",
      "description": "The users API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "users",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "age": {
              "type": "number",
              "description": "The age of a user",
              "minimum": 10
            },
            "gender": {
              "type": "string"
            },
            "problems": {
              "type": "boolean"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "age",
            "gender",
            "problems"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "problems": {
              "type": "boolean"
            }
          },
          "required": [
            "problems"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
