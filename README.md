# Custom Dropdown Component

A modern, accessible dropdown component built with vanilla HTML, CSS, and JavaScript. Features premium aesthetics with glassmorphism effects, smooth animations, and full keyboard navigation support.

![Custom Dropdown](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Premium Design** - Modern aesthetics with gradients, glassmorphism, and smooth animations
- **Fully Accessible** - Complete keyboard navigation and ARIA attributes
- **Responsive** - Works seamlessly across all device sizes
- **Multiple Instances** - Support for multiple independent dropdowns on the same page
- **Click-Outside-to-Close** - Intuitive UX with automatic closure when clicking outside
- **Smooth Animations** - Micro-interactions and stagger animations for enhanced user experience
- **Custom Events** - Emit custom events for easy integration with other components
- **Zero Dependencies** - Built with vanilla JavaScript, no frameworks required

## 🎨 Design Highlights

- **Glassmorphism Effect** - Backdrop blur with semi-transparent backgrounds
- **Gradient Accents** - Multi-layer gradients for depth and visual interest
- **Micro-Animations** - Hover effects, scale transforms, and smooth transitions
- **Stagger Animations** - Sequential item animations on dropdown open
- **Custom Scrollbar** - Styled scrollbar for long lists
- **Selection Indicator** - Animated checkmark for selected items

## 🚀 Quick Start

1. **Clone or Download** this repository
2. **Open** `index.html` in your browser
3. **Interact** with the dropdowns using mouse or keyboard

That's it! No build process or dependencies required.

## 📁 Project Structure

```
Custom-Dropdown/
├── index.html      # HTML structure with 3 dropdown examples
├── style.css       # Complete styling with design system
├── script.js       # Dropdown class and initialization
└── README.md       # This file
```

## 🎯 Usage

### Basic HTML Structure

```html
<div class="dropdown" data-dropdown id="my-dropdown">
    <button class="dropdown-trigger" data-dropdown-trigger
            aria-haspopup="listbox" aria-expanded="false" type="button">
        <span class="dropdown-value" data-dropdown-value>Select an option</span>
        <span class="dropdown-icon" aria-hidden="true">
            <!-- SVG chevron icon -->
        </span>
    </button>
    <ul class="dropdown-menu" data-dropdown-menu role="listbox">
        <li class="dropdown-option" role="option" data-value="option1">
            <span class="option-icon">🔷</span>
            <span class="option-text">Option 1</span>
        </li>
        <!-- More options... -->
    </ul>
</div>
```

### JavaScript Initialization

The dropdowns are automatically initialized when the DOM is ready. No manual initialization required!

```javascript
// Dropdowns are auto-initialized
// Access instance via element._dropdownInstance if needed
```

### Listen to Selection Events

```javascript
document.addEventListener('dropdown:select', (e) => {
    console.log('Selected:', e.detail.value);
    console.log('Dropdown:', e.detail.dropdown.id);
});
```

## ⌨️ Keyboard Navigation

Full keyboard support for accessibility:

| Key | Action |
|-----|--------|
| **Enter** / **Space** | Open dropdown or select focused option |
| **Escape** | Close dropdown |
| **Arrow Down** | Navigate to next option |
| **Arrow Up** | Navigate to previous option |
| **Home** | Jump to first option |
| **End** | Jump to last option |
| **Tab** | Move focus to/from dropdown |

## 🎨 Customization

### Modify Colors

Edit CSS custom properties in `style.css`:

```css
:root {
    --color-primary-h: 250;        /* Hue */
    --color-primary-s: 75%;        /* Saturation */
    --color-primary-l: 60%;        /* Lightness */
    --color-accent: hsl(330, 85%, 60%);
    /* ... more variables */
}
```

### Adjust Animations

Modify transition timings:

```css
:root {
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Change Dropdown Options

Simply add more `<li>` elements in the HTML:

```html
<li class="dropdown-option" role="option" data-value="new-option">
    <span class="option-icon">✨</span>
    <span class="option-text">New Option</span>
</li>
```

## 🌐 Browser Compatibility

- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)
- ✅ Opera (latest)

Supports all modern browsers with ES6+ support.

## 📱 Responsive Design

The component is fully responsive with:
- Touch-friendly targets (minimum 44px)
- Mobile-optimized spacing
- Adaptive width constraints
- Scrollable menus for long lists

## ♿ Accessibility Features

- **ARIA Attributes** - `aria-haspopup`, `aria-expanded`, `role="listbox"`, `role="option"`
- **Keyboard Navigation** - Full keyboard support (see table above)
- **Focus Management** - Visible focus indicators and proper focus handling
- **Screen Reader Support** - Semantic HTML and ARIA labels
- **Touch Targets** - Minimum 44px for comfortable interaction

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, gradients, animations, glassmorphism
- **JavaScript (ES6+)** - Classes, arrow functions, destructuring
- **Google Fonts** - Inter font family

## 📝 License

This project is open source and available for educational purposes. Feel free to use, modify, and distribute.

## 👨‍💻 Developer

Created as a demonstration of intermediate HTML, CSS, and JavaScript skills, focusing on:
- DOM Manipulation
- Event Handling
- Object-Oriented Programming
- CSS Animations
- Accessibility Best Practices

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🌟 Show Your Support

Give a ⭐️ if you find this project helpful!

---

**Happy Coding!** 🚀