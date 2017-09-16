var labelModule = require('../modules/labelModule')
var ES = require('../utils/esquery');

describe('Label', function() {
  describe('#findLastLabelIndex()', function() {
    it('should find the max label id without error', function(done) {
      labelModule.findLastLabelIndex('user1').then(function(res) {
        var obj = ES.parseAggsResponse(res);
        if(obj.value === 4){
          done();
        } else {
          done('label number incorrect');
        }        
      }, function(e){
      		done(e)
      });
    });
  });

  describe('#addLabel()', function() {
    it('should add label without error and return ne labelId', function(done) {
      var newLabel = {
        'uid': 'user1',
        'content': 'test'
      }
      labelModule.addLabel('user1', newLabel).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  })

  describe('#deleteLabel()', function() {
    it('should delete label without error', function(done) {
      labelModule.deleteLabel('user1', 1).then(function() {
        done();       
      }, function(e){
          done(e)
      });
    });
  });

  describe('#updateLabel("test")', function() {
    it('should update task without error', function(done) {
      var label = {
        'uid': 'user1',
        'lid': 2,
        'content': 'test'
      }
      labelModule.updateLabel('user1', 2, label).then(function() {
        done();
      }, function(e){
          done(e);
      });
    });
  });

  describe('#findLabelById("user1", [1,2,3])', function() {
    it('should find label without error', function(done) {
      labelModule.findLabelById('user1', [1,2,3]).then(function(labels) {
        if(labels.length){
          done();
        } else {
          done('labels not found');
        }
      }, function(e){
          done(e);
      });
    });
  });

  describe('#findAllLabels("user1")', function() {
    it('should find labels without error', function(done) {
      labelModule.findAllLabels('user1').then(function(labels) {
        if(labels.length){
          done();
        } else {
          done('labels not found');
        }
        
      }, function(e){
          done(e);
      });
    });
  });

  describe('#findLabelsByKeyword("user1", "test")', function() {
    it('should find labels without error', function(done) {
      labelModule.findLabelsByKeyword('user1', 'test').then(function(labels) {
        if(labels.length){
          done();
        } else {
          done('labels not found');
        }
        
      }, function(e){
          done(e);
      });
    });
  });
});