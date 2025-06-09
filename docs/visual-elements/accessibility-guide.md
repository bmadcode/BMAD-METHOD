# BMAD Method Accessibility Guide

This guide ensures that all BMAD Method documentation and visual elements are accessible to users with diverse abilities and needs.

## Accessibility Principles

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

### 2. Operable
User interface components and navigation must be operable by all users.

### 3. Understandable
Information and the operation of user interface must be understandable.

### 4. Robust
Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Color and Contrast Standards

### WCAG AA Compliance

All text and interactive elements meet or exceed WCAG AA standards:

\```css
/* High contrast color combinations */
.high-contrast-text {
  color: #000000;           /* Black text */
  background: #ffffff;      /* White background */
  /* Contrast ratio: 21:1 */
}

.primary-text {
  color: #1a365d;           /* Dark blue text */
  background: #ffffff;      /* White background */
  /* Contrast ratio: 12.6:1 */
}

.secondary-text {
  color: #4a5568;           /* Gray text */
  background: #ffffff;      /* White background */
  /* Contrast ratio: 7.2:1 */
}

/* Interactive elements */
.interactive-element {
  color: #ffffff;           /* White text */
  background: #2563eb;      /* Blue background */
  /* Contrast ratio: 8.6:1 */
}

.interactive-element:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
  /* Focus indicator clearly visible */
}
\```

### Color-Blind Friendly Palette

Our color system works for users with various types of color vision deficiency:

\```css
/* Color-blind friendly palette */
:root {
  --accessible-blue: #0066cc;      /* Distinguishable blue */
  --accessible-green: #228b22;     /* Forest green */
  --accessible-red: #cc0000;       /* Clear red */
  --accessible-orange: #ff8c00;    /* Dark orange */
  --accessible-purple: #6a0dad;    /* Blue violet */
  --accessible-gray: #666666;      /* Medium gray */
}

/* Never rely on color alone */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.status-success {
  color: var(--accessible-green);
}

.status-success::before {
  content: "";
  font-weight: bold;
}

.status-error {
  color: var(--accessible-red);
}

.status-error::before {
  content: "";
  font-weight: bold;
}

.status-warning {
  color: var(--accessible-orange);
}

.status-warning::before {
  content: "";
  font-weight: bold;
}
\```

## Typography and Readability

### Font Selection and Sizing

\```css
/* Accessible typography */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;           /* Minimum 16px for body text */
  line-height: 1.6;          /* Adequate line spacing */
  letter-spacing: 0.01em;    /* Slight letter spacing for clarity */
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5em;
}

/* Large text for better readability */
.large-text {
  font-size: 18px;
  line-height: 1.7;
}

/* Ensure text can be zoomed to 200% */
@media (min-resolution: 2dppx) {
  body {
    font-size: 18px;
  }
}
\```

### Reading Flow and Structure

\```html
<!-- Proper heading hierarchy -->
<main>
  <h1>BMAD Method Documentation</h1>
  
  <section>
    <h2>Getting Started</h2>
    
    <article>
      <h3>First-Time Setup</h3>
      <p>Clear, concise instructions...</p>
      
      <h4>Environment Configuration</h4>
      <p>Step-by-step guidance...</p>
    </article>
  </section>
</main>

<!-- Skip links for keyboard navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#navigation" class="skip-link">Skip to navigation</a>
\```

## Keyboard Navigation

### Focus Management

\```css
/* Visible focus indicators */
*:focus {
  outline: 2px solid var(--bmad-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Enhanced focus for interactive elements */
button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 3px solid var(--bmad-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--bmad-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
\```

### Keyboard Interaction Patterns

\```javascript
// Accessible dropdown menu
class AccessibleDropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('.dropdown-trigger');
    this.menu = element.querySelector('.dropdown-menu');
    this.items = element.querySelectorAll('.dropdown-item');
    
    this.init();
  }
  
  init() {
    // Keyboard event handlers
    this.trigger.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
          e.preventDefault();
          this.openMenu();
          this.focusFirstItem();
          break;
      }
    });
    
    this.items.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextItem(index);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusPreviousItem(index);
            break;
          case 'Escape':
            e.preventDefault();
            this.closeMenu();
            this.trigger.focus();
            break;
        }
      });
    });
  }
  
  openMenu() {
    this.menu.style.display = 'block';
    this.trigger.setAttribute('aria-expanded', 'true');
  }
  
  closeMenu() {
    this.menu.style.display = 'none';
    this.trigger.setAttribute('aria-expanded', 'false');
  }
  
  focusFirstItem() {
    this.items[0].focus();
  }
  
  focusNextItem(currentIndex) {
    const nextIndex = (currentIndex + 1) % this.items.length;
    this.items[nextIndex].focus();
  }
  
  focusPreviousItem(currentIndex) {
    const prevIndex = currentIndex === 0 ? this.items.length - 1 : currentIndex - 1;
    this.items[prevIndex].focus();
  }
}
\```

## Screen Reader Support

### Semantic HTML and ARIA

\```html
<!-- Proper semantic structure -->
<article role="main">
  <header>
    <h1>BMAD Method Overview</h1>
    <nav aria-label="Page contents">
      <ol>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#personas">Personas</a></li>
        <li><a href="#workflow">Workflow</a></li>
      </ol>
    </nav>
  </header>
  
  <main>
    <section id="introduction" aria-labelledby="intro-heading">
      <h2 id="intro-heading">Introduction</h2>
      <p>The BMAD Method is...</p>
    </section>
    
    <!-- Interactive elements with proper ARIA -->
    <div class="persona-selector" role="tablist" aria-label="Select persona">
      <button role="tab" 
              aria-selected="true" 
              aria-controls="pm-panel"
              id="pm-tab">
        Project Manager
      </button>
      <button role="tab" 
              aria-selected="false" 
              aria-controls="architect-panel"
              id="architect-tab">
        System Architect
      </button>
    </div>
    
    <div role="tabpanel" 
         aria-labelledby="pm-tab" 
         id="pm-panel">
      <h3>Project Manager Persona</h3>
      <p>Responsible for...</p>
    </div>
  </main>
</article>

<!-- Form accessibility -->
<form>
  <fieldset>
    <legend>Project Configuration</legend>
    
    <label for="project-name">
      Project Name
      <span aria-label="required" class="required">*</span>
    </label>
    <input type="text" 
           id="project-name" 
           required 
           aria-describedby="name-help">
    <div id="name-help" class="help-text">
      Enter a descriptive name for your project
    </div>
    
    <label for="project-type">Project Type</label>
    <select id="project-type" aria-describedby="type-help">
      <option value="">Select project type</option>
      <option value="web">Web Application</option>
      <option value="mobile">Mobile Application</option>
      <option value="api">API Service</option>
    </select>
    <div id="type-help" class="help-text">
      Choose the primary type of project you're building
    </div>
  </fieldset>
</form>
\```

### Screen Reader Announcements

\```javascript
// Live region for dynamic content updates
class AccessibleNotifications {
  constructor() {
    this.createLiveRegion();
  }
  
  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }
  
  announce(message, priority = 'polite') {
    const liveRegion = document.getElementById('live-region');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}

// Usage examples
const notifications = new AccessibleNotifications();

// Announce progress updates
notifications.announce('Step 1 of 4 completed');

// Announce errors with assertive priority
notifications.announce('Error: Please fill in all required fields', 'assertive');

// Announce success
notifications.announce('Project created successfully');
\```

## Image and Media Accessibility

### Alternative Text Guidelines

\```html
<!-- Informative images -->
<img src="bmad-workflow-diagram.png" 
     alt="BMAD workflow diagram showing four connected steps: Requirements gathering by Product Owner, Architecture design by System Architect, UI/UX design by Designer, and Implementation by Developer">

<!-- Decorative images -->
<img src="decorative-pattern.png" 
     alt="" 
     role="presentation">

<!-- Complex images with detailed descriptions -->
<figure>
  <img src="system-architecture.png" 
       alt="BMAD system architecture overview" 
       aria-describedby="arch-description">
  <figcaption id="arch-description">
    The system architecture shows three main layers: 
    Presentation layer with web and mobile interfaces, 
    Application layer with orchestrator and persona management, 
    and Data layer with knowledge base and templates.
  </figcaption>
</figure>

<!-- Interactive images -->
<div class="interactive-diagram" role="img" aria-label="Interactive BMAD workflow">
  <button aria-label="Requirements phase - click for details">
    <img src="requirements-icon.png" alt="">
    Requirements
  </button>
  <button aria-label="Architecture phase - click for details">
    <img src="architecture-icon.png" alt="">
    Architecture
  </button>
</div>
\```

### Video and Audio Accessibility

\```html
<!-- Video with captions and transcripts -->
<video controls aria-describedby="video-description">
  <source src="bmad-introduction.mp4" type="video/mp4">
  <track kind="captions" 
         src="bmad-introduction-captions.vtt" 
         srclang="en" 
         label="English captions">
  <track kind="descriptions" 
         src="bmad-introduction-descriptions.vtt" 
         srclang="en" 
         label="Audio descriptions">
  Your browser does not support the video tag.
</video>

<div id="video-description">
  <h4>Video Description</h4>
  <p>This video introduces the BMAD Method, showing how different personas collaborate...</p>
  <details>
    <summary>Full Transcript</summary>
    <p>Welcome to the BMAD Method introduction...</p>
  </details>
</div>
\```

## Testing and Validation

### Accessibility Testing Checklist

- [ ] **Keyboard Navigation**
  - [ ] All interactive elements are keyboard accessible
  - [ ] Tab order is logical and intuitive
  - [ ] Focus indicators are clearly visible
  - [ ] No keyboard traps exist

- [ ] **Screen Reader Compatibility**
  - [ ] Content is properly structured with headings
  - [ ] Images have appropriate alt text
  - [ ] Form labels are properly associated
  - [ ] ARIA attributes are used correctly

- [ ] **Color and Contrast**
  - [ ] Text meets WCAG AA contrast requirements
  - [ ] Color is not the only means of conveying information
  - [ ] Interactive elements have sufficient contrast

- [ ] **Responsive Design**
  - [ ] Content is readable at 200% zoom
  - [ ] No horizontal scrolling at standard zoom levels
  - [ ] Touch targets are at least 44px

- [ ] **Motion and Animation**
  - [ ] Animations can be disabled via prefers-reduced-motion
  - [ ] No content flashes more than 3 times per second
  - [ ] Auto-playing media can be paused

### Automated Testing Tools

\```javascript
// Example accessibility testing with axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('BMAD documentation should be accessible', async () => {
  const { container } = render(<BMADDocumentation />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Manual testing helpers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
\```

---

*Following these accessibility guidelines ensures that BMAD Method documentation is usable by everyone, regardless of their abilities or the assistive technologies they use.*
