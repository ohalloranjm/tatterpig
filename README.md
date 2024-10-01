## Database Schema

- Users
  - username (str)
  - email (str)
  - hashed password (str)
  - name (str)
- Sheets
  - name (str)
  - public (boolean)
  - ownerId (fk Users)
- Attributes
  - name (str)
  - description (str)
  - ownerId (int, fk Users)
  - ephemeral (boolean)
- SheetAttributes
  - sheetId (int, fk Sheets)
  - attributeId (int, fk Attributes)
  - value (str)
- SharedSheets
  - sheetId (int, fk Sheets)
  - userId (int, fk Users)
  - edit privileges (boolean)

### Relationships

- 1 User (owner) : many Sheets
- many Users (shared with) : many Sheets
- 1 User : many Attributes
- many Sheets : many Attributes

## Features

### Sheets

- Users should be able to view all of the sheets they own
- Users should be able to browse publically available sheets
- Users should be able to create a new sheet
  - from a blank slate
  - by copying an existing sheet
- Users should be able to edit a sheet they own
- Users should be able to delete a sheet they own

### Attributes

- Users should be able to view all attributes they own
- Users should be able to add a new attribute to a sheet they own and assign it a value
- Users should be able to attach an existing attribute to a sheet they own and assign it a value
- Users should be able to change the value of any attribute on an editable sheet
- Users should be able to unattach an attribute from an editable sheet
- Users should be able to edit the details of an attribute they own
- Users should be able to delete an attribute they own
- Users should be able to delete an attribute

### Stretch Goal: Shared Sheets

- Users should be able to view all of the sheets that have been shared with them
- Users should be able to edit a shared sheet that they have edit privileges for
- Users should be able to add a new attribute to a sheet they have edit privileges for and assign it a value
- Users should be able to attach an existing attribute they own to an editable sheet and assign it a value

### Stretch Goal: Actions

- Users should be able to view all actions they own
- Users should be able to view all actions that have been shared with them
- Users should be able to create new actions
- Users should be able to edit actions they own
- Users should be able to delete actions

### Stretch Goal: Rolls

- Users should be able to view all rolls they've made
- Users should be able to view all rolls attached to sheets they own and sheets shared with them
- Users sholud be able to generate new rolls from scratch
- Users should be able to generate new rolls from actions
- Users should be able to delete rolls they own
