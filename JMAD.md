# JMAD: Jules-Maximized Agile Development

## Overview

JMAD (Jules-Maximized Agile Development) is a methodology that synergizes the planning capabilities of a specialized Google Gemini Gem (the "JMAD Gem") with the code execution and repository interaction strengths of Google Jules. This document provides instructions on how to create and utilize this workflow for both greenfield and brownfield projects.

The core idea is to use the JMAD Gem, configured with the `team-all.txt` prompt bundle from the BMad-METHOD project, to perform comprehensive project planning, requirements gathering, and architecture design. The JMAD Gem will be instructed on how to request information: either by asking Jules (via the user) to generate a report, or by asking the user directly for simpler queries. The output of this planning phase will be a detailed, step-by-step plan formatted specifically for Jules to execute.

## I. Creating and Configuring the JMAD Gem

This JMAD Gem will be your primary interface for planning and generating the execution plan for Jules.

1.  **Obtain `team-all.txt`**:
    *   Clone or download the `bmad-method` repository from [https://github.com/bmadcode/bmad-method](https://github.com/bmadcode/bmad-method). This is the original source for the agent prompts.
    *   Locate the file `dist/teams/team-all.txt`. This file contains the aggregated prompts for all BMad agents.

2.  **Create a New Google Gemini Gem**:
    *   Go to [Google Gems](https://gemini.google.com/gems/view) (or your Gemini Pro interface).
    *   Click on "Create new Gem."

3.  **Configure the Gem**:
    *   **Title**: `JMAD Gem for Jules Planning` (or a similar descriptive title).
    *   **Description**: "A specialized AI assistant for project planning and generating execution plans for Google Jules. It uses the BMad-METHOD's `team-all.txt` as a base and is instructed on how to request codebase analysis: either via Jules reports or direct user input."
    *   **Instructions / Prompt Configuration**:
        *   Copy the entire content of `dist/teams/team-all.txt`.
        *   Paste this content into the Gem's instruction/configuration field.
        *   **Crucially, *append* the following instructions to the *end* of the `team-all.txt` content within the Gem configuration. Do not replace the existing `team-all.txt` content; add this as additional instructions:**

        ```text
        --- JMAD AUGMENTATION ---

        **Your Core Objective as JMAD Gem for Jules Planning:**
        Your primary goal is to produce a detailed, step-by-step execution plan that Google Jules can implement. This plan will be the final output of your interaction with the user for a given development task (Epic or Story).

        **Leveraging Jules and User for Codebase Interaction:**
        You do NOT have direct access to the user's codebase. Google Jules DOES. You also have the user who can directly inspect code.

        **Information Gathering Strategy (to conserve Jules' daily task limits):**
        1.  **For Extensive Analysis/Multiple Files:** If you need a comprehensive report, analysis of multiple files, or complex data extracted from the codebase, instruct the user to ask Jules to perform the necessary actions (e.g., `read_files`, `ls`, `grep`) and then consolidate this information into a new markdown report file. Specify the filename and location, e.g., `docs/jules_reports/report_YYYYMMDD_HHMMSS_task_description.md`. The user will then confirm to you once Jules has created the report, and you can then ask the user to provide you with the content of that report.
            *   Example: "To analyze the current authentication flow, please ask Jules to read `auth/views.py`, `auth/forms.py`, and `users/models.py`, and then create a report named `docs/jules_reports/auth_flow_analysis_YYYYMMDD.md` summarizing the key functions, models, and their interactions. Once done, please provide me with the content of that report."

        2.  **For Simple Queries (1-2 files or quick checks):** If you only need the content of one or two specific files, or a very simple check, you can ask the user to provide this information directly. The user can copy-paste the content or describe the finding.
            *   Example: "Please provide the content of `src/utils/helpers.py`."
            *   Example: "Can you quickly check if the `DEBUG` flag is set to `True` in `settings.py` and tell me?"

        3.  **Relaying Information:** In both cases, the user is responsible for relaying the requested information (either the content of the Jules-generated report or the direct information) back to you. Ensure you receive the *complete* relevant output.

        **Formatting Instructions for Jules (when Jules is involved):**
        When you need Jules to perform a task (either for direct output or for report generation), clearly state this. For example:
        *   "To understand the current structure (for report generation), please ask Jules to: `ls('src/components/')`"
        *   "To verify the existing function signature (for direct user feedback), please ask Jules to read the file `src/utils/auth.py` and look for the `authenticate_user` function. Then, tell me what you find."

        **Plan Output Format for Jules:**
        The final plan you generate for Jules MUST be structured as a series of numbered steps. Each step should be actionable and clear. Use Markdown for formatting. If a step involves code changes, provide the file path and use git-flavored diffs or specify exactly what code to add/modify.

        Example of a Jules Plan Snippet:
        1. *Read the `README.md` file to understand the project overview.*
           Ask Jules: `read_files(['README.md'])`
        2. *Create a new file `src/new_module.py` with the following content:*
           Ask Jules:
           ```
           create_file_with_block
           src/new_module.py
           # Initial content for new_module.py
           def hello_world():
               print("Hello from new_module!")
           ```
        3. *Modify the `main.py` file to import and call the new function.*
           Ask Jules:
           ```
           replace_with_git_merge_diff
           main.py
           <<<<<<< SEARCH
           # End of current imports
           =======
           # End of current imports
           from src.new_module import hello_world
           >>>>>>> REPLACE
           ```
           ```
           replace_with_git_merge_diff
           main.py
           <<<<<<< SEARCH
           if __name__ == "__main__":
               print("Starting application...")
           =======
           if __name__ == "__main__":
               print("Starting application...")
               hello_world()
           >>>>>>> REPLACE
           ```
        4. *Install necessary dependencies.*
           Ask Jules:
           ```
           run_in_bash_session
           pip install flask-jwt-extended
           ```

        **Interaction Flow (General):**
        1.  The user will present a high-level goal.
        2.  You will use the BMad agent personas (PM, Architect, Analyst, etc.) from your base instructions to break this down, ask clarifying questions, and formulate a strategy.
        3.  If codebase information is needed, use the "Information Gathering Strategy" above. The user will then provide the requested information (either directly or by relaying a Jules-generated report).
        4.  Iterate on the plan based on new information.
        5.  Once the plan is robust, provide the complete, numbered, Jules-executable plan.

        **Emphasis on Jules' Role:**
        Remember, Jules is the "hands" that interact with the code when complex operations or file manipulations are needed. Your role is the "brain" that, with the user's help in relaying information, directs those hands. For simple information retrieval, the user can act as your direct informant. Do not generate code directly unless it's part of the final, formatted plan for Jules. Focus on high-level design, task breakdown, and instructing Jules or the user.
        ```

4.  **Save the Gem.**

## II. JMAD Workflow: Greenfield Projects

For projects starting from scratch.

1.  **Initiate Planning with the JMAD Gem**:
    *   Open your configured JMAD Gem.
    *   Start with a high-level project description. Example:
        `"We are starting a new Python Flask application for a blog. It needs user registration, login, post creation, and post viewing. Guide me through planning and generate a Jules execution plan."`
    *   The Gem will likely activate its PM and Architect personas.

2.  **Collaborative Planning & Design**:
    *   Engage with the Gem's personas (PM, Architect, UX Expert, etc.) to define requirements (PRD), system architecture, and user stories.
    *   The Gem will guide you through creating necessary documents (conceptually). The key output is the *Jules plan*.

3.  **Leverage Jules for Setup Diagnostics (if needed)**:
    *   Although greenfield, you might have questions about the initial environment or want to set up a specific structure.
    *   Example: If the Gem suggests a directory structure:
        *   JMAD Gem: `"Let's start with a standard Flask structure. User, please ask Jules to create the following directories using appropriate commands: 'app/', 'app/templates/', 'app/static/', 'tests/'."` (Jules would then need specific `create_file_with_block` or `run_in_bash_session mkdir` commands for this).

4.  **Iterative Plan Generation**:
    *   The Gem will break down the project into epics and stories. For each, it will generate a detailed plan.
    *   The Gem will ask clarifying questions. If information about the (emerging) codebase is needed, it will instruct you according to the "Information Gathering Strategy" (e.g., ask user directly for simple file content, or ask user to have Jules generate a report for more complex states).

5.  **Receive the Jules Execution Plan**:
    *   Once a significant chunk of planning is done (e.g., for an initial epic or a set of core stories), the JMAD Gem will provide a numbered, step-by-step plan formatted for Jules.

6.  **Execute with Jules**:
    *   Take the plan generated by the JMAD Gem.
    *   In your Jules interface, provide the instructions step-by-step or in logical chunks.
    *   Provide feedback to Jules if steps fail or need adjustment.

7.  **Feedback Loop (Optional but Recommended)**:
    *   If Jules encounters issues or if the execution reveals flaws in the plan, take this feedback (including any error messages from Jules) back to the JMAD Gem.
    *   Example: `"Jules had an issue with step 4 because library X was not installed. The error was 'ModuleNotFoundError: No module named X'. Can we update the plan to include installing library X?"`
    *   The JMAD Gem will then revise the plan.

## III. JMAD Workflow: Brownfield Projects

For working on existing codebases.

1.  **Initiate Planning with the JMAD Gem**:
    *   Open your configured JMAD Gem.
    *   Clearly state the goal and that it's a brownfield project. Provide context. Example:
        `"We need to add a two-factor authentication feature to our existing Django e-commerce site. The user model is in 'users/models.py'. I need a plan for Jules to implement this."`

2.  **Initial Codebase Analysis (Crucial Step)**:
    *   The JMAD Gem (likely using its Analyst or Architect persona) will immediately recognize the need to understand the existing codebase.
    *   **This is where Jules and/or direct user input are first heavily involved.**
    *   JMAD Gem Example (requesting a Jules report): `"To start, I need a comprehensive overview of your current authentication setup. Please ask Jules to read 'users/models.py', 'settings.py' (focus on AUTHENTICATION_BACKENDS, MIDDLEWARE), relevant files in 'auth/' (like views, urls), and then generate a report at 'docs/jules_reports/initial_auth_analysis_YYYYMMDD.md' summarizing these. Then, provide me with the content of that report."`
    *   JMAD Gem Example (requesting direct user input for fewer files): `"To start, please provide me with the content of 'users/models.py' and the AUTHENTICATION_BACKENDS section from 'settings.py'."`
    *   You: Follow the Gem's instructions, using Jules or direct copy-pasting as appropriate.
    *   You: Relay the **complete requested information** back to the JMAD Gem for analysis.

3.  **Iterative Analysis and Planning**:
    *   The JMAD Gem will analyze the provided information.
    *   It will ask further questions, again using the "Information Gathering Strategy." Examples:
        *   JMAD Gem (direct query): `"Thanks. Can you quickly grep for all usages of the 'login' function in your auth app and tell me the file and line numbers?"`
        *   JMAD Gem (Jules report): `"To understand the data flow, please ask Jules to trace calls to 'process_payment' and generate a sequence diagram in 'docs/jules_reports/payment_flow_YYYYMMDD.md'. Then, provide the report content."`
    *   This cycle of the JMAD Gem requesting information, and you providing it (via Jules-generated reports or directly), is key.

4.  **Impact Assessment and Design**:
    *   Using the codebase information, the JMAD Gem's Architect and Dev personas will design the new feature.
    *   JMAD Gem: `"Based on the report, it seems we'll need to modify the User model. To confirm, please provide the exact current User model definition from 'users/models.py'."`

5.  **Receive the Jules Execution Plan**:
    *   Once the analysis and design are robust, the JMAD Gem will provide a detailed, step-by-step plan formatted for Jules.

6.  **Execute with Jules**:
    *   Take the plan to Jules and execute it.

7.  **Feedback and Refinement**:
    *   As with greenfield projects, if Jules encounters issues, feed this **detailed feedback and any error messages** back to the JMAD Gem for plan refinement.
    *   JMAD Gem: `"Jules reported a circular dependency. The error was: 'ImportError: cannot import name X'. Let's re-evaluate. Ask Jules to generate a report of current imports in 'users/models.py' and 'orders/models.py' at 'docs/jules_reports/import_analysis_YYYYMMDD.md'. Then provide it to me."`

## IV. Key Principles for Effective JMAD

*   **Clear Roles**: JMAD Gem is the planner/strategist. Jules is the executor/codebase interactor for complex tasks. You are the vital human link, information provider, and verifier.
*   **Strategic Information Gathering**: The JMAD Gem should balance asking Jules to create reports (for complexity) with asking the user directly (for simplicity/speed and to manage Jules' limits).
*   **Explicit Instructions**: The JMAD Gem must be precise. The user must accurately convey instructions and relay complete information.
*   **Provide Full Context to Gem**: Whether it's a Jules-generated report or direct info, provide the JMAD Gem with complete and accurate data.
*   **Iterative Refinement**: Planning evolves. Expect back-and-forth.
*   **Detailed Jules Plans**: Specific plans from the JMAD Gem lead to better Jules execution.
*   **Leverage BMad Personas**: Encourage the Gem to use its BMad-based personas (PM, Architect, etc.) for comprehensive planning.
*   **User as Verifier**: Always review JMAD Gem plans before Jules executes them.

By following this JMAD workflow, you can harness the broad planning capabilities of the JMAD Gem and the direct code manipulation power of Jules for a highly effective AI-assisted development process.
```
