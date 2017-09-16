var taskModule = require('../modules/taskModule')
var ES = require('../utils/esquery');

describe('Task', function() {
  describe('#findLastTaskIndex()', function() {
    it('should find the max task id without error', function(done) {
      taskModule.findLastTaskIndex('user1').then(function(res) {
        var obj = ES.parseAggsResponse(res);
        console.log(obj.value)
        if(obj.value === 0){
          done();
        } else {
          done('task number incorrect');
        }        
      }, function(e){
      		done(e)
      });
    });
  });

  describe('#addTask()', function() {
    it('should add task without error and return ne taskId', function(done) {
      var newTask = {
        'uid': 'user1',
        'content': 'test',
        'description': 'testLastname'
      }
      taskModule.addTask('user1', newTask).then(function(taskId) {
        console.log(taskId)
        if(taskId === 1){
          done();
        } else {
          done('task number incorrect');
        }        
      }, function(e){
          done(e)
      });
    });
  })

  describe('#deleteTask()', function() {
    it('should delete task without error', function(done) {
      taskModule.deleteTask('user1', 1).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });

  describe('#updateTask("test")', function() {
    it('should update task without error', function(done) {
      var task = {
        'uid': 'user1',
        'tid': 2,
        'content': 'test'
      }
      taskModule.updateTask('user1', 2, task).then(function() {
        done();
      }, function(e){
          done(e);
      });
    });
  });

  describe('#findTaskById("user1", [1,2,3])', function() {
    it('should find task error', function(done) {
      taskModule.findTaskById('user1', [1,2,3]).then(function(tasks) {
        done();
      }, function(e){
          done(e);
      });
    });
  });

  describe('#findAllTasks("user1")', function() {
    it('should find task error', function(done) {
      taskModule.findAllTasks('user1').then(function(tasks) {
        if(tasks.length){
          done();
        } else {
          done('tasks not found');
        }
        
      }, function(e){
          done(e);
      });
    });
  });

  describe('#findTaskByKeyword("user1", "test")', function() {
    it('should find task error', function(done) {
      taskModule.findTaskByKeyword('user1', 'test').then(function(tasks) {
        if(tasks.length){
          done();
        } else {
          done('tasks not found');
        }
        
      }, function(e){
          done(e);
      });
    });
  });
});