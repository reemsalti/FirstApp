
import { Auth } from 'aws-amplify';

Auth.configure({
  region: process.env.COGNITO_REGION,
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  userPoolWebClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
});

export const createAccount = async (email, password) => {
  try {
    const user = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Error creating account:', error);
  }
};

export const login = async (email, password) => {
  try {
    const user = await Auth.signIn(email, password);
    return user;
  } catch (error) {
    throw new Error('Error logging in:', error);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    throw new Error('Error signing out:', error);
  }
};

// Add any additional utility functions as needed


// const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

// const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');


// const poolData = {
//   UserPoolId : process.env.COGNITO_USER_POOL_ID, // Your User Pool Id
//   ClientId :  process.env.COGNITO_APP_CLIENT_ID// Your Client Id
// };

// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// let cognitoUser = userPool.getCurrentUser();

// async function registerUser(firstname, lastname, email, phone, interest, password, gender, birthdate) {
//   const params = {
//     ClientId: process.env.COGNITO_APP_CLIENT_ID,
//     Password: password,
//     Username: email,
//     UserAttributes: [
//       { Name: 'given_name', Value: firstname },
//       { Name: 'family_name', Value: lastname },
//       { Name: 'email', Value: email },
//       { Name: 'phone_number', Value: phone },
//       { Name: 'gender', Value: gender },
//       { Name: 'birthdate', Value: birthdate },
//       { Name: 'custom:category', Value: interest },
//     ],
//   };

//   try {
//     const signUpResponse = await cognitoIdentityServiceProvider.signUp(params).promise();

//     const confirmParams = {
//       UserPoolId: process.env.COGNITO_USER_POOL_ID,
//       Username: email,
//     };

//     await cognitoIdentityServiceProvider.adminConfirmSignUp(confirmParams).promise();

//     return signUpResponse;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }


// async function authenticateUser(email, password) {
//   const params = {
//     AuthFlow: 'USER_PASSWORD_AUTH',
//     ClientId: process.env.COGNITO_APP_CLIENT_ID,
//     AuthParameters: {
//       USERNAME: email,
//       PASSWORD: password
//     }
//   };

//   console.log('Authenticating user with params:', params); // Add this line

//   return new Promise((resolve, reject) => {
//     cognitoIdentityServiceProvider.initiateAuth(params, (error, data) => {
//       if (error) {
//         console.error('InitiateAuth error:', error); // Add this line
//         reject(error);
//       } else {
//         console.log('InitiateAuth success:', data); // Add this line
//         resolve(data.AuthenticationResult);
//       }
//     });
//   });
// }

// module.exports = {
//   registerUser,
//   authenticateUser
// };
