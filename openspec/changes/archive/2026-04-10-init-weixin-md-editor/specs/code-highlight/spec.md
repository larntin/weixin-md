## ADDED Requirements

### Requirement: Code block syntax highlighting
The system SHALL apply syntax highlighting to fenced code blocks using highlight.js, with each token's color applied as an inline style.

#### Scenario: Fenced code block with language
- **WHEN** Markdown contains a fenced code block with a language identifier (e.g., ` ```javascript `)
- **THEN** the rendered code block SHALL have syntax-highlighted tokens with inline `color` and `font-weight` styles

#### Scenario: Fenced code block without language
- **WHEN** Markdown contains a fenced code block without a language identifier
- **THEN** highlight.js auto-detection SHALL be used, or the code SHALL be rendered as plain preformatted text

### Requirement: Code block container styling
The code block container (`<pre>` + `<code>`) SHALL have inline styles for background color, padding, border-radius, font-family, and font-size.

#### Scenario: Code block visual appearance
- **WHEN** a code block is rendered
- **THEN** the `<pre>` element SHALL have inline styles for `background-color`, `padding`, `border-radius`, `overflow-x`, and `font-size`
- **THEN** the `<code>` element SHALL have inline `font-family` set to a monospace font stack

### Requirement: Inline code styling
The system SHALL style inline code (single backtick) with a distinct background and font.

#### Scenario: Inline code appearance
- **WHEN** Markdown contains inline code (e.g., `` `variable` ``)
- **THEN** the rendered `<code>` element SHALL have inline styles for `background-color`, `padding`, `border-radius`, `font-size`, and `font-family`
