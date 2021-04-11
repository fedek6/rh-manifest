https://claudiajs.com/tutorials/lambda-api-dynamo-db.html
https://stackoverflow.com/questions/49997221/aws-lambda-returns-empty-response-on-rds-connect-nodejs
https://github.com/claudiajs/example-projects/blob/master/env-variables/package.json
https://ivanjov.com/building-serverless-api-with-claudia-api-builder/
https://tylerzey.com/cloudflare-in-front-of-lambda-api-gateway/

```
api.get('/people/{name}', function (request) {
  'use strict';
  return request.pathParams.name + ' is cool!';
});

```