Command = require('../lib/command')

context = describe

describe 'Command', ->
  it 'has a type', ->
    expect(new Command(type: 'all').type).toEqual 'all'

  it 'does not accept unknown types', ->
    expect(-> new Command(type: 'bananas')).toThrow new Error('Unrecognized command type')

  describe '.toString', ->
    beforeEach ->
      editor =
        getPath: -> '/this/is/a/full/path.coffee'
        getCursorBufferPosition: -> row: 9
      spyOn(atom.project, 'relativize').andReturn 'path.coffee'
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

    it 'renders type all', ->
      expect(new Command(type: 'all').toString()).toEqual 'npm test'

    it 'renders type file', ->
      expect(new Command(type: 'file').toString()).toEqual 'atom --test path.coffee'

    it 'renders type line', ->
      expect(new Command(type: 'line').toString()).toEqual 'rspec path.coffee:10'

    context 'when editor has a different path and buffer position', ->
      beforeEach ->
        editor =
          getPath: -> '/this/is/a/full/path.rb'
          getCursorBufferPosition: -> row: 16
        atom.project.relativize.andReturn 'path.rb'
        atom.workspace.getActiveTextEditor.andReturn editor

      it 'renders type file', ->
        expect(new Command(type: 'file').toString()).toEqual 'atom --test path.rb'

      it 'renders type line', ->
        expect(new Command(type: 'line').toString()).toEqual 'rspec path.rb:17'

    context 'when editor is not present', ->
      it 'renders an empty string', ->
        atom.workspace.getActiveTextEditor.andReturn null
        expect(new Command(type: 'all').toString()).toEqual ''
