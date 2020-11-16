// Runs .env file
require('dotenv').config();

// Change this for the bot prefix
export const botPrefix = '$';

// Change this for printing of debug information
export const debugLogs = true;

// Toggle Logging Out to File
export const logsFile = true;

// Footer Text on Embeds
export const footerText = 'MusicBot Created by Taso#0001';

//Music Commands
export const musicOptions = {
  leaveOnEmpty: false,
  leaveOnStop: true,
  leaveOnEnd: true,
};
