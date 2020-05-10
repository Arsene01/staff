
//create new entity
//create and bind personal data

const dispatcher = new (require('./dispatcher.js'))();
process.stdin.setEncoding('utf8');


process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`Application: ${chunk} has been inserted\n`);
    process.stdout.write(`Application: ${dispatcher.getMessage(chunk)}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
