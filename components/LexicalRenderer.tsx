import React from 'react'

type LexicalNode = {
  type: string
  text?: string
  format?: number
  tag?: string
  listType?: string
  children?: LexicalNode[]
  fields?: {
    blockType?: string
    text?: string
    label?: string
    prompt?: string
  }
}

type LexicalRoot = {
  root?: { children?: LexicalNode[] }
}

function renderText(node: LexicalNode): React.ReactNode {
  let text: React.ReactNode = node.text ?? ''
  const fmt = node.format ?? 0
  if (fmt & 1) text = <strong>{text}</strong>
  if (fmt & 2) text = <em>{text}</em>
  if (fmt & 8) text = <u>{text}</u>
  return text
}

function renderNode(node: LexicalNode, idx: number): React.ReactNode {
  switch (node.type) {
    case 'text':
      return <React.Fragment key={idx}>{renderText(node)}</React.Fragment>

    case 'paragraph':
      return (
        <p key={idx}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </p>
      )

    case 'heading':
      if (node.tag === 'h2') {
        return <h2 key={idx}>{node.children?.map((c, i) => renderNode(c, i))}</h2>
      }
      return <h3 key={idx}>{node.children?.map((c, i) => renderNode(c, i))}</h3>

    case 'list':
      if (node.listType === 'number') {
        return <ol key={idx}>{node.children?.map((c, i) => renderNode(c, i))}</ol>
      }
      return <ul key={idx}>{node.children?.map((c, i) => renderNode(c, i))}</ul>

    case 'listitem':
      return <li key={idx}>{node.children?.map((c, i) => renderNode(c, i))}</li>

    case 'link': {
      const href = (node as LexicalNode & { fields?: { url?: string } }).fields?.url ?? '#'
      return (
        <a key={idx} href={href} target="_blank" rel="noopener noreferrer">
          {node.children?.map((c, i) => renderNode(c, i))}
        </a>
      )
    }

    case 'block': {
      const blockType = node.fields?.blockType
      if (blockType === 'tip') {
        return (
          <div key={idx} data-block-type="tip">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush font-semibold mb-2">
              lazy girl tip ✦
            </p>
            <p className="font-sans text-sm text-charcoal/80 leading-relaxed">{node.fields?.text}</p>
          </div>
        )
      }
      if (blockType === 'callout') {
        return (
          <div key={idx} data-block-type="callout">
            <p className="font-sans text-sm text-charcoal/80 leading-relaxed">{node.fields?.text}</p>
          </div>
        )
      }
      if (blockType === 'promptBox') {
        return (
          <div key={idx} data-block-type="promptBox">
            {node.fields?.label && (
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-taupe font-semibold mb-2">
                {node.fields.label}
              </p>
            )}
            <p>{node.fields?.prompt}</p>
          </div>
        )
      }
      return null
    }

    default:
      if (node.children?.length) {
        return <React.Fragment key={idx}>{node.children.map((c, i) => renderNode(c, i))}</React.Fragment>
      }
      return null
  }
}

export default function LexicalRenderer({ data }: { data: unknown }) {
  if (!data) return null
  const lexical = data as LexicalRoot
  const children = lexical.root?.children ?? []
  return <>{children.map((node, i) => renderNode(node, i))}</>
}
