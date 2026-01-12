// ==========================================
// CUSTOM DROPDOWN COMPONENT
// Object-oriented JavaScript implementation
// ==========================================

/**
 * Dropdown Class
 * Manages individual dropdown component behavior
 */
class Dropdown {
    /**
     * @param {HTMLElement} element - The dropdown container element
     */
    constructor(element) {
        // Core elements
        this.dropdown = element;
        this.trigger = element.querySelector('[data-dropdown-trigger]');
        this.menu = element.querySelector('[data-dropdown-menu]');
        this.valueDisplay = element.querySelector('[data-dropdown-value]');
        this.options = Array.from(element.querySelectorAll('.dropdown-option'));
        
        // State
        this.isOpen = false;
        this.selectedValue = null;
        this.selectedOption = null;
        this.focusedIndex = -1;
        
        // Store original placeholder text
        this.placeholder = this.valueDisplay.textContent;
        
        // Bind methods to preserve context
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize the dropdown with event listeners
     */
    init() {
        // Trigger click toggles dropdown
        this.trigger.addEventListener('click', this.toggle);
        
        // Option clicks select the option
        this.options.forEach((option, index) => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOption(option, index);
            });
        });
        
        // Keyboard navigation
        this.dropdown.addEventListener('keydown', this.handleKeyboard);
        
        // Click outside to close
        document.addEventListener('click', this.handleClickOutside);
        
        // Set initial state
        this.valueDisplay.classList.add('is-placeholder');
        
        console.log('Dropdown initialized:', this.dropdown.id);
    }
    
    /**
     * Toggle dropdown open/closed
     */
    toggle(e) {
        e.stopPropagation();
        
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    /**
     * Open the dropdown
     */
    open() {
        if (this.isOpen) return;
        
        // Close any other open dropdowns
        document.querySelectorAll('.dropdown.is-open').forEach(dropdown => {
            if (dropdown !== this.dropdown) {
                const instance = dropdown._dropdownInstance;
                if (instance) instance.close();
            }
        });
        
        this.isOpen = true;
        this.dropdown.classList.add('is-open');
        this.trigger.setAttribute('aria-expanded', 'true');
        
        // Reset focused index
        this.focusedIndex = this.selectedOption ? 
            this.options.indexOf(this.selectedOption) : -1;
        
        console.log('Dropdown opened:', this.dropdown.id);
    }
    
    /**
     * Close the dropdown
     */
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.dropdown.classList.remove('is-open');
        this.trigger.setAttribute('aria-expanded', 'false');
        
        // Clear focused state
        this.options.forEach(opt => opt.classList.remove('is-focused'));
        this.focusedIndex = -1;
        
        console.log('Dropdown closed:', this.dropdown.id);
    }
    
    /**
     * Select an option
     * @param {HTMLElement} option - The selected option element
     * @param {number} index - The index of the selected option
     */
    selectOption(option, index) {
        // Remove previous selection
        if (this.selectedOption) {
            this.selectedOption.classList.remove('is-selected');
            this.selectedOption.setAttribute('aria-selected', 'false');
        }
        
        // Set new selection
        this.selectedOption = option;
        this.selectedValue = option.dataset.value;
        
        // Update UI
        option.classList.add('is-selected');
        option.setAttribute('aria-selected', 'true');
        
        // Update trigger display
        const optionHTML = option.innerHTML;
        this.valueDisplay.innerHTML = optionHTML;
        this.valueDisplay.classList.remove('is-placeholder');
        
        // Close dropdown
        this.close();
        
        // Emit custom event
        const event = new CustomEvent('dropdown:select', {
            detail: {
                value: this.selectedValue,
                option: option,
                dropdown: this.dropdown
            }
        });
        this.dropdown.dispatchEvent(event);
        
        console.log('Option selected:', this.selectedValue);
    }
    
    /**
     * Handle clicks outside dropdown to close it
     * @param {Event} e - Click event
     */
    handleClickOutside(e) {
        if (!this.isOpen) return;
        
        // Check if click is outside dropdown
        if (!this.dropdown.contains(e.target)) {
            this.close();
        }
    }
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboard(e) {
        // Only handle when dropdown has focus or is open
        if (!this.isOpen && e.key !== 'Enter' && e.key !== ' ') return;
        
        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else if (this.focusedIndex >= 0) {
                    this.selectOption(this.options[this.focusedIndex], this.focusedIndex);
                }
                break;
                
            case 'Escape':
                e.preventDefault();
                this.close();
                this.trigger.focus();
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.focusNextOption();
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.focusPreviousOption();
                }
                break;
                
            case 'Home':
                e.preventDefault();
                if (this.isOpen) {
                    this.focusFirstOption();
                }
                break;
                
            case 'End':
                e.preventDefault();
                if (this.isOpen) {
                    this.focusLastOption();
                }
                break;
        }
    }
    
    /**
     * Focus next option in list
     */
    focusNextOption() {
        this.focusedIndex = Math.min(this.focusedIndex + 1, this.options.length - 1);
        this.updateFocusedOption();
    }
    
    /**
     * Focus previous option in list
     */
    focusPreviousOption() {
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        this.updateFocusedOption();
    }
    
    /**
     * Focus first option
     */
    focusFirstOption() {
        this.focusedIndex = 0;
        this.updateFocusedOption();
    }
    
    /**
     * Focus last option
     */
    focusLastOption() {
        this.focusedIndex = this.options.length - 1;
        this.updateFocusedOption();
    }
    
    /**
     * Update visual focus indicator
     */
    updateFocusedOption() {
        // Remove previous focus
        this.options.forEach(opt => opt.classList.remove('is-focused'));
        
        // Add focus to current option
        if (this.focusedIndex >= 0 && this.focusedIndex < this.options.length) {
            const focusedOption = this.options[this.focusedIndex];
            focusedOption.classList.add('is-focused');
            
            // Scroll into view if needed
            focusedOption.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Destroy the dropdown instance
     */
    destroy() {
        // Remove event listeners
        this.trigger.removeEventListener('click', this.toggle);
        this.dropdown.removeEventListener('keydown', this.handleKeyboard);
        document.removeEventListener('click', this.handleClickOutside);
        
        // Clear state
        this.isOpen = false;
        this.dropdown.classList.remove('is-open');
        
        console.log('Dropdown destroyed:', this.dropdown.id);
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize all dropdowns on the page
 */
function initDropdowns() {
    const dropdownElements = document.querySelectorAll('[data-dropdown]');
    
    dropdownElements.forEach(element => {
        const instance = new Dropdown(element);
        // Store instance reference on element for later access
        element._dropdownInstance = instance;
    });
    
    console.log(`Initialized ${dropdownElements.length} dropdown(s)`);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
} else {
    // DOM already loaded
    initDropdowns();
}

// ==========================================
// DEMO: Event Listeners
// ==========================================

// Listen for selection events (optional demo)
document.addEventListener('dropdown:select', (e) => {
    console.log('Dropdown selection event:', {
        dropdownId: e.detail.dropdown.id,
        selectedValue: e.detail.value
    });
});

console.log('Custom Dropdown - JavaScript loaded successfully');
