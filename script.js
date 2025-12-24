// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation for Project Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        if (body.getAttribute('data-theme') === 'dark') {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        }
    } else {
        header.style.backgroundColor = 'var(--bg-primary)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic form validation
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (name.trim().length < 2) {
        showNotification('Please enter a valid name.', 'error');
        return;
    }
    
    if (message.trim().length < 10) {
        showNotification('Please enter a message with at least 10 characters.', 'error');
        return;
    }
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${name} via your website`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Opening your email client...', 'success');
    
    // Reset form after a short delay
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add loading animation to buttons on click
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit') {
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Floating Contact Button
const floatingContact = document.getElementById('floatingContact');
const floatingMenu = document.getElementById('floatingMenu');
let isMenuOpen = false;

floatingContact.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    floatingMenu.classList.toggle('active', isMenuOpen);
    
    // Rotate the button icon
    const icon = floatingContact.querySelector('.floating-icon');
    icon.style.transform = isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)';
});

// Close floating menu when clicking outside
document.addEventListener('click', (e) => {
    if (!floatingContact.contains(e.target) && !floatingMenu.contains(e.target)) {
        isMenuOpen = false;
        floatingMenu.classList.remove('active');
        const icon = floatingContact.querySelector('.floating-icon');
        icon.style.transform = 'rotate(0deg)';
    }
});

// Add click tracking for contact methods
document.querySelectorAll('.contact-method, .floating-option').forEach(link => {
    link.addEventListener('click', function() {
        const method = this.querySelector('h3')?.textContent || this.textContent.trim();
        console.log(`Contact method used: ${method}`);
        
        // Show a brief notification for non-email/phone actions
        if (this.href && (this.href.includes('calendly') || this.href.includes('linkedin') || this.href.includes('wa.me'))) {
            showNotification(`Opening ${method}...`, 'info');
        }
    });
});

// Chat Widget Functionality
const chatWidget = document.getElementById('chatWidget');
const openChatBtn = document.getElementById('openChat');
const openChatFloatBtn = document.getElementById('openChatFloat');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const quickReplies = document.getElementById('quickReplies');
const chatTyping = document.getElementById('chatTyping');

let isChatOpen = false;

// Open chat widget
function openChat() {
    isChatOpen = true;
    chatWidget.classList.add('active');
    chatInput.focus();
    
    // Close floating menu if open
    isMenuOpen = false;
    floatingMenu.classList.remove('active');
    const icon = floatingContact.querySelector('.floating-icon');
    icon.style.transform = 'rotate(0deg)';
}

// Close chat widget
function closeChat() {
    isChatOpen = false;
    chatWidget.classList.remove('active');
}

// Event listeners for opening chat
openChatBtn.addEventListener('click', openChat);
openChatFloatBtn.addEventListener('click', openChat);
chatClose.addEventListener('click', closeChat);

// Send message function
function sendMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : '👨‍💻';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    content.appendChild(messageText);
    content.appendChild(time);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

// Auto-reply function
function autoReply(userMessage) {
    // Show typing indicator
    chatTyping.style.display = 'flex';
    
    setTimeout(() => {
        chatTyping.style.display = 'none';
        
        let reply = '';
        const message = userMessage.toLowerCase();
        
        if (message.includes('project') || message.includes('work')) {
            reply = "That's great! I'd love to discuss your project. What kind of project are you working on? Feel free to share some details and I'll get back to you soon!";
        } else if (message.includes('hire') || message.includes('job')) {
            reply = "I'm always interested in new opportunities! Please tell me more about the position and your requirements. You can also email me directly for a detailed discussion.";
        } else if (message.includes('question') || message.includes('help')) {
            reply = "I'm here to help! What would you like to know? Whether it's about my experience, technologies I work with, or anything else - just ask!";
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            reply = "Hello! Nice to meet you! 😊 How can I help you today?";
        } else if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
            reply = "Pricing depends on the project scope and requirements. I'd be happy to provide a quote after learning more about your needs. Let's discuss your project!";
        } else {
            reply = "Thanks for your message! I'll get back to you as soon as possible. In the meantime, feel free to check out my projects or send me an email directly.";
        }
        
        sendMessage(reply, false);
        
        // Hide quick replies after first interaction
        if (quickReplies.style.display !== 'none') {
            setTimeout(() => {
                quickReplies.style.display = 'none';
            }, 2000);
        }
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

// Handle sending messages
function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        sendMessage(message, true);
        chatInput.value = '';
        chatSend.disabled = true;
        
        // Auto-reply after user message
        autoReply(message);
        
        setTimeout(() => {
            chatSend.disabled = false;
        }, 1000);
    }
}

// Event listeners for chat input
chatSend.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Handle quick replies
quickReplies.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply')) {
        const message = e.target.dataset.message;
        sendMessage(message, true);
        autoReply(message);
        quickReplies.style.display = 'none';
    }
});

// Enable/disable send button based on input
chatInput.addEventListener('input', () => {
    chatSend.disabled = chatInput.value.trim() === '';
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    if (isChatOpen && !chatWidget.contains(e.target) && 
        !openChatBtn.contains(e.target) && !openChatFloatBtn.contains(e.target)) {
        // Don't auto-close chat to prevent accidental closure
        // closeChat();
    }
});

// Initialize chat send button state
chatSend.disabled = true;