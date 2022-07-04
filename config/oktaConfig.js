const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-27750228.okta.com/oauth2/default', // issuer required
//   clientId: '0oa5azoxrxWUP7hYK5d7',
//   assertClaims: {
//     cid: '{clientId}'
//   }
});
const audience = 'api://default';

// oktaJwtVerifier.verifyAccessToken(accessTokenString, expectedAud)
// .then( jwt => {
//   // the token is valid 
//   console.log(jwt.claims);
// })
// .catch( err => {
//   // a validation failed, inspect the error
// });

module.exports.OKTA_Jwt_verifier = async (req, res, next) => {

    let access_token;
    if(!req.body.access_token){
        console.log("1")  
        return res.status(401).send({ auth: false, message: 'No token provided.'});    
    }
    try {
        console.log(2)
        access_token = req.body.access_token;
        req.jwt = await oktaJwtVerifier.verifyAccessToken(access_token, audience);
        next()
    } catch (err) {
        console.log(3)
        return res.staus(401).send(er)
    }

};
