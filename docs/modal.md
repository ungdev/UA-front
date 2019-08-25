`modal` (component)
===================



Props
-----

### `children` (required)

type: `union(string|object)`


### `className`

type: `string`
defaultValue: `''`


### `footer`

type: `union(object|func)`
defaultValue: `(props) => (
  <>
    <Button onClick={props.onCancel}>Annuler</Button>
    <Button onClick={props.onOk} primary>Ok</Button>
  </>
)`


### `onCancel` (required)

type: `func`


### `onOk`

type: `func`
defaultValue: `() => {}`


### `title` (required)

type: `union(string|object)`


### `visible` (required)

type: `bool`

