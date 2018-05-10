const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/Hello', (req, res) => {
  console.log(req.query)
  var PythonShell = require('python-shell');
  var options = {
  	args:[req.query['q1'],req.query['q2']]
  };
  PythonShell.run('test.py',options,function(err,result){
  	if (err) throw err;
  	res.send({express:result[0]})
  	console.log(result[0]);
  });
  /*var child_process = require('child_process');
	  child_process.exec('python test.py', function (e, stdout, stderr){
	  	result = stdout
	  	console.log(stdout.toString());
	  	res.write(stdout);
	  	res.end('end');
	    if (stderr) {
	    console.log("child processes failed with error code: " + stderr.code);
	  }
	});*/
});

app.listen(port, () => console.log(`Listening on port ${port}`));