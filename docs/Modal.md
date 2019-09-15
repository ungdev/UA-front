## Modal

Displays a modal window

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | `ReactNode` |  | :white_check_mark: | The modal window content
**className** | `String` | `''` | :x: | The class of the modal container
**closable** | `Boolean` | `true` | :x: | Whether the modal window is closable or not by clicking on the close button or outside the modal window
**footer** | `ReactNode` | `''` | :x: | The modal footer content. Default value is two buttons : "Annuler" and "Ok"
**onCancel** | `Function` |  | :white_check_mark: | Function called when the user clicks on "Annuler" default button, or outside the modal, or on the close button
**onOk** | `Function` | `() => {}` | :x: | Function called when the user clicks on "Ok" default button
**title** | `ReactNode` |  | :white_check_mark: | The modal window title
**visible** | `Boolean` |  | :white_check_mark: | Whether the modal window is visible or not

