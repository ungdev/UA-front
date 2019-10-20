## Table

Displays a table

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**alignRight** | `Boolean` | `false` | :x: | Align the last column to the right
**className** | `String` | `''` | :x: | Class of the table
**columns** | `Array[]<Shape>` |  | :white_check_mark: | Title and key of each column
**columns[].key** | `String` |  | :white_check_mark: | 
**columns[].title** | `*` |  | :white_check_mark: | 
**dataSource** | `Array[]<Object>` |  | :white_check_mark: | Data for each row, must follow the key of each column
**emptyText** | `String` | `'(Vide)'` | :x: | Text to display if there is no data

