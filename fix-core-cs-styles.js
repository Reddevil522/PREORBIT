const fs = require('fs');
const path = require('path');

const subjects = ['oop', 'dbms', 'operating-system', 'computer-networks', 'sql'];

const newStyles = `.feature-card {
  display: flex;
  flex-direction: column;
  background: var(--surface, #ffffff);
  padding: 2rem;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border, #e5e7eb);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
  border-color: var(--primary, #10b981);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}

.theory-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.practice-icon {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.card-action {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-hover, #f3f4f6);
  color: var(--text-secondary, #6b7280);
  transition: all 0.2s ease;
}

.feature-card:hover .card-action {
  background: var(--primary, #10b981);
  color: white;
  transform: translateX(4px);
}

.card-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary, #111827);
}

.card-content p {
  margin: 0;
  color: var(--text-secondary, #6b7280);
  font-size: 0.9375rem;
  line-height: 1.5;
}

/* Animations */`;

subjects.forEach(subject => {
  const cssPath = path.join(__dirname, \`frontend/src/app/pages/core-cs/\${subject}/\${subject}.component.css\`);
  
  if (fs.existsSync(cssPath)) {
    let content = fs.readFileSync(cssPath, 'utf8');
    
    // Replace styles block
    content = content.replace(/\\.feature-card \\{[\\s\\S]*?\\/\\* Animations \\*\\//, newStyles);
    
    // Replace dark mode feature card
    content = content.replace(/:host-context\\(html\\.dark\\) \\.feature-card \\{[\\s\\S]*?\\}/, \`:host-context(html.dark) .feature-card {
  background: var(--surface, #1f2937);
  border-color: var(--border, #374151);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}\`);

    // Remove the hover overrides in dark mode since they are no longer needed
    content = content.replace(/:host-context\\(html\\.dark\\) \\.feature-card:hover \\{[\\s\\S]*?\\}/, '');
    content = content.replace(/:host-context\\(html\\.dark\\) \\.feature-card:hover \\.card-action \\{[\\s\\S]*?\\}/, '');
    
    // Clean up double blank lines
    content = content.replace(/\\n\\n\\n/g, '\\n\\n');

    fs.writeFileSync(cssPath, content);
    console.log(\`Updated \${subject}.component.css\`);
  } else {
    console.log(\`File not found: \${cssPath}\`);
  }
});
