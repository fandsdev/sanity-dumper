const { run } = require('./scheduler');

run(process.env.CRON_SCHEDULE_EXPRESSION);
