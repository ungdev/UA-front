## Input

Displays an input

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | `String` | `''` | :x: | Class of the container
**label** | `String` |  | :white_check_mark: | Label to display
**max** | `Number` | `undefined` | :x: | Maximum value (only for type="number")
**min** | `Number` | `undefined` | :x: | Minimum value (only for type="number")
**onChange** | `Function` |  | :white_check_mark: | Function called when the value change, the new value is passed as parameter
**type** | `Enum('text', 'email', 'password', 'number')` | `'text'` | :x: | Input type
**value** | `String` | `''` | :x: | Value of the input

