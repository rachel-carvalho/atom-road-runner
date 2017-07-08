{CompositeDisposable} = require 'atom'
child_process = require 'child_process'
path = require 'path'

module.exports = RoadRunner =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable()
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-line': => @runLine())

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->

  runLine: ->
    @run 'rspec {file}:{line}'

  editor: ->
    atom.workspace.getActiveTextEditor()

  run: (template) ->
    return unless @editor()
    child_process.execSync "#{@runner()} \"#{@command(template)}\""

  runner: ->
    path.join atom.packages.resolvePackagePath('road-runner'), 'bin', 'os_x_terminal'

  command: (template) ->
    template
      .replace /\{line\}/g, @line()
      .replace /\{file\}/g, @file()

  file: ->
    atom.project.relativize(@editor().getPath())

  line: ->
    @editor().getCursorBufferPosition().row + 1
