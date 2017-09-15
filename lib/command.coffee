module.exports = class Command
  TYPES: ['all', 'file', 'line']

  constructor: ({@type}) ->
    throw new Error('Unrecognized command type') if @unsupported()

    return unless @editor()

    @rendered = @render()

  unsupported: ->
    @TYPES.indexOf(@type) < 0

  toString: ->
    @rendered || ''

  template: ->
    atom.config.get(@template_key(), scope: @current_scope()) || ''

  template_key: ->
    "road-runner.commands.#{@type}"

  current_scope: ->
    @editor().getRootScopeDescriptor()

  render: ->
    @template().replace(/\{line\}/g, @line()).replace /\{file\}/g, @file()

  file: ->
    atom.project.relativize @editor().getPath()

  line: ->
    @editor().getCursorBufferPosition().row + 1

  editor: ->
    atom.workspace.getActiveTextEditor()
