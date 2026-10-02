const http = require('http');

const data = JSON.stringify({
  student: {
    technicalSkills: {
      programmingLanguages: ["Python", "JavaScript", "C++"]
    }
  }
});

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/analysis/roles',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', console.error);
req.write(data);
req.end();
