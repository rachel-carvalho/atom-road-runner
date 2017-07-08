RoadRunnerView = require './road-runner-view'
{CompositeDisposable} = require 'atom'

module.exports = RoadRunner =
  roadRunnerView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @roadRunnerView = new RoadRunnerView(state.roadRunnerViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @roadRunnerView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'road-runner:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @roadRunnerView.destroy()

  serialize: ->
    roadRunnerViewState: @roadRunnerView.serialize()

  toggle: ->
    console.log 'RoadRunner was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
