**Refactor state** 

Three kinds of state.

How do we deal with:
- foreground
- aspect ratio
- size
- lines

# resizable state
- size

# exported/imported state

what's cleared and replaced at import
clearState

NOT reset()

- foreground
- aspect ratio
- speed
- backgroundColor

- lines

ignored:
- state of drawing tool (color, width, duration)

# clearable state / restorable state (undo/redo)

when you click the X button
NOT clear()

delete:
- lines

keep:
- foreground
- aspect ratio
- speed
- backgroundColor
- state of drawing tool (color, width, duration)

# initial state

reset()
- state of drawing tool (color, width, duration)
- size
- no lines
- foreground
- aspect ratio
- speed
- backgroundColor

# actual code
state object: {width, height, foregroundUrl, lines}
not: speed, backgroundColor (directly set on ps), 

importData:
 -cleartSate
  set state .width .height .foregroundUrl
  scale(availableSize)
undo import:
  setState(oldState)
  scale() no argument!

# state tree

- state of drawing tool (color, strokeWidth, duration)
- exportable state (artwork state): state {}, clearState()
 - clearable state (your work: lines)
 - permanent state: foregroundUrl, backgroundColor, aspect ratio
- resizable state: width/height

# TODO
## refactor importData and setState
why setState, clearState and importData?
can we importData instead of setState. It calls clearState

## explicitely create state objects
the current state object seems to be the exportable state
move all clearable state to its own object (included in exportable state, probably)
move drawing tool state from closure variables to toolState
also create a resizable state maybe.

## handle backgroundColor and foregroundUrl in the same place
they are both permanent state

## understand resizing
what state is set, what can be resized, when can aspect ratio change?
