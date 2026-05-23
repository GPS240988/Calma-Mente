---
name: gsd-eval-review
description: "Audita a cobertura de avaliação de uma fase de IA executada e produz um plano de remediação EVAL-REVIEW.md."
---

<objective>
Conduct a retroactive evaluation coverage audit of a completed AI phase.
Checks whether the evaluation strategy from AI-SPEC.md was implemented.
Produces EVAL-REVIEW.md with score, verdict, gaps, and remediation plan.
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/eval-review.md
@~/.gemini/antigravity/get-shit-done/references/ai-evals.md
</execution_context>

<context>
Phase: $ARGUMENTS — optional, defaults to last completed phase.
</context>

<process>
Execute @~/.gemini/antigravity/get-shit-done/workflows/eval-review.md end-to-end.
Preserve all workflow gates.
</process>
