(function() {
  var Command;

  module.exports = Command = (function() {
    Command.prototype.TYPES = ['all', 'file', 'line'];

    function Command(arg) {
      this.type = arg.type;
      if (this.unsupported()) {
        throw new Error('Unrecognized command type');
      }
      if (!this.editor()) {
        return;
      }
      if (this.type === 'all') {
        this.rendered = this.render('npm test');
      }
      if (this.type === 'file') {
        this.rendered = this.render('atom --test {file}');
      }
      if (this.type === 'line') {
        this.rendered = this.render('zeus rspec {file}:{line}');
      }
    }

    Command.prototype.unsupported = function() {
      return this.TYPES.indexOf(this.type) < 0;
    };

    Command.prototype.toString = function() {
      return this.rendered || '';
    };

    Command.prototype.empty = function() {
      return !this.toString();
    };

    Command.prototype.render = function(template) {
      return template.replace(/\{line\}/g, this.line()).replace(/\{file\}/g, this.file());
    };

    Command.prototype.file = function() {
      return atom.project.relativize(this.editor().getPath());
    };

    Command.prototype.line = function() {
      return this.editor().getCursorBufferPosition().row + 1;
    };

    Command.prototype.editor = function() {
      return atom.workspace.getActiveTextEditor();
    };

    return Command;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3JjYXJ2YWxoby9wcm9qZWN0cy9yb2FkLXJ1bm5lci9saWIvY29tbWFuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007c0JBQ0osS0FBQSxHQUFPLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsTUFBaEI7O0lBRU0saUJBQUMsR0FBRDtNQUFFLElBQUMsQ0FBQSxPQUFGLElBQUU7TUFDZCxJQUFnRCxJQUFDLENBQUEsV0FBRCxDQUFBLENBQWhEO0FBQUEsY0FBVSxJQUFBLEtBQUEsQ0FBTSwyQkFBTixFQUFWOztNQUVBLElBQUEsQ0FBYyxJQUFDLENBQUEsTUFBRCxDQUFBLENBQWQ7QUFBQSxlQUFBOztNQUVBLElBQTZDLElBQUMsQ0FBQSxJQUFELEtBQVMsS0FBdEQ7UUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxNQUFELENBQVEsVUFBUixFQUFaOztNQUNBLElBQTZDLElBQUMsQ0FBQSxJQUFELEtBQVMsTUFBdEQ7UUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxNQUFELENBQVEsb0JBQVIsRUFBWjs7TUFDQSxJQUFrRCxJQUFDLENBQUEsSUFBRCxLQUFTLE1BQTNEO1FBQUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFDLENBQUEsTUFBRCxDQUFRLDBCQUFSLEVBQVo7O0lBUFc7O3NCQVNiLFdBQUEsR0FBYSxTQUFBO2FBQ1gsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQWUsSUFBQyxDQUFBLElBQWhCLENBQUEsR0FBd0I7SUFEYjs7c0JBR2IsUUFBQSxHQUFVLFNBQUE7YUFDUixJQUFDLENBQUEsUUFBRCxJQUFhO0lBREw7O3NCQUdWLEtBQUEsR0FBTyxTQUFBO2FBQ0wsQ0FBQyxJQUFDLENBQUEsUUFBRCxDQUFBO0lBREk7O3NCQUdQLE1BQUEsR0FBUSxTQUFDLFFBQUQ7YUFDTixRQUNFLENBQUMsT0FESCxDQUNXLFdBRFgsRUFDd0IsSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUR4QixDQUVFLENBQUMsT0FGSCxDQUVXLFdBRlgsRUFFd0IsSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUZ4QjtJQURNOztzQkFLUixJQUFBLEdBQU0sU0FBQTthQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBYixDQUF3QixJQUFDLENBQUEsTUFBRCxDQUFBLENBQVMsQ0FBQyxPQUFWLENBQUEsQ0FBeEI7SUFESTs7c0JBR04sSUFBQSxHQUFNLFNBQUE7YUFDSixJQUFDLENBQUEsTUFBRCxDQUFBLENBQVMsQ0FBQyx1QkFBVixDQUFBLENBQW1DLENBQUMsR0FBcEMsR0FBMEM7SUFEdEM7O3NCQUdOLE1BQUEsR0FBUSxTQUFBO2FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO0lBRE07Ozs7O0FBakNWIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQ29tbWFuZFxuICBUWVBFUzogWydhbGwnLCAnZmlsZScsICdsaW5lJ11cblxuICBjb25zdHJ1Y3RvcjogKHtAdHlwZX0pIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnJlY29nbml6ZWQgY29tbWFuZCB0eXBlJykgaWYgQHVuc3VwcG9ydGVkKClcblxuICAgIHJldHVybiB1bmxlc3MgQGVkaXRvcigpXG5cbiAgICBAcmVuZGVyZWQgPSBAcmVuZGVyICducG0gdGVzdCcgICAgICAgICAgICBpZiBAdHlwZSA9PSAnYWxsJ1xuICAgIEByZW5kZXJlZCA9IEByZW5kZXIgJ2F0b20gLS10ZXN0IHtmaWxlfScgIGlmIEB0eXBlID09ICdmaWxlJ1xuICAgIEByZW5kZXJlZCA9IEByZW5kZXIgJ3pldXMgcnNwZWMge2ZpbGV9OntsaW5lfScgaWYgQHR5cGUgPT0gJ2xpbmUnXG5cbiAgdW5zdXBwb3J0ZWQ6IC0+XG4gICAgQFRZUEVTLmluZGV4T2YoQHR5cGUpIDwgMFxuXG4gIHRvU3RyaW5nOiAtPlxuICAgIEByZW5kZXJlZCB8fCAnJ1xuXG4gIGVtcHR5OiAtPlxuICAgICFAdG9TdHJpbmcoKVxuXG4gIHJlbmRlcjogKHRlbXBsYXRlKSAtPlxuICAgIHRlbXBsYXRlXG4gICAgICAucmVwbGFjZSAvXFx7bGluZVxcfS9nLCBAbGluZSgpXG4gICAgICAucmVwbGFjZSAvXFx7ZmlsZVxcfS9nLCBAZmlsZSgpXG5cbiAgZmlsZTogLT5cbiAgICBhdG9tLnByb2plY3QucmVsYXRpdml6ZShAZWRpdG9yKCkuZ2V0UGF0aCgpKVxuXG4gIGxpbmU6IC0+XG4gICAgQGVkaXRvcigpLmdldEN1cnNvckJ1ZmZlclBvc2l0aW9uKCkucm93ICsgMVxuXG4gIGVkaXRvcjogLT5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiJdfQ==
