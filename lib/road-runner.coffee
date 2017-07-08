{CompositeDisposable} = require 'atom'

module.exports = RoadRunner =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable()

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'road-runner:run-line': => @runLine()

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->

  runLine: ->
    editor = atom.workspace.getActiveTextEditor()
    relative_path = atom.project.relativize(editor.getPath())
    line = editor.getCursorBufferPosition().row + 1
    atom.notifications.addSuccess "it's ALIVE: #{relative_path}:#{line}"
