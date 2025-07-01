# JMAD: Jules-Maximized Agile Development

## Overview

JMAD (Jules-Maximized Agile Development) is a methodology that synergizes the planning capabilities of a specialized Google Gemini Gem (the "BMad Gem") with the code execution and repository interaction strengths of Google Jules. This document provides instructions on how to create and utilize this workflow for both greenfield and brownfield projects.

The core idea is to use the BMad Gem, configured with the `team-all.txt` prompt bundle from the BMad-METHOD project, to perform comprehensive project planning, requirements gathering, and architecture design. The BMad Gem will be instructed to leverage Jules' ability to directly access and analyze the codebase for diagnostic tasks during the planning phase. The output of this planning phase will be a detailed, step-by-step plan formatted specifically for Jules to execute.

## I. Creating and Configuring the BMad Gem for JMAD

This BMad Gem will be your primary interface for planning and generating the execution plan for Jules.

1.  **Obtain `team-all.txt`**:
    *   Clone or download the `bmad-method` repository from [https://github.com/bmadcode/bmad-method](https://github.com/bmadcode/bmad-method).
    *   Locate the file `dist/teams/team-all.txt`. This file contains the aggregated prompts for all BMad agents.

2.  **Create a New Google Gemini Gem**:
    *   Go to [Google Gems](https://gemini.google.com/gems/view) (or your Gemini Pro interface).
    *   Click on "Create new Gem."

3.  **Configure the Gem**:
    *   **Title**: `BMad Gem for Jules Planning` (or a similar descriptive title).
    *   **Description**: "A specialized AI assistant for project planning and generating execution plans for Google Jules. It uses the BMad-METHOD's `team-all.txt` and is instructed to request codebase analysis from Jules via the user."
    *   **Instructions / Prompt Configuration**:
        *   Copy the entire content of `dist/teams/team-all.txt`.
        *   Paste this content into the Gem's instruction/configuration field.
        *   **Crucially, *append* the following instructions to the *end* of the `team-all.txt` content within the Gem configuration. Do not replace the existing `team-all.txt` content; add this as additional instructions:**

        ```text
        --- JMAD AUGMENTATION ---

        **Your Core Objective as BMad Gem for Jules Planning:**
        Your primary goal is to produce a detailed, step-by-step execution plan that Google Jules can implement. This plan will be the final output of your interaction with the user for a given development task (Epic or Story).

        **Leveraging Jules for Codebase Interaction:**
        You do NOT have direct access to the user's codebase. However, Google Jules DOES. During your planning, analysis, and problem-solving phases, if you need information from the codebase (e.g., to understand existing logic, identify relevant files, assess current state, list directory structures), you MUST instruct the user to ask Jules to perform these actions and relay the complete output back to you.

        **Formatting Instructions for Jules:**
        When you need Jules to perform a task, clearly state this. For example:
        *   "To understand the current structure, please ask Jules to: `ls('src/components/')`"
        *   "To verify the existing function signature, please ask Jules to read the file `src/utils/auth.py` and look for the `authenticate_user` function."
        *   "To assess the impact of this change, please ask Jules to grep for all occurrences of `OLD_API_ENDPOINT` in the codebase."

        **Plan Output Format for Jules:**
        The final plan you generate for Jules MUST be structured as a series of numbered steps. Each step should be actionable and clear. Use Markdown for formatting. If a step involves code changes, provide the file path and use git-flavored diffs or specify exactly what code to add/modify.

        Example of a Jules Plan Snippet:
        1. *Read the `README.md` file to understand the project overview.*
           Ask Jules: `read_files(['README.md'])`
        2. *Create a new file `src/new_module.py` with the following content:*
           Ask Jules:
           ~~~
           create_file_with_block
           src/new_module.py
           # Initial content for new_module.py
           def hello_world():
               print("Hello from new_module!")
           ~~~
        3. *Modify the `main.py` file to import and call the new function.*
           Ask Jules:
           ~~~
           replace_with_git_merge_diff
           main.py
           <<<<<<< SEARCH
           # End of current imports
           =======
           # End of current imports
           from src.new_module import hello_world
           >>>>>>> REPLACE
           ~~~
           ~~~
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
           ~~~
        4. *Install necessary dependencies.*
           Ask Jules:
           ~~~
           run_in_bash_session
           pip install flask-jwt-extended
           ~~~

        **Interaction Flow:**
        1.  The user will present a high-level goal (e.g., "Implement user authentication").
        2.  You will use the BMad agents (PM, Architect, Analyst, etc.) to break this down, ask clarifying questions, and formulate a strategy.
        3.  If codebase information is needed, explicitly instruct the user to get it via Jules. The user will then paste Jules' complete output back to you.
        4.  Iterate on the plan based on new information.
        5.  Once the plan is robust, provide the complete, numbered, Jules-executable plan.

        **Emphasis on Jules' Role:**
        Remember, Jules is the "hands" that interact with the code. Your role is the "brain" that, with the user's help in relaying information from Jules, directs those hands. Do not generate code directly unless it's part of the final, formatted plan for Jules. Focus on high-level design, task breakdown, and instructing Jules.
        ~~~

4.  **Save the Gem.**

## II. JMAD Workflow: Greenfield Projects

For projects starting from scratch.

1.  **Initiate Planning with the BMad Gem**:
    *   Open your configured BMad Gem.
    *   Start with a high-level project description. Example:
        `"We are starting a new Python Flask application for a blog. It needs user registration, login, post creation, and post viewing. Guide me through planning and generate a Jules execution plan."`
    *   The Gem will likely activate the PM and Architect agents.

2.  **Collaborative Planning & Design**:
    *   Engage with the Gem's agents (PM, Architect, UX Expert, etc.) to define requirements (PRD), system architecture, and user stories.
    *   The Gem will guide you through creating necessary documents (conceptually, as it doesn't save files itself). The key output is the *Jules plan*.

3.  **Leverage Jules for Setup Diagnostics (if needed)**:
    *   Although greenfield, you might have questions about the initial environment or want to set up a specific structure.
    *   Example: If the Gem suggests a directory structure, you might ask Jules to create it or verify parts of it.
        *   BMad Gem: `"Let's start with a standard Flask structure. User, please ask Jules to create the following directories using appropriate commands: 'app/', 'app/templates/', 'app/static/', 'tests/'."` (Jules would then need specific `create_file_with_block` or `run_in_bash_session mkdir` commands for this).

4.  **Iterative Plan Generation**:
    *   The Gem will break down the project into epics and stories. For each, it will generate a detailed plan.
    *   The Gem will ask clarifying questions. If information about the (emerging) codebase is needed, it will instruct you to query Jules and for you to relay the output.

5.  **Receive the Jules Execution Plan**:
    *   Once a significant chunk of planning is done (e.g., for an initial epic or a set of core stories), the BMad Gem will provide a numbered, step-by-step plan formatted for Jules.

6.  **Execute with Jules**:
    *   Take the plan generated by the BMad Gem.
    *   In your Jules interface, provide the instructions step-by-step or in logical chunks.
    *   Provide feedback to Jules if steps fail or need adjustment.

7.  **Feedback Loop (Optional but Recommended)**:
    *   If Jules encounters issues or if the execution reveals flaws in the plan, take this feedback (including any error messages from Jules) back to the BMad Gem.
    *   Example: `"Jules had an issue with step 4 because library X was not installed. The error was 'ModuleNotFoundError: No module named X'. Can we update the plan to include installing library X?"`
    *   The BMad Gem will then revise the plan.

## III. JMAD Workflow: Brownfield Projects

For working on existing codebases.

1.  **Initiate Planning with the BMad Gem**:
    *   Open your configured BMad Gem.
    *   Clearly state the goal and that it's a brownfield project. Provide context. Example:
        `"We need to add a two-factor authentication feature to our existing Django e-commerce site. The user model is in 'users/models.py'. I need a plan for Jules to implement this."`

2.  **Initial Codebase Analysis (Crucial Step)**:
    *   The BMad Gem (likely using the Analyst or Architect persona) will immediately recognize the need to understand the existing codebase.
    *   **This is where Jules is first heavily involved.**
    *   BMad Gem: `"To start, I need to understand your current authentication setup and user model. Please ask Jules to provide the content of the following files: 'users/models.py', 'settings.py' (especially the AUTHENTICATION_BACKENDS and MIDDLEWARE sections), and any relevant files from your main authentication app (e.g., 'auth/views.py', 'auth/urls.py'). Also, ask Jules to list the directory structure of your authentication app: ls('auth/')`"
    *   You: Copy these requests to Jules.
    *   Jules: Executes the `read_files` and `ls` commands.
    *   You: Paste Jules' **complete output** back into the BMad Gem for analysis.

3.  **Iterative Analysis and Planning**:
    *   The BMad Gem will analyze the provided code and information.
    *   It will ask further questions, requiring more interaction with Jules. Examples:
        *   BMad Gem: `"Thanks. Now, please ask Jules to search for all usages of the 'login' function: grep('def login\(request')."`
        *   BMad Gem: `"What are the fields in the current UserProfile model? Ask Jules to show the class definition from 'users/models.py'."`
    *   This cycle of the BMad Gem requesting information, you using Jules to get it, and you feeding the **complete output** back to the Gem is key for brownfield projects.

4.  **Impact Assessment and Design**:
    *   Using the codebase information (via Jules), the BMad Gem's Architect and Dev personas will design the new feature, considering integration points, potential conflicts, and necessary refactoring.
    *   BMad Gem: `"It seems we'll need to modify the User model to add a TOTP secret field. Ask Jules to show the current User model again so I can formulate the exact change."`

5.  **Receive the Jules Execution Plan**:
    *   Once the analysis and design are robust, the BMad Gem will provide a detailed, step-by-step plan formatted for Jules. This plan will include specific file modifications (using diffs or clear instructions), new file creations, and any necessary commands (e.g., database migrations, dependency installations).

6.  **Execute with Jules**:
    *   Take the plan to Jules and execute it.
    *   The detailed nature of the plan, informed by actual codebase analysis, should lead to smoother execution.

7.  **Feedback and Refinement**:
    *   As with greenfield projects, if Jules encounters issues, feed this **detailed feedback and any error messages** back to the BMad Gem for plan refinement. Brownfield projects may require more iteration due to unforeseen complexities in existing code.
    *   BMad Gem: `"Jules reported a circular dependency when adding the new import. The error was: 'ImportError: cannot import name X'. Let's re-evaluate the placement. Ask Jules to show the imports in 'users/models.py' and 'orders/models.py'."`

## IV. Key Principles for Effective JMAD

*   **Clear Roles**: BMad Gem is the planner and strategist. Jules is the executor and codebase interactor. You are the vital human link relaying information.
*   **Explicit Instructions for Jules**: The BMad Gem must be precise in what it needs Jules to do. The user must accurately convey these instructions to Jules.
*   **Provide Full Context to Gem**: When relaying information from Jules back to the BMad Gem, provide the complete output from Jules, including any error messages or unexpected results. This ensures the Gem has the maximum possible context for its planning and decision-making.
*   **Iterative Refinement**: Expect to go back and forth between the BMad Gem and Jules, especially in brownfield projects. Planning is not a one-shot activity; it evolves with new information.
*   **Detailed Jules Plans**: The more detailed and precise the plan from the BMad Gem, the more effectively Jules can execute it. Encourage the Gem to be specific about file paths, function names, and exact code changes.
*   **Leverage BMad Personas**: Encourage the Gem to switch between its internal BMad personas (PM, Architect, Dev, QA, etc.) as needed to get the best planning output. For example, after the Architect designs a solution, you might ask the QA persona to consider test cases, which then become part of Jules' plan.
*   **User as Verifier**: Always review the plans generated by the BMad Gem before handing them to Jules. You have the ultimate understanding of your project and can catch potential issues or suggest improvements.

By following this JMAD workflow, you can harness the broad planning and multi-agent simulation capabilities of the BMad Gem and the direct code manipulation power of Jules for a highly effective AI-assisted development process.
```
