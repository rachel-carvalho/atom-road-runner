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
        getRootScopeDescriptor: -> '.source.coffee'
      spyOn(atom.project, 'relativize').andReturn 'path.coffee'
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

    it 'renders type all', ->
      spyOn(atom.config, 'get').andReturn 'npm test'
      expect(new Command(type: 'all').toString()).toEqual 'npm test'
      expect(atom.config.get).toHaveBeenCalledWith('road-runner.commands.all', scope: '.source.coffee')

    it 'renders type file', ->
      spyOn(atom.config, 'get').andReturn 'atom --test {file}'
      expect(new Command(type: 'file').toString()).toEqual 'atom --test path.coffee'
      expect(atom.config.get).toHaveBeenCalledWith('road-runner.commands.file', scope: '.source.coffee')

    it 'renders type line', ->
      spyOn(atom.config, 'get').andReturn 'atom --test {file}:{line}'
      expect(new Command(type: 'line').toString()).toEqual 'atom --test path.coffee:10'
      expect(atom.config.get).toHaveBeenCalledWith('road-runner.commands.line', scope: '.source.coffee')

    context 'when editor has a different path and buffer position', ->
      beforeEach ->
        editor =
          getPath: -> '/this/is/a/full/path.rb'
          getCursorBufferPosition: -> row: 16
          getRootScopeDescriptor: -> '.source.ruby'
        atom.project.relativize.andReturn 'path.rb'
        atom.workspace.getActiveTextEditor.andReturn editor

      it 'renders type file', ->
        spyOn(atom.config, 'get').andReturn 'rspec {file}'
        expect(new Command(type: 'file').toString()).toEqual 'rspec path.rb'
        expect(atom.config.get).toHaveBeenCalledWith('road-runner.commands.file', scope: '.source.ruby')

      it 'renders type line', ->
        spyOn(atom.config, 'get').andReturn 'rspec {file}:{line}'
        expect(new Command(type: 'line').toString()).toEqual 'rspec path.rb:17'
        expect(atom.config.get).toHaveBeenCalledWith('road-runner.commands.line', scope: '.source.ruby')

    context 'when editor is not present', ->
      it 'renders an empty string', ->
        atom.workspace.getActiveTextEditor.andReturn null
        expect(new Command(type: 'all').toString()).toEqual ''
