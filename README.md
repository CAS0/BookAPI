# BookAPI
Requires a running mongoDB server
To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf

To run use the command:
gulp

To run unit / integration tests, use the command:
gulp test