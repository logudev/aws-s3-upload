// Import required AWS SDK clients and commands for Node.js.
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const REGION = 'ap-south-1';
const s3Client = new S3Client({ region: REGION });
const path = require('path');
const fs = require('fs');

const file = './mobile/IN/en/auth/login.properties'; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file);
console.log(path.basename(file));

// Set the parameters
const uploadParams = {
  Bucket: 'springboard-content',
  // Add the required 'Key' parameter using the 'path' module.
  Key: path.basename(file),
  // Add the required 'Body' parameter
  Body: fileStream,
};

// Upload file to specified bucket.
const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log('Success', data);
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};
run();
