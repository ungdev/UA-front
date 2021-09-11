## Radio

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | `String` | `''` | :x: | Class to apply to the container
**label** | `ReactNode` | `''` | :x: | Label of the field
**name** | `String` |  | :white_check_mark: | Used to identify a group of radio inputs
**onChange** | `Function` | `() => {}` | :x: | Function triggered when the value change
**options** | `Array[]<Shape>` |  | :white_check_mark: | Available values
**options[].name** | `ReactNode` |  | :white_check_mark: | 
**options[].value** | `String` |  | :white_check_mark: | 
**row** | `Boolean` | `false` | :x: | Should the inputs be in a row ?
**value** | `String` |  | :white_check_mark: | Value of the field

