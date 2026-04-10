## ADDED Requirements

### Requirement: Markdown to HTML conversion
The system SHALL convert Markdown text to HTML using the marked library.

#### Scenario: Standard Markdown elements
- **WHEN** Markdown contains headings, paragraphs, bold, italic, links, images, lists, blockquotes, and tables
- **THEN** each element SHALL be rendered as the corresponding HTML tag

### Requirement: All CSS must be inline
The system SHALL apply all styling as inline `style` attributes on HTML elements. The output HTML SHALL NOT contain `<style>` tags, `class`-dependent styles, or external stylesheet references.

#### Scenario: Rendered output contains only inline styles
- **WHEN** Markdown is rendered to HTML
- **THEN** every styled HTML element SHALL have its styles in the `style` attribute
- **THEN** the output SHALL NOT contain any `<style>` tags

### Requirement: WeChat-compatible HTML tags only
The output HTML SHALL only use tags supported by the WeChat editor: `<p>`, `<h1>`-`<h6>`, `<strong>`, `<em>`, `<u>`, `<br>`, `<span>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<tr>`, `<td>`, `<th>`, `<img>`, `<a>`, `<section>`, `<div>`, `<code>`, `<pre>`, `<blockquote>`, `<hr>`.

#### Scenario: No forbidden tags in output
- **WHEN** Markdown is rendered to HTML
- **THEN** the output SHALL NOT contain `<script>`, `<iframe>`, `<form>`, `<input>`, or `<style>` tags

### Requirement: No forbidden CSS properties
The output HTML SHALL NOT use `position`, `transform`, `float`, or percentage-based height/width values.

#### Scenario: CSS properties are WeChat-safe
- **WHEN** Markdown is rendered to HTML
- **THEN** no element SHALL have `position`, `transform`, or `float` in its inline style
- **THEN** dimension values SHALL use `px` units, not `%`

### Requirement: List style preservation
The system SHALL explicitly inline `list-style-type` and padding on `<ul>`, `<ol>`, and `<li>` elements to prevent WeChat editor from resetting list styles.

#### Scenario: Unordered list retains bullet style
- **WHEN** Markdown contains an unordered list
- **THEN** the rendered `<ul>` and `<li>` elements SHALL have inline `list-style-type` and `padding-left` styles

#### Scenario: Ordered list retains number style
- **WHEN** Markdown contains an ordered list
- **THEN** the rendered `<ol>` and `<li>` elements SHALL have inline `list-style-type: decimal` and `padding-left` styles

### Requirement: Theme-based styling
The system SHALL apply styles from a theme configuration object that maps HTML element types to CSS property sets.

#### Scenario: Theme styles applied to headings
- **WHEN** Markdown contains `# Heading 1`
- **THEN** the rendered `<h1>` SHALL have inline styles matching the theme's h1 configuration (font-size, font-weight, color, margin, etc.)
