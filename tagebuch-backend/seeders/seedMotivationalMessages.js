// scripts/seedMotivationalMessages.js (example name)
const mongoose = require('mongoose');
const MotivationalMessage = require('../models/MotivationalMessage');

const seedMotivationalMessages = async () => {
  // MAKE SURE this uses `content` not `inhalt`
  const messages = [
    { content: 'Believe in yourself and all that you are!' },
    { content: 'Every day is a second chance to succeed!' },
    { content: 'You are capable of amazing things!' },
    { content: 'Stay positive, work hard, and make it happen!' },
    { content: 'Dream big, work hard, stay focused, and surround yourself with good people!' },
  ];

  try {
    console.log('Seeding motivational messages...');
    
    // Only insert if no messages exist
    const existingMessages = await MotivationalMessage.countDocuments();
    if (existingMessages === 0) {
      await MotivationalMessage.insertMany(messages);
      console.log('Motivational messages seeded successfully!');
    } else {
      console.log('Motivational messages already exist. Skipping seeding.');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding motivational messages:', error);
    mongoose.connection.close();
  }
};

seedMotivationalMessages();
