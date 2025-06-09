# Interactive Documentation Examples

This document provides interactive examples and components that enhance the BMAD Method documentation experience.

## Interactive Workflow Visualizer

<div class="workflow-visualizer">
  <div class="workflow-header">
    <h3>BMAD Method Workflow</h3>
    <div class="workflow-controls">
      <button class="btn-play" onclick="startWorkflow()"> Start</button>
      <button class="btn-reset" onclick="resetWorkflow()"> Reset</button>
    </div>
  </div>
  
  <div class="workflow-canvas">
    <div class="workflow-step" id="step-1" data-step="requirements">
      <div class="step-icon"></div>
      <div class="step-title">Requirements</div>
      <div class="step-persona">Product Owner</div>
    </div>
    
    <div class="workflow-arrow" id="arrow-1"></div>
    
    <div class="workflow-step" id="step-2" data-step="architecture">
      <div class="step-icon"></div>
      <div class="step-title">Architecture</div>
      <div class="step-persona">System Architect</div>
    </div>
    
    <div class="workflow-arrow" id="arrow-2"></div>
    
    <div class="workflow-step" id="step-3" data-step="design">
      <div class="step-icon"></div>
      <div class="step-title">Design</div>
      <div class="step-persona">UX/UI Designer</div>
    </div>
    
    <div class="workflow-arrow" id="arrow-3"></div>
    
    <div class="workflow-step" id="step-4" data-step="implementation">
      <div class="step-icon"></div>
      <div class="step-title">Implementation</div>
      <div class="step-persona">Developer</div>
    </div>
  </div>
  
  <div class="workflow-details" id="workflow-details">
    <div class="detail-panel" id="detail-requirements">
      <h4>Requirements Phase</h4>
      <p>Product Owner defines project scope, user stories, and acceptance criteria.</p>
      <ul>
        <li>Stakeholder interviews</li>
        <li>User story creation</li>
        <li>Acceptance criteria definition</li>
      </ul>
    </div>
    
    <div class="detail-panel" id="detail-architecture">
      <h4>Architecture Phase</h4>
      <p>System Architect designs technical approach and system structure.</p>
      <ul>
        <li>Technology selection</li>
        <li>System design</li>
        <li>Integration planning</li>
      </ul>
    </div>
    
    <div class="detail-panel" id="detail-design">
      <h4>Design Phase</h4>
      <p>UX/UI Designer creates user experience and interface specifications.</p>
      <ul>
        <li>User experience design</li>
        <li>Interface mockups</li>
        <li>Design system components</li>
      </ul>
    </div>
    
    <div class="detail-panel" id="detail-implementation">
      <h4>Implementation Phase</h4>
      <p>Developer builds the solution according to specifications.</p>
      <ul>
        <li>Code implementation</li>
        <li>Testing and validation</li>
        <li>Documentation</li>
      </ul>
    </div>
  </div>
</div>

<script>
function startWorkflow() {
  const steps = document.querySelectorAll('.workflow-step');
  const arrows = document.querySelectorAll('.workflow-arrow');
  
  steps.forEach(step => step.classList.remove('active', 'completed'));
  arrows.forEach(arrow => arrow.classList.remove('active'));
  
  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep > 0) {
      steps[currentStep - 1].classList.remove('active');
      steps[currentStep - 1].classList.add('completed');
      arrows[currentStep - 1].classList.add('active');
    }
    
    if (currentStep < steps.length) {
      steps[currentStep].classList.add('active');
      showStepDetails(steps[currentStep].dataset.step);
      currentStep++;
    } else {
      clearInterval(interval);
    }
  }, 2000);
}

function resetWorkflow() {
  const steps = document.querySelectorAll('.workflow-step');
  const arrows = document.querySelectorAll('.workflow-arrow');
  
  steps.forEach(step => step.classList.remove('active', 'completed'));
  arrows.forEach(arrow => arrow.classList.remove('active'));
  
  document.getElementById('workflow-details').style.display = 'none';
}

function showStepDetails(stepName) {
  const detailsContainer = document.getElementById('workflow-details');
  const panels = document.querySelectorAll('.detail-panel');
  
  panels.forEach(panel => panel.style.display = 'none');
  document.getElementById(`detail-${stepName}`).style.display = 'block';
  detailsContainer.style.display = 'block';
}
</script>

<style>
.workflow-visualizer {
  border: 1px solid var(--bmad-gray-200);
  border-radius: 8px;
  padding: var(--space-6);
  margin: var(--space-6) 0;
  background: white;
}

.workflow-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.workflow-controls button {
  margin-left: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: 4px;
  background: var(--bmad-primary);
  color: white;
  cursor: pointer;
}

.workflow-canvas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.workflow-step {
  text-align: center;
  padding: var(--space-4);
  border: 2px solid var(--bmad-gray-300);
  border-radius: 8px;
  background: var(--bmad-gray-50);
  transition: all 0.3s ease;
  min-width: 120px;
}

.workflow-step.active {
  border-color: var(--bmad-primary);
  background: var(--bmad-primary);
  color: white;
  transform: scale(1.05);
}

.workflow-step.completed {
  border-color: var(--bmad-success);
  background: var(--bmad-success);
  color: white;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: var(--space-2);
}

.step-title {
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.step-persona {
  font-size: 0.875rem;
  opacity: 0.8;
}

.workflow-arrow {
  width: 40px;
  height: 2px;
  background: var(--bmad-gray-300);
  position: relative;
  transition: background-color 0.3s ease;
}

.workflow-arrow.active {
  background: var(--bmad-success);
}

.workflow-arrow::after {
  content: '';
  position: absolute;
  right: -6px;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 8px solid var(--bmad-gray-300);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transition: border-left-color 0.3s ease;
}

.workflow-arrow.active::after {
  border-left-color: var(--bmad-success);
}

.workflow-details {
  display: none;
  background: var(--bmad-gray-50);
  border-radius: 6px;
  padding: var(--space-4);
}

.detail-panel {
  display: none;
}

.detail-panel h4 {
  color: var(--bmad-primary);
  margin-bottom: var(--space-2);
}

.detail-panel ul {
  margin-left: var(--space-4);
}
</style>

## Persona Comparison Tool

<div class="persona-comparison">
  <div class="comparison-header">
    <h3>Compare BMAD Personas</h3>
    <p>Select personas to compare their roles, expertise, and deliverables</p>
  </div>
  
  <div class="persona-selector-grid">
    <label class="persona-checkbox">
      <input type="checkbox" value="pm" onchange="updateComparison()">
      <div class="persona-card">
        <div class="persona-icon"></div>
        <div class="persona-name">Project Manager</div>
      </div>
    </label>
    
    <label class="persona-checkbox">
      <input type="checkbox" value="architect" onchange="updateComparison()">
      <div class="persona-card">
        <div class="persona-icon"></div>
        <div class="persona-name">System Architect</div>
      </div>
    </label>
    
    <label class="persona-checkbox">
      <input type="checkbox" value="ux-ui" onchange="updateComparison()">
      <div class="persona-card">
        <div class="persona-icon"></div>
        <div class="persona-name">UX/UI Designer</div>
      </div>
    </label>
    
    <label class="persona-checkbox">
      <input type="checkbox" value="developer" onchange="updateComparison()">
      <div class="persona-card">
        <div class="persona-icon"></div>
        <div class="persona-name">Developer</div>
      </div>
    </label>
  </div>
  
  <div class="comparison-table" id="comparison-table" style="display: none;">
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th class="persona-column" data-persona="pm">Project Manager</th>
          <th class="persona-column" data-persona="architect">System Architect</th>
          <th class="persona-column" data-persona="ux-ui">UX/UI Designer</th>
          <th class="persona-column" data-persona="developer">Developer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Primary Focus</strong></td>
          <td class="persona-cell" data-persona="pm">Project coordination and delivery</td>
          <td class="persona-cell" data-persona="architect">Technical architecture and design</td>
          <td class="persona-cell" data-persona="ux-ui">User experience and interface</td>
          <td class="persona-cell" data-persona="developer">Code implementation and quality</td>
        </tr>
        <tr>
          <td><strong>Key Deliverables</strong></td>
          <td class="persona-cell" data-persona="pm">PRDs, project plans, status reports</td>
          <td class="persona-cell" data-persona="architect">Architecture docs, technical specs</td>
          <td class="persona-cell" data-persona="ux-ui">Wireframes, prototypes, design systems</td>
          <td class="persona-cell" data-persona="developer">Code, tests, documentation</td>
        </tr>
        <tr>
          <td><strong>Expertise Areas</strong></td>
          <td class="persona-cell" data-persona="pm">Planning, stakeholder management</td>
          <td class="persona-cell" data-persona="architect">System design, technology selection</td>
          <td class="persona-cell" data-persona="ux-ui">User research, visual design</td>
          <td class="persona-cell" data-persona="developer">Programming, testing, optimization</td>
        </tr>
        <tr>
          <td><strong>Typical Timeline</strong></td>
          <td class="persona-cell" data-persona="pm">Throughout project lifecycle</td>
          <td class="persona-cell" data-persona="architect">Early planning and design phases</td>
          <td class="persona-cell" data-persona="ux-ui">Design and early development</td>
          <td class="persona-cell" data-persona="developer">Implementation and testing phases</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<script>
const personaData = {
  pm: { name: 'Project Manager', icon: '' },
  architect: { name: 'System Architect', icon: '' },
  'ux-ui': { name: 'UX/UI Designer', icon: '' },
  developer: { name: 'Developer', icon: '' }
};

function updateComparison() {
  const checkboxes = document.querySelectorAll('.persona-checkbox input[type="checkbox"]');
  const selectedPersonas = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  
  const table = document.getElementById('comparison-table');
  const columns = document.querySelectorAll('.persona-column');
  const cells = document.querySelectorAll('.persona-cell');
  
  if (selectedPersonas.length === 0) {
    table.style.display = 'none';
    return;
  }
  
  table.style.display = 'block';
  
  // Show/hide columns based on selection
  columns.forEach(column => {
    const persona = column.dataset.persona;
    column.style.display = selectedPersonas.includes(persona) ? 'table-cell' : 'none';
  });
  
  cells.forEach(cell => {
    const persona = cell.dataset.persona;
    cell.style.display = selectedPersonas.includes(persona) ? 'table-cell' : 'none';
  });
}
</script>

<style>
.persona-comparison {
  border: 1px solid var(--bmad-gray-200);
  border-radius: 8px;
  padding: var(--space-6);
  margin: var(--space-6) 0;
  background: white;
}

.comparison-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.persona-selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.persona-checkbox {
  cursor: pointer;
}

.persona-checkbox input[type="checkbox"] {
  display: none;
}

.persona-card {
  border: 2px solid var(--bmad-gray-300);
  border-radius: 8px;
  padding: var(--space-4);
  text-align: center;
  transition: all 0.2s ease;
  background: white;
}

.persona-checkbox input[type="checkbox"]:checked + .persona-card {
  border-color: var(--bmad-primary);
  background: var(--bmad-primary);
  color: white;
}

.persona-icon {
  font-size: 2rem;
  margin-bottom: var(--space-2);
}

.persona-name {
  font-weight: 600;
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comparison-table th,
.comparison-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--bmad-gray-200);
}

.comparison-table th {
  background: var(--bmad-gray-50);
  font-weight: 600;
  color: var(--bmad-gray-900);
}

.comparison-table tr:hover {
  background: var(--bmad-gray-50);
}
</style>

## Progress Tracking Component

<div class="progress-tracker">
  <div class="tracker-header">
    <h3>Sprint Progress Tracker</h3>
    <div class="progress-summary">
      <span class="progress-text">Sprint 2 Progress</span>
      <span class="progress-percentage">85%</span>
    </div>
  </div>
  
  <div class="progress-bar">
    <div class="progress-fill" style="width: 85%"></div>
  </div>
  
  <div class="story-list">
    <div class="story-item completed">
      <div class="story-status"></div>
      <div class="story-content">
        <div class="story-title">Story 2.1: "How It Works" Documentation</div>
        <div class="story-points">13 points</div>
      </div>
    </div>
    
    <div class="story-item completed">
      <div class="story-status"></div>
      <div class="story-content">
        <div class="story-title">Story 2.2: System Architecture Diagrams</div>
        <div class="story-points">8 points</div>
      </div>
    </div>
    
    <div class="story-item completed">
      <div class="story-status"></div>
      <div class="story-content">
        <div class="story-title">Story 2.3: User Journey Documentation</div>
        <div class="story-points">8 points</div>
      </div>
    </div>
    
    <div class="story-item in-progress">
      <div class="story-status"></div>
      <div class="story-content">
        <div class="story-title">Story 2.4: Visual Documentation Elements</div>
        <div class="story-points">5 points</div>
      </div>
    </div>
  </div>
  
  <div class="tracker-footer">
    <div class="velocity-info">
      <span>Team Velocity: 34 points/sprint</span>
      <span>Completed: 29/34 points</span>
    </div>
  </div>
</div>

<style>
.progress-tracker {
  border: 1px solid var(--bmad-gray-200);
  border-radius: 8px;
  padding: var(--space-6);
  margin: var(--space-6) 0;
  background: white;
}

.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.progress-summary {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.progress-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--bmad-primary);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bmad-gray-200);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--space-6);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--bmad-primary), var(--bmad-success));
  transition: width 0.3s ease;
}

.story-list {
  space-y: var(--space-3);
}

.story-item {
  display: flex;
  align-items: center;
  padding: var(--space-3);
  border-radius: 6px;
  margin-bottom: var(--space-2);
}

.story-item.completed {
  background: var(--bmad-gray-50);
  border-left: 4px solid var(--bmad-success);
}

.story-item.in-progress {
  background: var(--bmad-gray-50);
  border-left: 4px solid var(--bmad-primary);
}

.story-status {
  font-size: 1.25rem;
  margin-right: var(--space-3);
}

.story-content {
  flex: 1;
}

.story-title {
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.story-points {
  font-size: 0.875rem;
  color: var(--bmad-gray-600);
}

.tracker-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--bmad-gray-200);
}

.velocity-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--bmad-gray-600);
}
</style>

*These interactive examples demonstrate how visual elements can enhance understanding and engagement with BMAD Method documentation.*
