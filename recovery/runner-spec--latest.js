(function() {
  var Runner, child_process, context;

  child_process = require('child_process');

  Runner = require('../lib/runner');

  context = describe;

  describe('Runner', function() {
    return describe('.run', function() {
      beforeEach(function() {
        atom.packages.resolvePackagePath.andReturn('/road-runner/');
        return spyOn(child_process, 'execSync');
      });
      it('runs command in terminal', function() {
        new Runner().run('echo bla');
        return expect(child_process.execSync).toHaveBeenCalledWith('/road-runner/bin/os_x_terminal "echo bla"');
      });
      return context('when command is blank', function() {
        return it('does nothing', function() {
          new Runner().run('');
          return expect(child_process.execSync).not.toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3JjYXJ2YWxoby9wcm9qZWN0cy9yb2FkLXJ1bm5lci9zcGVjL3J1bm5lci1zcGVjLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsYUFBQSxHQUFnQixPQUFBLENBQVEsZUFBUjs7RUFDaEIsTUFBQSxHQUFTLE9BQUEsQ0FBUSxlQUFSOztFQUVULE9BQUEsR0FBVTs7RUFFVixRQUFBLENBQVMsUUFBVCxFQUFtQixTQUFBO1dBQ2pCLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFNBQUE7TUFDZixVQUFBLENBQVcsU0FBQTtRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsU0FBakMsQ0FBMkMsZUFBM0M7ZUFDQSxLQUFBLENBQU0sYUFBTixFQUFxQixVQUFyQjtNQUZTLENBQVg7TUFJQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQTtRQUN6QixJQUFBLE1BQUEsQ0FBQSxDQUFRLENBQUMsR0FBVCxDQUFhLFVBQWI7ZUFDSixNQUFBLENBQU8sYUFBYSxDQUFDLFFBQXJCLENBQThCLENBQUMsb0JBQS9CLENBQW9ELDJDQUFwRDtNQUY2QixDQUEvQjthQUlBLE9BQUEsQ0FBUSx1QkFBUixFQUFpQyxTQUFBO2VBQy9CLEVBQUEsQ0FBRyxjQUFILEVBQW1CLFNBQUE7VUFDYixJQUFBLE1BQUEsQ0FBQSxDQUFRLENBQUMsR0FBVCxDQUFhLEVBQWI7aUJBQ0osTUFBQSxDQUFPLGFBQWEsQ0FBQyxRQUFyQixDQUE4QixDQUFDLEdBQUcsQ0FBQyxnQkFBbkMsQ0FBQTtRQUZpQixDQUFuQjtNQUQrQixDQUFqQztJQVRlLENBQWpCO0VBRGlCLENBQW5CO0FBTEEiLCJzb3VyY2VzQ29udGVudCI6WyJjaGlsZF9wcm9jZXNzID0gcmVxdWlyZSAnY2hpbGRfcHJvY2VzcydcblJ1bm5lciA9IHJlcXVpcmUgJy4uL2xpYi9ydW5uZXInXG5cbmNvbnRleHQgPSBkZXNjcmliZVxuXG5kZXNjcmliZSAnUnVubmVyJywgLT5cbiAgZGVzY3JpYmUgJy5ydW4nLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ucGFja2FnZXMucmVzb2x2ZVBhY2thZ2VQYXRoLmFuZFJldHVybiAnL3JvYWQtcnVubmVyLydcbiAgICAgIHNweU9uKGNoaWxkX3Byb2Nlc3MsICdleGVjU3luYycpXG5cbiAgICBpdCAncnVucyBjb21tYW5kIGluIHRlcm1pbmFsJywgLT5cbiAgICAgIG5ldyBSdW5uZXIoKS5ydW4oJ2VjaG8gYmxhJylcbiAgICAgIGV4cGVjdChjaGlsZF9wcm9jZXNzLmV4ZWNTeW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnL3JvYWQtcnVubmVyL2Jpbi9vc194X3Rlcm1pbmFsIFwiZWNobyBibGFcIicpXG5cbiAgICBjb250ZXh0ICd3aGVuIGNvbW1hbmQgaXMgYmxhbmsnLCAtPlxuICAgICAgaXQgJ2RvZXMgbm90aGluZycsIC0+XG4gICAgICAgIG5ldyBSdW5uZXIoKS5ydW4oJycpXG4gICAgICAgIGV4cGVjdChjaGlsZF9wcm9jZXNzLmV4ZWNTeW5jKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpXG4iXX0=
