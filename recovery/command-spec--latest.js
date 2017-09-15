(function() {
  var Command, context;

  Command = require('../lib/command');

  context = describe;

  describe('Command', function() {
    it('has a type', function() {
      return expect(new Command({
        type: 'all'
      }).type).toEqual('all');
    });
    it('does not accept unknown types', function() {
      return expect(function() {
        return new Command({
          type: 'bananas'
        });
      }).toThrow(new Error('Unrecognized command type'));
    });
    describe('.toString', function() {
      beforeEach(function() {
        var editor;
        editor = {
          getPath: function() {
            return '/this/is/a/full/path.coffee';
          },
          getCursorBufferPosition: function() {
            return {
              row: 9
            };
          }
        };
        spyOn(atom.project, 'relativize').andReturn('path.coffee');
        return spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
      });
      it('renders type all', function() {
        return expect(new Command({
          type: 'all'
        }).toString()).toEqual('npm test');
      });
      it('renders type file', function() {
        return expect(new Command({
          type: 'file'
        }).toString()).toEqual('atom --test path.coffee');
      });
      it('renders type line', function() {
        return expect(new Command({
          type: 'line'
        }).toString()).toEqual('rspec path.coffee:10');
      });
      context('when editor has a different path and buffer position', function() {
        beforeEach(function() {
          var editor;
          editor = {
            getPath: function() {
              return '/this/is/a/full/path.rb';
            },
            getCursorBufferPosition: function() {
              return {
                row: 16
              };
            }
          };
          atom.project.relativize.andReturn('path.rb');
          return atom.workspace.getActiveTextEditor.andReturn(editor);
        });
        it('renders type file', function() {
          return expect(new Command({
            type: 'file'
          }).toString()).toEqual('atom --test path.rb');
        });
        return it('renders type line', function() {
          return expect(new Command({
            type: 'line'
          }).toString()).toEqual('rspec path.rb:17');
        });
      });
      return context('when editor is not present', function() {
        return it('renders an empty string', function() {
          atom.workspace.getActiveTextEditor.andReturn(null);
          return expect(new Command({
            type: 'all'
          }).toString()).toEqual('');
        });
      });
    });
    return describe('.empty', function() {
      beforeEach(function() {
        var editor;
        editor = {
          getPath: function() {
            return '/this/is/a/full/path.coffee';
          },
          getCursorBufferPosition: function() {
            return {
              row: 9
            };
          }
        };
        spyOn(atom.project, 'relativize').andReturn('path.coffee');
        return spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
      });
      it('is false when editor is present', function() {
        return expect(new Command({
          type: 'all'
        }).empty()).toEqual(false);
      });
      return it('is true when editor is not present', function() {
        atom.workspace.getActiveTextEditor.andReturn(null);
        return expect(new Command({
          type: 'all'
        }).empty()).toEqual(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3JjYXJ2YWxoby9wcm9qZWN0cy9yb2FkLXJ1bm5lci9zcGVjL2NvbW1hbmQtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsZ0JBQVI7O0VBRVYsT0FBQSxHQUFVOztFQUVWLFFBQUEsQ0FBUyxTQUFULEVBQW9CLFNBQUE7SUFDbEIsRUFBQSxDQUFHLFlBQUgsRUFBaUIsU0FBQTthQUNmLE1BQUEsQ0FBTyxJQUFJLE9BQUEsQ0FBUTtRQUFBLElBQUEsRUFBTSxLQUFOO09BQVIsQ0FBb0IsQ0FBQyxJQUFoQyxDQUFxQyxDQUFDLE9BQXRDLENBQThDLEtBQTlDO0lBRGUsQ0FBakI7SUFHQSxFQUFBLENBQUcsK0JBQUgsRUFBb0MsU0FBQTthQUNsQyxNQUFBLENBQU8sU0FBQTtlQUFPLElBQUEsT0FBQSxDQUFRO1VBQUEsSUFBQSxFQUFNLFNBQU47U0FBUjtNQUFQLENBQVAsQ0FBdUMsQ0FBQyxPQUF4QyxDQUFvRCxJQUFBLEtBQUEsQ0FBTSwyQkFBTixDQUFwRDtJQURrQyxDQUFwQztJQUdBLFFBQUEsQ0FBUyxXQUFULEVBQXNCLFNBQUE7TUFDcEIsVUFBQSxDQUFXLFNBQUE7QUFDVCxZQUFBO1FBQUEsTUFBQSxHQUNFO1VBQUEsT0FBQSxFQUFTLFNBQUE7bUJBQUc7VUFBSCxDQUFUO1VBQ0EsdUJBQUEsRUFBeUIsU0FBQTttQkFBRztjQUFBLEdBQUEsRUFBSyxDQUFMOztVQUFILENBRHpCOztRQUdGLEtBQUEsQ0FBTSxJQUFJLENBQUMsT0FBWCxFQUFvQixZQUFwQixDQUFpQyxDQUFDLFNBQWxDLENBQTRDLGFBQTVDO2VBQ0EsS0FBQSxDQUFNLElBQUksQ0FBQyxTQUFYLEVBQXNCLHFCQUF0QixDQUE0QyxDQUFDLFNBQTdDLENBQXVELE1BQXZEO01BTlMsQ0FBWDtNQVFBLEVBQUEsQ0FBRyxrQkFBSCxFQUF1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QWlELEtBQWpEO01BRG9DLENBQXRDO2FBR0EsRUFBQSxDQUFHLG9DQUFILEVBQXlDLFNBQUE7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFuQyxDQUE2QyxJQUE3QztlQUNBLE1BQUEsQ0FBVyxJQUFBLE9BQUEsQ0FBUTtVQUFBLElBQUEsRUFBTSxLQUFOO1NBQVIsQ0FBb0IsQ0FBQyxLQUFyQixDQUFBLENBQVgsQ0FBd0MsQ0FBQyxPQUF6QyxDQUFpRCxJQUFqRDtNQUZ1QyxDQUF6QztJQVppQixDQUFuQjtFQTdDa0IsQ0FBcEI7QUFKQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbW1hbmQgPSByZXF1aXJlICcuLi9saWIvY29tbWFuZCdcblxuY29udGV4dCA9IGRlc2NyaWJlXG5cbmRlc2NyaWJlICdDb21tYW5kJywgLT5cbiAgaXQgJ2hhcyBhIHR5cGUnLCAtPlxuICAgIGV4cGVjdChuZXcgQ29tbWFuZCh0eXBlOiAnYWxsJykudHlwZSkudG9FcXVhbCAnYWxsJ1xuXG4gIGl0ICdkb2VzIG5vdCBhY2NlcHQgdW5rbm93biB0eXBlcycsIC0+XG4gICAgZXhwZWN0KC0+IG5ldyBDb21tYW5kKHR5cGU6ICdiYW5hbmFzJykpLnRvVGhyb3cgbmV3IEVycm9yKCdVbnJlY29nbml6ZWQgY29tbWFuZCB0eXBlJylcblxuICBkZXNjcmliZSAnLnRvU3RyaW5nJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBlZGl0b3IgPVxuICAgICAgICBnZXRQYXRoOiAtPiAnL3RoaXMvaXMvYS9mdWxsL3BhdGguY29mZmVlJ1xuICAgICAgICBnZXRDdXJzb3JCdWZmZXJQb3NpdGlvbjogLT4gcm93OiA5XG5cbiAgICAgIHNweU9uKGF0b20ucHJvamVjdCwgJ3JlbGF0aXZpemUnKS5hbmRSZXR1cm4gJ3BhdGguY29mZmVlJ1xuICAgICAgc3B5T24oYXRvbS53b3Jrc3BhY2UsICdnZXRBY3RpdmVUZXh0RWRpdG9yJykuYW5kUmV0dXJuIGVkaXRvclxuXG4gICAgaXQgJ3JlbmRlcnMgdHlwZSBhbGwnLCAtPlxuICAgICAgZXhwZWN0KG5ldyBDb21tYW5kKHR5cGU6ICdhbGwnKS50b1N0cmluZygpKS50b0VxdWFsICducG0gdGVzdCdcblxuICAgIGl0ICdyZW5kZXJzIHR5cGUgZmlsZScsIC0+XG4gICAgICBleHBlY3QobmV3IENvbW1hbmQodHlwZTogJ2ZpbGUnKS50b1N0cmluZygpKS50b0VxdWFsICdhdG9tIC0tdGVzdCBwYXRoLmNvZmZlZSdcblxuICAgIGl0ICdyZW5kZXJzIHR5cGUgbGluZScsIC0+XG4gICAgICBleHBlY3QobmV3IENvbW1hbmQodHlwZTogJ2xpbmUnKS50b1N0cmluZygpKS50b0VxdWFsICdyc3BlYyBwYXRoLmNvZmZlZToxMCdcblxuICAgIGNvbnRleHQgJ3doZW4gZWRpdG9yIGhhcyBhIGRpZmZlcmVudCBwYXRoIGFuZCBidWZmZXIgcG9zaXRpb24nLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBlZGl0b3IgPVxuICAgICAgICAgIGdldFBhdGg6IC0+ICcvdGhpcy9pcy9hL2Z1bGwvcGF0aC5yYidcbiAgICAgICAgICBnZXRDdXJzb3JCdWZmZXJQb3NpdGlvbjogLT4gcm93OiAxNlxuXG4gICAgICAgIGF0b20ucHJvamVjdC5yZWxhdGl2aXplLmFuZFJldHVybiAncGF0aC5yYidcbiAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvci5hbmRSZXR1cm4gZWRpdG9yXG5cbiAgICAgIGl0ICdyZW5kZXJzIHR5cGUgZmlsZScsIC0+XG4gICAgICAgIGV4cGVjdChuZXcgQ29tbWFuZCh0eXBlOiAnZmlsZScpLnRvU3RyaW5nKCkpLnRvRXF1YWwgJ2F0b20gLS10ZXN0IHBhdGgucmInXG5cbiAgICAgIGl0ICdyZW5kZXJzIHR5cGUgbGluZScsIC0+XG4gICAgICAgIGV4cGVjdChuZXcgQ29tbWFuZCh0eXBlOiAnbGluZScpLnRvU3RyaW5nKCkpLnRvRXF1YWwgJ3JzcGVjIHBhdGgucmI6MTcnXG5cbiAgICBjb250ZXh0ICd3aGVuIGVkaXRvciBpcyBub3QgcHJlc2VudCcsIC0+XG4gICAgICBpdCAncmVuZGVycyBhbiBlbXB0eSBzdHJpbmcnLCAtPlxuICAgICAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yLmFuZFJldHVybiBudWxsXG4gICAgICAgIGV4cGVjdChuZXcgQ29tbWFuZCh0eXBlOiAnYWxsJykudG9TdHJpbmcoKSkudG9FcXVhbCAnJ1xuXG4gIGRlc2NyaWJlICcuZW1wdHknLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGVkaXRvciA9XG4gICAgICAgIGdldFBhdGg6IC0+ICcvdGhpcy9pcy9hL2Z1bGwvcGF0aC5jb2ZmZWUnXG4gICAgICAgIGdldEN1cnNvckJ1ZmZlclBvc2l0aW9uOiAtPiByb3c6IDlcblxuICAgICAgc3B5T24oYXRvbS5wcm9qZWN0LCAncmVsYXRpdml6ZScpLmFuZFJldHVybiAncGF0aC5jb2ZmZWUnXG4gICAgICBzcHlPbihhdG9tLndvcmtzcGFjZSwgJ2dldEFjdGl2ZVRleHRFZGl0b3InKS5hbmRSZXR1cm4gZWRpdG9yXG5cbiAgICBpdCAnaXMgZmFsc2Ugd2hlbiBlZGl0b3IgaXMgcHJlc2VudCcsIC0+XG4gICAgICBleHBlY3QobmV3IENvbW1hbmQodHlwZTogJ2FsbCcpLmVtcHR5KCkpLnRvRXF1YWwgZmFsc2VcblxuICAgIGl0ICdpcyB0cnVlIHdoZW4gZWRpdG9yIGlzIG5vdCBwcmVzZW50JywgLT5cbiAgICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IuYW5kUmV0dXJuIG51bGxcbiAgICAgIGV4cGVjdChuZXcgQ29tbWFuZCh0eXBlOiAnYWxsJykuZW1wdHkoKSkudG9FcXVhbCB0cnVlXG4iXX0=
