## ADDED Requirements

### Requirement: One-click copy to clipboard
The system SHALL provide a copy button that writes the rendered HTML to the system clipboard as `text/html` MIME type.

#### Scenario: User clicks copy button
- **WHEN** user clicks the "Copy" button
- **THEN** the rendered HTML SHALL be written to the clipboard using `navigator.clipboard.write()` with `text/html` Blob
- **THEN** a success feedback message SHALL be displayed to the user

#### Scenario: Copy with empty content
- **WHEN** user clicks "Copy" with no Markdown content in the editor
- **THEN** the system SHALL either disable the copy button or show a warning

### Requirement: Clipboard content preserves styles when pasted
The clipboard content SHALL be formatted so that pasting into the WeChat Official Account editor preserves all inline styles.

#### Scenario: Paste into WeChat editor
- **WHEN** user pastes the copied content into the WeChat Official Account backend editor
- **THEN** headings, paragraphs, bold, italic, lists, blockquotes, code blocks, and tables SHALL retain their visual styling

### Requirement: Clipboard API fallback
The system SHALL provide a fallback copy mechanism for browsers that do not support `navigator.clipboard.write()`.

#### Scenario: Fallback copy in unsupported browser
- **WHEN** `navigator.clipboard.write` is not available
- **THEN** the system SHALL use `document.execCommand('copy')` with a hidden contenteditable element as fallback
