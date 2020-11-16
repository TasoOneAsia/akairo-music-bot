import { Logger, ILogObject } from 'tslog';
import { appendFileSync, existsSync, fstat } from 'fs';
import { debugLogs, logsFile } from '../Config';
import path from 'path';
import { debug } from 'console';

const logsPath = path.join(__dirname, `/logs`, `log.txt`);

// Prints out to log file in /logs/{logType}.tx
function logToFile(logObj: ILogObject) {
  appendFileSync(logsPath, JSON.stringify(logObj) + '\n');
}

function attachTrans(): void {
  debugLogger.attachTransport(
    {
      silly: logToFile,
      debug: logToFile,
      trace: logToFile,
      info: logToFile,
      warn: logToFile,
      error: logToFile,
      fatal: logToFile,
    },
    debugLogs ? 'debug' : 'info'
  );
}

// Initiate Logger
const debugLogger = new Logger({
  name: 'Bot Main',
  prefix: ['[Bot Logs]'],
});

// Print Logs Out if Enabled
if (logsFile) {
  try {
    if (existsSync(logsPath)) attachTrans;
  } catch (e) {
    debugLogger.error(e);
  }
}

export default debugLogger;
