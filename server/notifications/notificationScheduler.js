const sgMail = require('@sendgrid/mail');
const { MongoClient } = require('mongodb');
const schedule = require('node-schedule');

// Set your SendGrid API key
sgMail.setApiKey('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');

// Set up a MongoDB connection
const mongoUri = "mongodb+srv://PrinciplesSWE:VandyIceHockey@danielblog.te9b5na.mongodb.net/?retryWrites=true&w=majority"; // Your MongoDB URI
const dbName = 'your_db_name'; // Your MongoDB database name
const collectionName = 'users'; // The name of your collection

// Function to fetch users from the database
async function fetchUsers() {
  try {
    const client = new MongoClient(mongoUri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const users = await collection.find().toArray();
    return users;
  } catch (error) {
    console.error('Error fetching users from the database:', error);
  }
}

// Function to send notifications
async function sendNotifications(users) {
  try {
    const mondayJob = schedule.scheduleJob('30 18 * * 1', async () => {
      // Schedule the job to run every Monday at 6:30 PM (local server time)

      // Customize your email content
      const emailContent = {
        subject: 'Your Weekly Reminder',
        text: 'This is your weekly reminder to fill out the attendance form before practice so we can coordinate rides!',
        from: 'aviv.d.roskes@vanderbilt.edu', // Should be a verified sender in SendGrid
      };

      for (const user of users) {
        // Customize the recipient's email address
        emailContent.to = user.email;

        // Send the email
        await sgMail.send(emailContent);

        console.log(`Email sent to ${user.email}`);
      }
    });

    console.log('Scheduled job to send notifications every Monday at 6:30 PM');
  } catch (error) {
    console.error('Error scheduling or sending notifications:', error);
  }
}

// Fetch users and send notifications
async function main() {
  const users = await fetchUsers();
  if (users && users.length > 0) {
    await sendNotifications(users);
  }
}

main();
