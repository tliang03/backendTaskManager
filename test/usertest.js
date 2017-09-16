var userModule = require('../modules/userModule');

describe('User', function() {
  describe('#addUser()', function() {
    it('should add user without error', function(done) {
      var newUser = {
      	'uid': '4',
      	'firstName': 'test',
      	'lastName': 'testLastname',
      	'email':'test@test.com',
      	'password': '123'
      }
      userModule.addUser(newUser).then(function() {
        done();
      }, function(e){
      		done(e)
      });
    });
  });

  describe('#addUser(existing user)', function() {
    it('should throw error say user already exist', function(done) {
      var newUser = {
        'uid': '11',
        'firstName': 'test',
        'lastName': 'testLastname',
        'email':'test@test.com',
        'password': '123'
      }
      userModule.addUser(newUser).then(function() {
        done('User added');
      }, function(e){
          if(e==='User already exists'){
            done()
          } else {
            done(e);
          }          
      });
    });
  });

  describe('#findUserById("1")', function() {
    it('should find user', function(done) {
      userModule.findUserById("1").then(function(user) {
        if(user.length){
          done();
        } else {
          done(true);
        }		    
      }, function(e){
  		  done(e)
      });
    });
  });

  describe('#findUserById("u100")', function() {
    it('should find user', function(done) {
      userModule.findUserById("u100").then(function(user) {
        if(user.length){
          done('User found');
        } else {
          done();
        }       
      }, function(e){
        done(e)
      });
    });
  });

  describe('#updateUserById()', function() {
    it('should update existing user', function(done) {
	  var user = {
      	'uid': '3',
      	'password': '1234'
      }
      userModule.updateUserById('3', user).then(function() {
		    done();
      }, function(e){
  		  done(e)
      });
    });
  });

  describe('#updateUserById("test")', function() {
    it('should save without error', function(done) {
    var user = {
        'uid': 'test',
        'password': '1234'
      }
      userModule.updateUserById('test', user).then(function() {
        done('User updated');
      }, function(e){
        if(e === 'User not exist in DB') {
          done()
        } else {
          done(e);
        }        
      });
    });
  });
});