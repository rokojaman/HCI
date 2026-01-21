# Technology Stack

## Core Technologies

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui

## Build Directives

- **Codebase:** All code files must be strictly TypeScript (`.ts`, `.tsx`). No JavaScript (`.js`, `.jsx`) files are permitted.
- **Scaffolding & Configuration:** You MUST use the provided **Next.js MCP server** to initialize and configure the application.
- **Component Management:** You MUST use the provided **shadcn MCP server** to install and manage UI components.

# Website Construction Guidelines

## Core Usability Goals

- **Effectiveness:** Ensure users can achieve their goals with the product.
- **Efficiency:** Minimize the effort and time required for users to complete tasks.
- **Safety:** Prevent errors and provide recovery mechanisms.
- **Learnability:** Make the interface easy to learn for new users.
- **Memorability:** Ensure users can re-establish proficiency after a period of non-use.

## Design Principles

### Visibility & Status

- **State Indication:** Always display the current state of the system or device (e.g., loading spinners, active tab indicators).
- **Action Availability:** Clearly indicate possible actions. Do not hide critical controls behind complex menus without clear cues.
- **Control Position:** Position controls where they are easily found and naturally expected.
- **Text Entry:** Make text input fields obvious (e.g., distinct borders, placeholders).

### Feedback

- **Immediate Response:** Provide immediate feedback for every user action (e.g., button click states, success/error messages).
- **Multi-modal Feedback:** Use visual changes (highlighting, animation) to confirm actions.
- **Status Updates:** Inform the user about the result of their action (e.g., "Item saved," "Email sent").
- **Gulf of Evaluation:** Explicitly answer "What happened?" and "Is this what I wanted?" immediately after an action.

### Mental Models & Language

- **Match User Expectations:** Design the interface to match the user's mental model of how the system works.
- **Speak User's Language:** Use words, phrases, and concepts familiar to the user, rather than system-oriented terms. Avoid technical jargon.
- **Natural Mapping:** Ensure a logical relationship between controls and their effects (e.g., a slider moving right increases volume).
- **Real-World Metaphors:** Use metaphors cautiously; they should help, not mislead (e.g., trash can for deletion).

### User Control & Freedom

- **Emergency Exits:** Provide clearly marked "exits" to leave unwanted states without extended dialogue (e.g., "Cancel" buttons, "Close" icons).
- **Undo/Redo:** Support undo and redo functionality to relieve anxiety about making mistakes.
- **Freedom to Explore:** Allow users to explore the interface without fear of irreversible negative consequences.

### Error Prevention & Handling

- **Prevention First:** Eliminate error-prone conditions or check for them before users commit to an action (e.g., confirm destructive actions like delete).
- **Helpful Error Messages:** Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.
- **Constrain Inputs:** Use specific input types (date pickers, dropdowns) to prevent invalid data entry.

### Consistency & Standards

- **Platform Conventions:** Follow platform-specific standards (e.g., keyboard shortcuts like Ctrl+C).
- **Internal Consistency:** Use uniform terminology, layout, and visual language throughout the application.
- **Principle of Least Surprise:** Components should behave in the way users expect them to based on their appearance and location.

### Flexibility & Efficiency

- **Accelerators:** Provide shortcuts (keyboard accelerators, gesture shortcuts) for expert users that remain unseen by novices.
- **Tailored Actions:** Allow users to customize frequent actions or views to suit their workflow.
- **Performance:** Ensure the system responds quickly; perceived performance is as important as actual speed.

### Aesthetics & Minimalism

- **Less is More:** Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with the relevant units.
- **Visual Hierarchy:** Use whitespace, typography, and contrast to guide the user's eye to the most important elements.
- **Signal-to-Noise:** Maximize the data-ink ratio; remove decorative elements that don't support the user's task.

### Recognition over Recall (Memory)

- **Visible Options:** Minimize the user's memory load by making objects, actions, and options visible.
- **Contextual Help:** Instructions for use should be visible or easily retrievable whenever appropriate.
- **Feedforward:** Ensure the interface answers "What can I do?" and "How do I do it?" before the action is taken.

## Visual Design (CRAP Principles)

- **Contrast:** Make different things look _very_ different. Use contrast (color, size, weight) to create interest and guide attention. If elements are not the same, make them distinct.
- **Repetition:** Repeat visual elements (fonts, colors, shapes, textures) throughout the design to create unity and consistency.
- **Alignment:** Nothing should be placed on the page arbitrarily. Every element should have a visual connection with another element. Prefer strong (left or right) alignment over center alignment for text.
- **Proximity:** Group related items together. Physical closeness implies relationship. Move unrelated items apart to reduce clutter and clarify structure.

## Color Theory & Usage

- **Limit Palette:** Use a limited number of colors (e.g., 60-30-10 rule: 60% dominant color, 30% secondary, 10% accent).
- **Contrast for Text:** Ensure high contrast between text and background for readability (e.g., black on white, not blue on red).
- **Color Meaning:** Use color to convey meaning (e.g., red for danger/stop, green for go/success), but do NOT rely on color alone.
- **Accessibility:** Design for color blindness. Use secondary cues like shape, texture, or text labels in addition to color to distinguish elements.
- **Relationships:** Use color relationships (complementary, analogous, monochromatic) to create harmonious schemes.
- **Attention:** Use warm colors (reds, oranges) to grab attention for critical actions, but use them sparingly.

## Interaction Optimization (Fitts's Law)

- **Target Size:** Make clickable targets (buttons, icons, links) large enough to be easily acquired.
- **Target Distance:** Place frequently used or related targets close to each other to minimize cursor/finger travel time.
- **Infinite Edges:** Utilize screen corners and edges for critical navigation or menus.
- **Label Clickability:** Ensure clicking a text label (e.g., for a checkbox or radio button) activates the control.

## Cognitive Load & Decision Making (Hick's Law)

- **Minimize Options:** Restrict the number of simultaneous choices to reduce decision time.
- **Progressive Disclosure:** Present information in stages; hide complex options until needed.
- **Categorization:** Group long lists of items into logical categories.
- **Default Selections:** Provide smart, safe defaults to reduce the burden of choice.

## Help & Documentation

- **Searchable:** Help documentation should be easy to search.
- **Task-Focused:** Focus on helping the user's concrete task, list concrete steps.
- **Concise:** Keep documentation short and to the point.
