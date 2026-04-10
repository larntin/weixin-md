## ADDED Requirements

### Requirement: Markdown text input
The system SHALL provide a text input area where users can type or paste Markdown formatted text.

#### Scenario: User types Markdown
- **WHEN** user types Markdown text into the editor area
- **THEN** the text SHALL be accepted and stored as the current editor content

#### Scenario: User pastes Markdown
- **WHEN** user pastes Markdown text from clipboard into the editor area
- **THEN** the pasted text SHALL appear in the editor and trigger a preview update

### Requirement: Real-time preview
The system SHALL render a real-time preview of the Markdown content as the user types.

#### Scenario: Content changes trigger preview update
- **WHEN** the editor content changes
- **THEN** the preview panel SHALL update to show the rendered HTML within 300ms

#### Scenario: Empty editor shows empty preview
- **WHEN** the editor content is empty
- **THEN** the preview panel SHALL display a placeholder or be empty

### Requirement: Split-pane layout
The system SHALL display the editor and preview in a side-by-side layout.

#### Scenario: Default layout
- **WHEN** the application loads
- **THEN** the left panel SHALL show the Markdown editor and the right panel SHALL show the rendered preview
