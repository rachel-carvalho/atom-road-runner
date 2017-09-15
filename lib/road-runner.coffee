{CompositeDisposable} = require 'atom'
path = require 'path'
Runner = require './runner'
Command = require './command'

module.exports = RoadRunner =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @history = []
    @runner = new Runner()
    @subscriptions = new CompositeDisposable()
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-line': => @runLine())
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-file': => @runFile())
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:run-all': => @runAll())
    @subscriptions.add atom.commands.add('atom-workspace', 'road-runner:repeat-last': => @repeatLast())

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->

  runLine: ->
    @run type: 'line'

  runFile: ->
    @run type: 'file'

  runAll: ->
    @run type: 'all'

  repeatLast: ->
    @run type: 'last'

  editor: ->
    atom.workspace.getActiveTextEditor()

  run: ({type}) ->
    return unless @editor()

    @history.unshift new Command(type: type) if type != 'last'
    @runner.run @history[0]
