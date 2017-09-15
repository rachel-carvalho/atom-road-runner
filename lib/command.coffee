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
    return 'npm test' if @type == 'all'
    return 'atom --test {file}' if @type == 'file'
    return 'rspec {file}:{line}' if @type == 'line'

  render: ->
    @template().replace(/\{line\}/g, @line()).replace /\{file\}/g, @file()

  file: ->
    atom.project.relativize @editor().getPath()

  line: ->
    @editor().getCursorBufferPosition().row + 1

  editor: ->
    atom.workspace.getActiveTextEditor()
