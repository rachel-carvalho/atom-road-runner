{CompositeDisposable} = require 'atom'
child_process = require 'child_process'
path = require 'path'

module.exports = RoadRunner =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @history = []
    @subscriptions = new CompositeDisposable()
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-line': => @runLine())
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-file': => @runFile())
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-command': => @runCommand())
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:repeat-last': => @repeatLast())

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->

  runLine: ->
    @run template: 'rspec {file}:{line}'

  runFile: ->
    @run template: 'atom --test {file}'

  runCommand: ->
    @run template: 'npm test'

  repeatLast: ->
    @run last_command: true

  editor: ->
    atom.workspace.getActiveTextEditor()

  run: ({template, last_command}) ->
    return unless @editor()
    full_command = @full_command(template, last_command)
    child_process.execSync full_command if full_command

  full_command: (template, last_command) ->
    @history.unshift "#{@runner()} \"#{@command(template)}\"" unless last_command
    @history[0]

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
