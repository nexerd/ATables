var path = require("path");
var nconf = require('nconf');

process.env.DEBUG = 'ATables:*';
var debug = require('../Debug/debug')('ATables:nconf')

nconf.argv()
	.env()
	.file({ file: path.join(__dirname, '/config.json')});

nconf.set("address:port", nconf.get('NODE_PORT') || '3000');
nconf.set("address:host", nconf.get('NODE_IP') || '127.0.0.1');
nconf.set("database:url", nconf.get('OPENSHIFT_MONGODB_DB_URL') || 'mongodb://localhost:27017/')
nconf.set("database:name", nconf.get('NODE_ENV') == 'production' ? 'test' : 'ATableTest0')
nconf.set("database:options", nconf.get('NODE_ENV') == 'production' ?
								 {  user: 'admin',  pass: 'ygNX3widJ6VU' } : { } );

debug('Address:', nconf.get('address'));
debug('Database:', nconf.get('database'));
debug('ENV.DEBUG:', nconf.get('DEBUG'));

module.exports = nconf;

