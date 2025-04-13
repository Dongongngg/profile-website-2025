// Update time display
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  const timeString = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  document.querySelector('.date-time').textContent = timeString;
};

// Initial time update
updateTime();
// Update time every second
setInterval(updateTime, 1000);

const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const terminal = document.querySelector('.terminal');
const terminalHeader = document.querySelector('.terminal-header');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

// Drag functionality
terminalHeader.addEventListener('mousedown', (e) => {
  if (e.target === terminalHeader || e.target.parentNode === terminalHeader) {
    isDragging = true;
    const rect = terminal.getBoundingClientRect();
    initialX = e.clientX - rect.left;
    initialY = e.clientY - rect.top;
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    terminal.style.left = `${currentX}px`;
    terminal.style.top = `${currentY}px`;
    terminal.style.transform = 'none';
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Add typewriter effect function
const typeText = async (element, text, speed = 1) => {
  for (const char of text) {
    element.innerHTML += char;
    // Ensure input field maintains focus
    inputElement.focus();
    // Move cursor to end of text
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    // Choose different scroll behavior based on device type
    if (window.innerWidth <= 768) {
      const terminalOutput = document.querySelector('.terminal-output');
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    } else {
      element.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

// Add scroll event listener
const terminalOutput = document.querySelector('.terminal-output');
terminalOutput.addEventListener('scroll', () => {
  inputElement.focus();
});

// Add click event listener
terminalOutput.addEventListener('click', () => {
  inputElement.focus();
});

const commands = {
  help: `
Available commands:
▹ help    - Show available commands
▹ exp     - Show work experience
▹ stack   - Show tech stack
▹ contact - Show contact information`,
  exp: `
[Work Experience]

Senior Full-Stack Engineer @ Forexco (Contract)
▹ Architected and optimized AWS infrastructure for B2B treasury and FX platforms, maintaining 99.9% uptime
▹ Led technical support and continuous improvement initiatives across legacy systems
▹ Implemented performance optimizations reducing response times by 40% across core services

Head of Development @ Prime Treasury (Full-Time)
▹ Led development of enterprise treasury platform processing $100M+ annual transactions
▹ Built and mentored an engineering team of 4, implementing robust CI/CD practices
▹ Designed microservice architecture handling 200+ users and 10+ enterprise clients
▹ Automated 80% of treasury operations through API integrations and workflow automation
▹ Established scalable development practices aligned with business objectives

Full-Stack Developer @ Forexco (Full-Time)
▹ Delivered 50+ features using React and TypeScript with comprehensive test coverage
▹ Optimized backend services achieving sub-200ms response times across critical APIs
▹ Enhanced FX analytics dashboard improving data processing efficiency by 60%
▹ Developed automated reporting suite reducing manual workload by 80%

Full-Stack Developer @ Ishare Incubator (Internship)
▹ Engineered responsive React.js interfaces implementing complex business logic
▹ Designed and developed Node.js REST APIs with 95% test coverage`,
  stack: `
[Technical Stack]

Frontend Development
▹ TypeScript/JavaScript
▹ React
▹ Next.js

UI & Design
▹ Material-UI (MUI)
▹ Tailwind CSS
▹ Responsive Design

Backend Development
▹ Node.js
▹ Nest.js
▹ Express.js

Microservices & Architecture
▹ Docker & Containerization
▹ Message Queues (RabbitMQ, SQS)
▹ Microservices Architecture
▹ Event-Driven Design

API Development
▹ RESTful APIs
▹ GraphQL
▹ gRPC
▹ API Gateway

Database & Caching
▹ MySQL
▹ MongoDB
▹ Redis
▹ Database Optimization

Cloud & DevOps
▹ AWS (EC2, S3, Lambda, ECS)
▹ CI/CD (CodePipeline, GitHub Actions)
▹ Infrastructure as Code (CDK)
▹ Monitoring & Logging (CloudWatch)
▹ Security & Compliance`,
  contact: `
[Contact Information]

▹ Email: james.dong.dev@gmail.com
▹ Location: Sydney, Australia
▹ Mobile: 0415767286
▹ LinkedIn: https://www.linkedin.com/in/jingfu-dong-james/

I am currently open to new opportunities and collaborations. Let's connect and build something amazing together!`,
  cd: 'this is fake terminal :)',
  ls: 'this is fake terminal :)',
  rm: 'this is fake terminal :)',
  mkdir: 'this is fake terminal :)',
  clear: '\n',
};

inputElement.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const input = inputElement.value.trim();
    if (input) {
      // Disable input field to prevent typing during animation
      inputElement.disabled = true;

      await typeText(outputElement, `\n$ ${input}\n`);

      if (commands[input] !== undefined) {
        if (input === 'clear') {
          // Save welcome text and ASCII art
          const welcomeSection = document.querySelector('.welcome-section');
          const asciiArt = document.querySelector('.ascii-art');
          const mobileTitle = document.querySelector('.mobile-title');
          outputElement.innerHTML = '';
          // Re-add welcome text and ASCII art
          outputElement.appendChild(asciiArt);
          if (mobileTitle) {
            outputElement.appendChild(mobileTitle);
          }
          outputElement.appendChild(welcomeSection);
        } else {
          await typeText(outputElement, commands[input]);
        }
      } else {
        await typeText(outputElement, `Command not found: ${input}\n`);
      }

      // Clear input field and re-enable it
      inputElement.value = '';
      inputElement.disabled = false;
      inputElement.focus();
    }
  }
});

// Ensure input field gets focus when page loads
window.addEventListener('load', () => {
  inputElement.focus();
});

// Keep input field focused when clicking terminal
document.querySelector('.terminal').addEventListener('click', () => {
  inputElement.focus();
});

// Obfuscate email address
document.getElementById('email').innerHTML = '<a href="mailto:james.dong.dev@gmail.com">james.dong.dev@gmail.com</a>';

// Modify focus handling logic
const handleFocus = () => {
  inputElement.focus();
  // Choose different scroll behavior based on device type
  if (window.innerWidth <= 768) {
    const terminalOutput = document.querySelector('.terminal-output');
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
};

// Add event listeners
window.addEventListener('load', handleFocus);
document.addEventListener('touchstart', handleFocus);
document.addEventListener('click', handleFocus);
document.addEventListener('scroll', handleFocus);
document.addEventListener('touchend', handleFocus);

// Ensure input field maintains focus on mobile devices
inputElement.addEventListener('blur', handleFocus);

// Add touch event handling
document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  handleFocus();
});
