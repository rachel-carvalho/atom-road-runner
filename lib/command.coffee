module.exports = class Command
  TYPES: ['all', 'file', 'line']

  constructor: ({@type}) ->
    throw new Error('Unrecognized command type') if @unsupported()

    return unless @editor()

    @rendered = @render 'npm test' if @type == 'all'
    @rendered = @render 'atom --test {file}' if @type == 'file'
    @rendered = @render 'rspec {file}:{line}' if @type == 'line'

  unsupported: ->
    @TYPES.indexOf(@type) < 0

  toString: ->
    @rendered || ''

  empty: ->
    !@toString()

  render: (template) ->
    template.replace(/\{line\}/g, @line()).replace /\{file\}/g, @file()

  file: ->
    atom.project.relativize @editor().getPath()

  line: ->
    @editor().getCursorBufferPosition().row + 1

  editor: ->
    atom.workspace.getActiveTextEditor()
