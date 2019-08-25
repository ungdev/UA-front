`modal` (component)
===================

Displays a modal window

Props
-----

### `children` (required)

The modal window content

type: `node`


### `className`

The class of the modal container

type: `string`
defaultValue: `''`


### `closable`

Whether the modal window is closable or not
by clicking on the close button or outside the modal window

type: `bool`
defaultValue: `true`


### `footer`

The modal footer content. Default value is two buttons : "Annuler" and "Ok"

type: `node`
defaultValue: `''`


### `onCancel`

Function called when the user clicks on "Annuler" default button,
or outside the modal, or on the close button

type: `func`
defaultValue: `() => {}`


### `onOk`

Function called when the user clicks on "Ok" default button

type: `func`
defaultValue: `() => {}`


### `title` (required)

The modal window title

type: `node`


### `visible` (required)

Whether the modal window is visible or not

type: `bool`

