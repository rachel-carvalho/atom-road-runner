(function() {
  var Command, RoadRunner, Runner, context;

  Runner = require('../lib/runner');

  Command = require('../lib/command');

  RoadRunner = require('../lib/road-runner');

  context = describe;

  describe('RoadRunner', function() {
    var activationPromise, ref, workspaceElement;
    ref = [], workspaceElement = ref[0], activationPromise = ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      activationPromise = atom.packages.activatePackage('road-runner');
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn({});
      spyOn(Runner.prototype, 'run');
      return spyOn(Command.prototype, 'render');
    });
    describe('road-runner:run-line', function() {
      beforeEach(function() {
        return Command.prototype.render.andReturn('rspec path.rb:10');
      });
      it('runs command in terminal', function() {
        atom.commands.dispatch(workspaceElement, 'road-runner:run-line');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var command;
          expect(Runner.prototype.run).toHaveBeenCalled();
          command = Runner.prototype.run.calls[0].args[0];
          expect(command.type).toEqual('line');
          return expect(command.rendered).toEqual('rspec path.rb:10');
        });
      });
      return context('when editor is not present', function() {
        beforeEach(function() {
          return atom.workspace.getActiveTextEditor.andReturn(null);
        });
        return it('does nothing', function() {
          atom.commands.dispatch(workspaceElement, 'road-runner:run-line');
          waitsForPromise(function() {
            return activationPromise;
          });
          return runs(function() {
            return expect(Runner.prototype.run).not.toHaveBeenCalled();
          });
        });
      });
    });
    describe('road-runner:run-file', function() {
      beforeEach(function() {
        return Command.prototype.render.andReturn('atom --test path.coffee');
      });
      it('runs command in terminal', function() {
        atom.commands.dispatch(workspaceElement, 'road-runner:run-file');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var command;
          expect(Runner.prototype.run).toHaveBeenCalled();
          command = Runner.prototype.run.calls[0].args[0];
          expect(command.type).toEqual('file');
          return expect(command.rendered).toEqual('atom --test path.coffee');
        });
      });
      return context('when editor is not present', function() {
        beforeEach(function() {
          return atom.workspace.getActiveTextEditor.andReturn(null);
        });
        return it('does nothing', function() {
          atom.commands.dispatch(workspaceElement, 'road-runner:run-file');
          waitsForPromise(function() {
            return activationPromise;
          });
          return runs(function() {
            return expect(Runner.prototype.run).not.toHaveBeenCalled();
          });
        });
      });
    });
    describe('road-runner:run-all', function() {
      beforeEach(function() {
        return Command.prototype.render.andReturn('npm test');
      });
      it('runs command in terminal', function() {
        atom.commands.dispatch(workspaceElement, 'road-runner:run-all');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var command;
          expect(Runner.prototype.run).toHaveBeenCalled();
          command = Runner.prototype.run.calls[0].args[0];
          expect(command.type).toEqual('all');
          return expect(command.rendered).toEqual('npm test');
        });
      });
      return context('when editor is not present', function() {
        beforeEach(function() {
          return atom.workspace.getActiveTextEditor.andReturn(null);
        });
        return it('does nothing', function() {
          atom.commands.dispatch(workspaceElement, 'road-runner:run-file');
          waitsForPromise(function() {
            return activationPromise;
          });
          return runs(function() {
            return expect(Runner.prototype.run).not.toHaveBeenCalled();
          });
        });
      });
    });
    return describe('road-runner:repeat-last', function() {
      beforeEach(function() {
        return Command.prototype.render.andReturn('npm test');
      });
      it('runs command in terminal', function() {
        atom.commands.dispatch(workspaceElement, 'road-runner:run-all');
        atom.commands.dispatch(workspaceElement, 'road-runner:repeat-last');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var command;
          expect(Runner.prototype.run).toHaveBeenCalled();
          expect(Runner.prototype.run.calls.length).toEqual(2);
          command = Runner.prototype.run.calls[0].args[0];
          expect(command.type).toEqual('all');
          expect(command.rendered).toEqual('npm test');
          return expect(Runner.prototype.run.calls[1].args[0]).toEqual(command);
        });
      });
      return context("when there's no previous command", function() {
        return it('does nothing', function() {
          atom.commands.dispatch(workspaceElement, 'road-runner:repeat-last');
          waitsForPromise(function() {
            return activationPromise;
          });
          return runs(function() {
            return expect(Runner.prototype.run).toHaveBeenCalledWith(void 0);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3JjYXJ2YWxoby9wcm9qZWN0cy9yb2FkLXJ1bm5lci9zcGVjL3JvYWQtcnVubmVyLXNwZWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVI7O0VBQ1QsT0FBQSxHQUFVLE9BQUEsQ0FBUSxnQkFBUjs7RUFDVixVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSOztFQUViLE9BQUEsR0FBVTs7RUFFVixRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBO0FBQ3JCLFFBQUE7SUFBQSxNQUF3QyxFQUF4QyxFQUFDLHlCQUFELEVBQW1CO0lBRW5CLFVBQUEsQ0FBVyxTQUFBO01BQ1QsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QjtNQUNuQixpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsYUFBOUI7TUFDcEIsS0FBQSxDQUFNLElBQUksQ0FBQyxTQUFYLEVBQXNCLHFCQUF0QixDQUE0QyxDQUFDLFNBQTdDLENBQXVELEVBQXZEO01BQ0EsS0FBQSxDQUFNLE1BQU0sQ0FBQyxTQUFiLEVBQXdCLEtBQXhCO2FBQ0EsS0FBQSxDQUFNLE9BQU8sQ0FBQyxTQUFkLEVBQXlCLFFBQXpCO0lBTFMsQ0FBWDtJQU9BLFFBQUEsQ0FBUyxzQkFBVCxFQUFpQyxTQUFBO01BQy9CLFVBQUEsQ0FBVyxTQUFBO2VBQ1QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBekIsQ0FBbUMsa0JBQW5DO01BRFMsQ0FBWDtNQUdBLEVBQUEsQ0FBRywwQkFBSCxFQUErQixTQUFBO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsc0JBQXpDO1FBQ0EsZUFBQSxDQUFnQixTQUFBO2lCQUFHO1FBQUgsQ0FBaEI7ZUFD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QjtpQkFDQSxJQUFBLENBQUssU0FBQTttQkFDSCxNQUFBLENBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUF4QixDQUE0QixDQUFDLG9CQUE3QixDQUFrRCxNQUFsRDtVQURHLENBQUw7UUFIaUIsQ0FBbkI7TUFEMEMsQ0FBNUM7SUFoQmtDLENBQXBDO0VBNUVxQixDQUF2QjtBQU5BIiwic291cmNlc0NvbnRlbnQiOlsiUnVubmVyID0gcmVxdWlyZSAnLi4vbGliL3J1bm5lcidcbkNvbW1hbmQgPSByZXF1aXJlICcuLi9saWIvY29tbWFuZCdcblJvYWRSdW5uZXIgPSByZXF1aXJlICcuLi9saWIvcm9hZC1ydW5uZXInXG5cbmNvbnRleHQgPSBkZXNjcmliZVxuXG5kZXNjcmliZSAnUm9hZFJ1bm5lcicsIC0+XG4gIFt3b3Jrc3BhY2VFbGVtZW50LCBhY3RpdmF0aW9uUHJvbWlzZV0gPSBbXVxuXG4gIGJlZm9yZUVhY2ggLT5cbiAgICB3b3Jrc3BhY2VFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKVxuICAgIGFjdGl2YXRpb25Qcm9taXNlID0gYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ3JvYWQtcnVubmVyJylcbiAgICBzcHlPbihhdG9tLndvcmtzcGFjZSwgJ2dldEFjdGl2ZVRleHRFZGl0b3InKS5hbmRSZXR1cm4ge31cbiAgICBzcHlPbihSdW5uZXIucHJvdG90eXBlLCAncnVuJylcbiAgICBzcHlPbihDb21tYW5kLnByb3RvdHlwZSwgJ3JlbmRlcicpXG5cbiAgZGVzY3JpYmUgJ3JvYWQtcnVubmVyOnJ1bi1saW5lJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBDb21tYW5kLnByb3RvdHlwZS5yZW5kZXIuYW5kUmV0dXJuICdyc3BlYyBwYXRoLnJiOjEwJ1xuXG4gICAgaXQgJ3J1bnMgY29tbWFuZCBpbiB0ZXJtaW5hbCcsIC0+XG4gICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoIHdvcmtzcGFjZUVsZW1lbnQsICdyb2FkLXJ1bm5lcjpydW4tbGluZSdcbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBhY3RpdmF0aW9uUHJvbWlzZVxuICAgICAgcnVucyAtPlxuICAgICAgICBleHBlY3QoUnVubmVyLnByb3RvdHlwZS5ydW4pLnRvSGF2ZUJlZW5DYWxsZWQoKVxuICAgICAgICBjb21tYW5kID0gUnVubmVyLnByb3RvdHlwZS5ydW4uY2FsbHNbMF0uYXJnc1swXVxuICAgICAgICBleHBlY3QoY29tbWFuZC50eXBlKS50b0VxdWFsICdsaW5lJ1xuICAgICAgICBleHBlY3QoY29tbWFuZC5yZW5kZXJlZCkudG9FcXVhbCAncnNwZWMgcGF0aC5yYjoxMCdcblxuICAgIGNvbnRleHQgJ3doZW4gZWRpdG9yIGlzIG5vdCBwcmVzZW50JywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT4gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvci5hbmRSZXR1cm4gbnVsbFxuXG4gICAgICBpdCAnZG9lcyBub3RoaW5nJywgLT5cbiAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAncm9hZC1ydW5uZXI6cnVuLWxpbmUnXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBhY3RpdmF0aW9uUHJvbWlzZVxuICAgICAgICBydW5zIC0+XG4gICAgICAgICAgZXhwZWN0KFJ1bm5lci5wcm90b3R5cGUucnVuKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpXG5cbiAgZGVzY3JpYmUgJ3JvYWQtcnVubmVyOnJ1bi1maWxlJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBDb21tYW5kLnByb3RvdHlwZS5yZW5kZXIuYW5kUmV0dXJuICdhdG9tIC0tdGVzdCBwYXRoLmNvZmZlZSdcblxuICAgIGl0ICdydW5zIGNvbW1hbmQgaW4gdGVybWluYWwnLCAtPlxuICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCB3b3Jrc3BhY2VFbGVtZW50LCAncm9hZC1ydW5uZXI6cnVuLWZpbGUnXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT4gYWN0aXZhdGlvblByb21pc2VcbiAgICAgIHJ1bnMgLT5cbiAgICAgICAgZXhwZWN0KFJ1bm5lci5wcm90b3R5cGUucnVuKS50b0hhdmVCZWVuQ2FsbGVkKClcbiAgICAgICAgY29tbWFuZCA9IFJ1bm5lci5wcm90b3R5cGUucnVuLmNhbGxzWzBdLmFyZ3NbMF1cbiAgICAgICAgZXhwZWN0KGNvbW1hbmQudHlwZSkudG9FcXVhbCAnZmlsZSdcbiAgICAgICAgZXhwZWN0KGNvbW1hbmQucmVuZGVyZWQpLnRvRXF1YWwgJ2F0b20gLS10ZXN0IHBhdGguY29mZmVlJ1xuXG4gICAgY29udGV4dCAnd2hlbiBlZGl0b3IgaXMgbm90IHByZXNlbnQnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPiBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yLmFuZFJldHVybiBudWxsXG5cbiAgICAgIGl0ICdkb2VzIG5vdGhpbmcnLCAtPlxuICAgICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoIHdvcmtzcGFjZUVsZW1lbnQsICdyb2FkLXJ1bm5lcjpydW4tZmlsZSdcbiAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IGFjdGl2YXRpb25Qcm9taXNlXG4gICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICBleHBlY3QoUnVubmVyLnByb3RvdHlwZS5ydW4pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKClcblxuICBkZXNjcmliZSAncm9hZC1ydW5uZXI6cnVuLWFsbCcsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgQ29tbWFuZC5wcm90b3R5cGUucmVuZGVyLmFuZFJldHVybiAnbnBtIHRlc3QnXG5cbiAgICBpdCAncnVucyBjb21tYW5kIGluIHRlcm1pbmFsJywgLT5cbiAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggd29ya3NwYWNlRWxlbWVudCwgJ3JvYWQtcnVubmVyOnJ1bi1hbGwnXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT4gYWN0aXZhdGlvblByb21pc2VcbiAgICAgIHJ1bnMgLT5cbiAgICAgICAgZXhwZWN0KFJ1bm5lci5wcm90b3R5cGUucnVuKS50b0hhdmVCZWVuQ2FsbGVkKClcbiAgICAgICAgY29tbWFuZCA9IFJ1bm5lci5wcm90b3R5cGUucnVuLmNhbGxzWzBdLmFyZ3NbMF1cbiAgICAgICAgZXhwZWN0KGNvbW1hbmQudHlwZSkudG9FcXVhbCAnYWxsJ1xuICAgICAgICBleHBlY3QoY29tbWFuZC5yZW5kZXJlZCkudG9FcXVhbCAnbnBtIHRlc3QnXG5cbiAgICBjb250ZXh0ICd3aGVuIGVkaXRvciBpcyBub3QgcHJlc2VudCcsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IuYW5kUmV0dXJuIG51bGxcblxuICAgICAgaXQgJ2RvZXMgbm90aGluZycsIC0+XG4gICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggd29ya3NwYWNlRWxlbWVudCwgJ3JvYWQtcnVubmVyOnJ1bi1maWxlJ1xuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gYWN0aXZhdGlvblByb21pc2VcbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIGV4cGVjdChSdW5uZXIucHJvdG90eXBlLnJ1bikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gIGRlc2NyaWJlICdyb2FkLXJ1bm5lcjpyZXBlYXQtbGFzdCcsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgQ29tbWFuZC5wcm90b3R5cGUucmVuZGVyLmFuZFJldHVybiAnbnBtIHRlc3QnXG5cbiAgICBpdCAncnVucyBjb21tYW5kIGluIHRlcm1pbmFsJywgLT5cbiAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggd29ya3NwYWNlRWxlbWVudCwgJ3JvYWQtcnVubmVyOnJ1bi1hbGwnXG4gICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoIHdvcmtzcGFjZUVsZW1lbnQsICdyb2FkLXJ1bm5lcjpyZXBlYXQtbGFzdCdcbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBhY3RpdmF0aW9uUHJvbWlzZVxuICAgICAgcnVucyAtPlxuICAgICAgICBleHBlY3QoUnVubmVyLnByb3RvdHlwZS5ydW4pLnRvSGF2ZUJlZW5DYWxsZWQoKVxuICAgICAgICBleHBlY3QoUnVubmVyLnByb3RvdHlwZS5ydW4uY2FsbHMubGVuZ3RoKS50b0VxdWFsIDJcbiAgICAgICAgY29tbWFuZCA9IFJ1bm5lci5wcm90b3R5cGUucnVuLmNhbGxzWzBdLmFyZ3NbMF1cbiAgICAgICAgZXhwZWN0KGNvbW1hbmQudHlwZSkudG9FcXVhbCAnYWxsJ1xuICAgICAgICBleHBlY3QoY29tbWFuZC5yZW5kZXJlZCkudG9FcXVhbCAnbnBtIHRlc3QnXG4gICAgICAgIGV4cGVjdChSdW5uZXIucHJvdG90eXBlLnJ1bi5jYWxsc1sxXS5hcmdzWzBdKS50b0VxdWFsIGNvbW1hbmRcblxuICAgIGNvbnRleHQgXCJ3aGVuIHRoZXJlJ3Mgbm8gcHJldmlvdXMgY29tbWFuZFwiLCAtPlxuICAgICAgaXQgJ2RvZXMgbm90aGluZycsIC0+XG4gICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2ggd29ya3NwYWNlRWxlbWVudCwgJ3JvYWQtcnVubmVyOnJlcGVhdC1sYXN0J1xuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gYWN0aXZhdGlvblByb21pc2VcbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIGV4cGVjdChSdW5uZXIucHJvdG90eXBlLnJ1bikudG9IYXZlQmVlbkNhbGxlZFdpdGgodW5kZWZpbmVkKVxuIl19
