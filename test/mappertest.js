var mapperModule = require('../modules/taskLabelMapperModule')
var ES = require('../utils/esquery');

describe('Label', function() {
  describe('#addLabelsToTask()', function() {
    it('should add labels mapper to task without error', function(done) {
      mapperModule.addLabelsToTask('user1', 1, [1,2,3]).then(function(res) {
        done();
      }, function(e){
      		done(e)
      });
    });
  });

  describe('#deleteLabelsFromTask()', function() {
    it('should remove labels mapper to task without error', function(done) {
      mapperModule.deleteLabelsFromTask('user1',1, [1,2,3]).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });

  describe('#deleteLabel()', function() {
    it('should remove all mapper with lid', function(done) {
      mapperModule.deleteLabel('user1',1).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });

  describe('#deleteTask()', function() {
    it('should remove all mapper with tid', function(done) {
      mapperModule.deleteTask('user1',1).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });

  describe('#findLabelsByTaskId()', function() {
    it('should find labels with given tid', function(done) {
      mapperModule.findLabelsByTaskId('user1',1).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });

  describe('#findTasksByLabelId()', function() {
    it('should find tasks with given lid', function(done) {
      mapperModule.findTasksByLabelId('user1',1).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });
});