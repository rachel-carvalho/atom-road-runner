(function() {
  var Command, CompositeDisposable, RoadRunner, Runner, path;

  CompositeDisposable = require('atom').CompositeDisposable;

  path = require('path');

  Runner = require('./runner');

  Command = require('./command');

  module.exports = RoadRunner = {
    subscriptions: null,
    activate: function(state) {
      this.history = [];
      this.runner = new Runner();
      this.subscriptions = new CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'road-runner:run-line': (function(_this) {
          return function() {
            return _this.runLine();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'road-runner:run-file': (function(_this) {
          return function() {
            return _this.runFile();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'road-runner:run-all': (function(_this) {
          return function() {
            return _this.runAll();
          };
        })(this)
      }));
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'road-runner:repeat-last': (function(_this) {
          return function() {
            return _this.repeatLast();
          };
        })(this)
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    serialize: function() {},
    runLine: function() {
      return this.run({
        type: 'line'
      });
    },
    runFile: function() {
      return this.run({
        type: 'file'
      });
    },
    runAll: function() {
      return this.run({
        type: 'all'
      });
    },
    repeatLast: function() {
      return this.run({
        type: 'last'
      });
    },
    editor: function() {
      return atom.workspace.getActiveTextEditor();
    },
    run: function(arg) {
      var type;
      type = arg.type;
      if (!this.editor()) {
        return;
      }
      if (type !== 'last') {
        this.history.unshift(new Command({
          type: type
        }));
      }
      if (this.history.length) {
        return this.runner.run(this.history[0].toString());
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3JjYXJ2YWxoby9wcm9qZWN0cy9yb2FkLXJ1bm5lci9saWIvcm9hZC1ydW5uZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBQ3hCLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0VBQ1QsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSOztFQUVWLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFVBQUEsR0FDZjtJQUFBLGFBQUEsRUFBZSxJQUFmO0lBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRDtNQUVSLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFDWCxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsTUFBQSxDQUFBO01BQ2QsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxtQkFBQSxDQUFBO01BQ3JCLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO1FBQUEsc0JBQUEsRUFBd0IsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTttQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFBO1VBQUg7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhCO09BQXBDLENBQW5CO01BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7UUFBQSxzQkFBQSxFQUF3QixDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUFHLEtBQUMsQ0FBQSxPQUFELENBQUE7VUFBSDtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEI7T0FBcEMsQ0FBbkI7TUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQztRQUFBLHFCQUFBLEVBQXVCLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQTtVQUFIO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QjtPQUFwQyxDQUFuQjthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO1FBQUEseUJBQUEsRUFBMkIsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTttQkFBRyxLQUFDLENBQUEsVUFBRCxDQUFBO1VBQUg7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTNCO09BQXBDLENBQW5CO0lBUlEsQ0FGVjtJQVlBLFVBQUEsRUFBWSxTQUFBO2FBQ1YsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUE7SUFEVSxDQVpaO0lBZUEsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQWZYO0lBaUJBLE9BQUEsRUFBUyxTQUFBO2FBQ1AsSUFBQyxDQUFBLEdBQUQsQ0FBSztRQUFBLElBQUEsRUFBTSxNQUFOO09BQUw7SUFETyxDQWpCVDtJQW9CQSxPQUFBLEVBQVMsU0FBQTthQUNQLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQSxJQUFBLEVBQU0sTUFBTjtPQUFMO0lBRE8sQ0FwQlQ7SUF1QkEsTUFBQSxFQUFRLFNBQUE7YUFDTixJQUFDLENBQUEsR0FBRCxDQUFLO1FBQUEsSUFBQSxFQUFNLEtBQU47T0FBTDtJQURNLENBdkJSO0lBMEJBLFVBQUEsRUFBWSxTQUFBO2FBQ1YsSUFBQyxDQUFBLEdBQUQsQ0FBSztRQUFBLElBQUEsRUFBTSxNQUFOO09BQUw7SUFEVSxDQTFCWjtJQTZCQSxNQUFBLEVBQVEsU0FBQTthQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtJQURNLENBN0JSO0lBZ0NBLEdBQUEsRUFBSyxTQUFDLEdBQUQ7QUFDSCxVQUFBO01BREssT0FBRDtNQUNKLElBQUEsQ0FBYyxJQUFDLENBQUEsTUFBRCxDQUFBLENBQWQ7QUFBQSxlQUFBOztNQUNBLElBQTRDLElBQUEsS0FBUSxNQUFwRDtRQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxDQUFxQixJQUFBLE9BQUEsQ0FBUTtVQUFDLE1BQUEsSUFBRDtTQUFSLENBQXJCLEVBQUE7O01BQ0EsSUFBd0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFqRDtlQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBWixDQUFBLENBQVosRUFBQTs7SUFIRyxDQWhDTDs7QUFORiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlfSA9IHJlcXVpcmUgJ2F0b20nXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcblJ1bm5lciA9IHJlcXVpcmUgJy4vcnVubmVyJ1xuQ29tbWFuZCA9IHJlcXVpcmUgJy4vY29tbWFuZCdcblxubW9kdWxlLmV4cG9ydHMgPSBSb2FkUnVubmVyID1cbiAgc3Vic2NyaXB0aW9uczogbnVsbFxuXG4gIGFjdGl2YXRlOiAoc3RhdGUpIC0+XG4gICAgIyBFdmVudHMgc3Vic2NyaWJlZCB0byBpbiBhdG9tJ3Mgc3lzdGVtIGNhbiBiZSBlYXNpbHkgY2xlYW5lZCB1cCB3aXRoIGEgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBoaXN0b3J5ID0gW11cbiAgICBAcnVubmVyID0gbmV3IFJ1bm5lcigpXG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsICdyb2FkLXJ1bm5lcjpydW4tbGluZSc6ID0+IEBydW5MaW5lKCkpXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsICdyb2FkLXJ1bm5lcjpydW4tZmlsZSc6ID0+IEBydW5GaWxlKCkpXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsICdyb2FkLXJ1bm5lcjpydW4tYWxsJzogPT4gQHJ1bkFsbCgpKVxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCAncm9hZC1ydW5uZXI6cmVwZWF0LWxhc3QnOiA9PiBAcmVwZWF0TGFzdCgpKVxuXG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG5cbiAgc2VyaWFsaXplOiAtPlxuXG4gIHJ1bkxpbmU6IC0+XG4gICAgQHJ1biB0eXBlOiAnbGluZSdcblxuICBydW5GaWxlOiAtPlxuICAgIEBydW4gdHlwZTogJ2ZpbGUnXG5cbiAgcnVuQWxsOiAtPlxuICAgIEBydW4gdHlwZTogJ2FsbCdcblxuICByZXBlYXRMYXN0OiAtPlxuICAgIEBydW4gdHlwZTogJ2xhc3QnXG5cbiAgZWRpdG9yOiAtPlxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuXG4gIHJ1bjogKHt0eXBlfSkgLT5cbiAgICByZXR1cm4gdW5sZXNzIEBlZGl0b3IoKVxuICAgIEBoaXN0b3J5LnVuc2hpZnQgbmV3IENvbW1hbmQoe3R5cGV9KSB1bmxlc3MgdHlwZSA9PSAnbGFzdCdcbiAgICBAcnVubmVyLnJ1biBAaGlzdG9yeVswXS50b1N0cmluZygpICAgaWYgQGhpc3RvcnkubGVuZ3RoXG4iXX0=
