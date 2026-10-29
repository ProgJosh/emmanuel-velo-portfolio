import {
  ArrowUpRight,
  Blocks,
  Bot,
  Code2,
  GitPullRequest,
  SquareTerminal,
  Terminal,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { aiPrinciples, aiToolGroups, type AiTool } from '@/lib/portfolio-data';

const toolIcons: Record<AiTool['id'], LucideIcon> = {
  'claude-code': SquareTerminal,
  'github-copilot': GitPullRequest,
  'openai-sites': Blocks,
  'amazon-q': Bot,
  'openai-codex': Code2,
  opencode: Terminal,
  'kilo-code': Wrench,
};

function AiToolCard({ tool }: { tool: AiTool }) {
  const Icon = toolIcons[tool.id];
  return (
    <li className="ai-cell" data-reveal>
      <article className="ai-card">
        <div className="ai-card-head">
          <span className="ai-card-icon">
            <Icon aria-hidden="true" />
          </span>
          <div>
            <h4>{tool.name}</h4>
            <p className="ai-card-kind">
              {tool.maker} · {tool.kind}
            </p>
          </div>
        </div>
        <p className="ai-card-copy">{tool.usedFor}</p>
        <ul className="ai-tags" aria-label={`${tool.name} used in`}>
          {tool.projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
        <p className="ai-evidence">
          <span>Evidence</span>
          {tool.evidenceUrl ? (
            <a
              href={tool.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tool.evidence} <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            tool.evidence
          )}
        </p>
      </article>
    </li>
  );
}

export function AiTools() {
  return (
    <>
      {aiToolGroups.map((group) => (
        <section
          className="ai-group"
          key={group.id}
          aria-labelledby={`ai-group-${group.id}`}
        >
          <div className="ai-group-heading" data-reveal>
            <h3 id={`ai-group-${group.id}`}>{group.title}</h3>
            <p>{group.description}</p>
          </div>
          <ul className="ai-grid" data-count={group.tools.length}>
            {group.tools.map((tool) => (
              <AiToolCard key={tool.id} tool={tool} />
            ))}
          </ul>
        </section>
      ))}
      <ol className="ai-principles" aria-label="How I work with AI agents">
        {aiPrinciples.map((principle, index) => (
          <li key={principle.title} data-reveal>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{principle.title}</strong>
            <p>{principle.description}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
