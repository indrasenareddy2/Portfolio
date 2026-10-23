# Portfolio sections

The About, Experience, Projects, Contact and "tap a tool" reference images were design references only (removed from the repo). The sections use real HTML, CSS and original SVG graphics. No reference-derived workstation background is rendered. The original header and hero design are preserved; only hero particle serialization changed to fix hydration.

## Projects

The pill navigation selects all six resume-backed projects: VYN Insights, Vinny Chat, Crew Call Agent, Wikihire, EDW Mapping and Face Attendance. Each has Overview, Problem, Solution, Architecture, Stack and Outcome panels. The overview's six selectable workflow stages and the full architecture inspector show real descriptions from the project data. Case-study links open the project's complete page. There are no decorative query fields or pretend enterprise app controls.

## Skills

The orbital tool selectors and selected-tool panel reproduce the layout of the new reference in code. Selecting an orbital tool, any tool in the expanded catalog, or a related tool updates the matching projects and experiments. The catalog merges curated skills with every technology in project and experiment stacks. Used-in links point to the actual case study or experiment section.

## Models and experiments

ExpenseAuditEnv has been removed, including its Python/Docker references. The remaining experiments have expandable explanations.

## Hydration

Hero motes use a seeded integer generator and CSS strings with explicit units and two decimal places. The server and browser receive identical values instead of full-precision transcendental results that change when serialized. No hydration warnings are suppressed.

## Validation


Run `npm run check` (lint, typecheck, tests and the static build).
