---
name: gsd-pr-branch
description: "Cria um branch de PR limpo filtrando os commits de .planning/ — pronto para revisão de código"
---


<objective>
Create a clean branch suitable for pull requests by filtering out .planning/ commits
from the current branch. Reviewers see only code changes, not GSD planning artifacts.

This solves the problem of PR diffs being cluttered with PLAN.md, SUMMARY.md, STATE.md
changes that are irrelevant to code review.
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/pr-branch.md
</execution_context>

<process>
Execute the pr-branch workflow from @~/.gemini/antigravity/get-shit-done/workflows/pr-branch.md end-to-end.
</process>
