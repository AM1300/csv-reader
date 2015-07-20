var fs = require('fs');
var S = require('string');
var _ = require('underscore');
var path = require('path');

var getLines = function(file) {
	fs.readFile(file, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var lines = S(data).lines();
		var outputFile = fs.createWriteStream('results.csv', {flags: 'a'});
			outputFile.on('error', function(err) { /* error handling */ });
			lines.forEach(function(v) {
				outputFile.write(v + '' + '\n');
			});
			outputFile.end();
		// fs.appendFile('results.csv', lines, function(err){
		// 	if(err) {
  //       		return console.log(err);
  //   		}
  //   		lines.forEach(function(v) {
  //   			v = v + '\r\n';
  //   		});
  //   		console.log('appended!');
		// });
	});
};


fs.readdir(__dirname + '/files', function(err, files) {
	if (err) return;
	fileCount = files.length;
	files.forEach(function(f) {
		var fullPath =  'files' + '/' + f;
		console.log('Files: ' +fullPath);
		getLines(fullPath);
	});
});