const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');


const poolData = {
  UserPoolId : process.env.COGNITO_USER_POOL_ID, // Your User Pool Id
  ClientId :  process.env.COGNITO_APP_CLIENT_ID// Your Client Id
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let cognitoUser = userPool.getCurrentUser();

async function registerUser(firstname, lastname, email, phone, interest, password, gender, birthdate) {
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [
      { Name: 'given_name', Value: firstname },
      { Name: 'family_name', Value: lastname },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phone },
      { Name: 'gender', Value: gender },
      { Name: 'birthdate', Value: birthdate },
      { Name: 'custom:category', Value: interest },
    ],
  };

  try {
    const signUpResponse = await cognitoIdentityServiceProvider.signUp(params).promise();

    const confirmParams = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
    };

    await cognitoIdentityServiceProvider.adminConfirmSignUp(confirmParams).promise();

    return signUpResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


async function authenticateUser(email, password) {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  };

  console.log('Authenticating user with params:', params); // Add this line

  return new Promise((resolve, reject) => {
    cognitoIdentityServiceProvider.initiateAuth(params, (error, data) => {
      if (error) {
        console.error('InitiateAuth error:', error); // Add this line
        reject(error);
      } else {
        console.log('InitiateAuth success:', data); // Add this line
        resolve(data.AuthenticationResult);
      }
    });
  });
}

module.exports = {
  registerUser,
  authenticateUser
};
