# BMad Expansion Pack: Google Cloud Vertex AI Agent System

[](https://opensource.org/licenses/MIT)
[](https://www.google.com/search?q=https://github.com/antmikinka/BMAD-METHOD)
[](https://cloud.google.com/)

This expansion pack provides a complete, deployable starter kit for building and hosting sophisticated AI agent systems on Google Cloud Platform (GCP). It bridges the gap between the BMad Method's natural language framework and a production-ready cloud environment, leveraging Google Vertex AI, Cloud Run, and the Google Agent Development Kit (ADK).

## Features

- **Automated GCP Setup**: `gcloud` scripts to configure your project, service accounts, and required APIs in minutes.
- **Production-Ready Deployment**: Includes a `Dockerfile` and `cloudbuild.yaml` for easy, repeatable deployments to Google Cloud Run.
- **Rich Template Library**: A comprehensive set of BMad-compatible templates for Teams, Agents, Tasks, Workflows, Documents, and Checklists.
- **Pre-configured Agent Roles**: Includes powerful master templates for key agent archetypes like Orchestrators and Specialists.
- **Highly Customizable**: Easily adapt the entire system with company-specific variables and industry-specific configurations.
- **Powered by Google ADK**: Built on the official Google Agent Development Kit for robust and native integration with Vertex AI services.

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- A Google Cloud Platform (GCP) Account with an active billing account.
- The [Google Cloud SDK (`gcloud` CLI)](<https://www.google.com/search?q=%5Bhttps://cloud.google.com/sdk/docs/install%5D(https://cloud.google.com/sdk/docs/install)>) installed and authenticated.
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your local machine.
- Python 3.11+

## Quick Start Guide

Follow these steps to get your own AI agent system running on Google Cloud.

### 1\. Configure Setup Variables

The setup scripts use placeholder variables. Before running them, open the files in the `/scripts` directory and replace the following placeholders with your own values:

- `{{PROJECT_ID}}`: Your unique Google Cloud project ID.
- `{{COMPANY_NAME}}`: Your company or project name (used for naming resources).
- `{{LOCATION}}`: The GCP region you want to deploy to (e.g., `us-central1`).

### 2\. Run the GCP Setup Scripts

Execute the setup scripts to prepare your Google Cloud environment.

```bash
# Navigate to the scripts directory
cd scripts/

# Run the project configuration script
sh 1-initial-project-config.sh

# Run the service account setup script
sh 2-service-account-setup.sh
```

These scripts will enable the necessary APIs, create a service account, assign permissions, and download a JSON key file required for authentication.

### 3\. Install Python Dependencies

Install the required Python packages for the application.

```bash
# From the root of the expansion pack
pip install -r requirements.txt
```

### 4\. Deploy to Cloud Run

Deploy the entire agent system as a serverless application using Cloud Build.

```bash
# From the root of the expansion pack
gcloud builds submit --config deployment/cloudbuild.yaml .
```

This command will build the Docker container, push it to the Google Container Registry, and deploy it to Cloud Run. Your agent system is now live\!

## How to Use

Once deployed, the power of this system lies in its natural language templates.

1.  **Define Your Organization**: Go to `/templates/teams` and use the templates to define your agent teams (e.g., Product Development, Operations).
2.  **Customize Your Agents**: In `/templates/agents`, use the `Master-Agent-Template.yaml` to create new agents or customize the existing Orchestrator and Specialist templates. Define their personas, skills, and commands in plain English.
3.  **Build Your Workflows**: In `/templates/workflows`, link agents and tasks together to create complex, automated processes.

The deployed application reads these YAML and Markdown files to dynamically construct and run your AI workforce. When you update a template, your live agents automatically adopt the new behaviors.

## What's Included

This expansion pack has a comprehensive structure to get you started:

```
/
├── deployment/             # Dockerfile and cloudbuild.yaml for deployment
├── scripts/                # GCP setup scripts (project config, service accounts)
├── src/                    # Python source code (main.py, settings.py)
├── templates/
│   ├── agents/             # Master, Orchestrator, Specialist agent templates
│   ├── teams/              # Team structure templates
│   ├── tasks/              # Generic and specialized task templates
│   ├── documents/          # Document and report templates
│   ├── checklists/         # Quality validation checklists
│   ├── workflows/          # Workflow definition templates
│   └── ...and more
├── config/                 # Customization guides and variable files
└── requirements.txt        # Python package dependencies
```

## Contributing

Contributions are welcome\! Please follow the main project's `CONTRIBUTING.md` guidelines. For major changes or new features for this expansion pack, please open an issue or discussion first.
