## Modal

Displays a modal window

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**buttons** | `ReactNode` | `''` | :x: | Modal window buttons. The default value is two buttons : "Annuler" and "Ok"
**children** | `ReactNode` |  | :white_check_mark: | Modal window content
**className** | `String` | `''` | :x: | Class of the container
**closable** | `Boolean` | `true` | :x: | Whether the modal window is closable or not
**onCancel** | `Function` |  | :white_check_mark: | Function called when the user clicks on "Annuler" default button, or outside the modal, or on the close button
**onOk** | `Function` | `() => {}` | :x: | Function called when the user clicks on "Ok" default button
**title** | `ReactNode` |  | :white_check_mark: | Modal window title
**visible** | `Boolean` |  | :white_check_mark: | Whether the modal window is visible or not

