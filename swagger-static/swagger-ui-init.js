
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
      "/history": {
        "get": {
          "operationId": "HistoryController_getHistory",
          "parameters": [
            {
              "name": "sortBy",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "All Users returned"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "History of users"
          ]
        }
      }
    },
    "info": {
      "title": "History of users",
      "description": "The history of users API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "history of users",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {}
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
