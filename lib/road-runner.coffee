{CompositeDisposable} = require 'atom'
path = require 'path'
Runner = require './runner'

module.exports = RoadRunner =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @history = []
    @runner = new Runner()
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
    @runner.run @command(template, last_command)

  command: (template, last_command) ->
    if !last_command
      @history.unshift(template
                        .replace /\{line\}/g, @line()
                        .replace /\{file\}/g, @file())

    @history[0]

  file: ->
    atom.project.relativize(@editor().getPath())

  line: ->
    @editor().getCursorBufferPosition().row + 1
