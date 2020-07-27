var FusionAuth = require('@fusionauth/typescript-client');
const client = new FusionAuth.FusionAuthClient(
    'VXSpw30vsqRUnpQ-hfpElnP0hqRCr4-5qljJky2ozZw',
    'http://localhost:9011'
);

// Retrieve User by Email Address
client.retrieveUserByEmail('alexgray1415@gmail.com')
       .then(handleResponse);

function handleResponse (clientResponse) {
  console.info(JSON.stringify(
    clientResponse.response.user, null, 2)
  );
}