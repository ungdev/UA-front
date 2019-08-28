## Input

Displays a controlled input

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**id** | `String` |  | :white_check_mark: | id for the input
**label** | `String` |  | :white_check_mark: | Label to display for the input
**onChange** | `Function` |  | :white_check_mark: | onChange function, receive `event`
**placeholder** | `String` | `''` | :x: | Text to show before user input
**type** | `Enum('text', 'password', 'number')` | `'text'` | :x: | HTML native input type
**value** | `String` | `''` | :x: | Controlled value of the input

