import type { Block } from './blog-types'

type LexicalNode = Record<string, unknown>

function textNode(text: string): LexicalNode {
  return { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }
}

function paragraphNode(text: string): LexicalNode {
  return {
    type: 'paragraph',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: [textNode(text)],
  }
}

function headingNode(text: string, tag: 'h2' | 'h3'): LexicalNode {
  return {
    type: 'heading',
    tag,
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: [textNode(text)],
  }
}

function listNode(items: string[]): LexicalNode {
  return {
    type: 'list',
    listType: 'bullet',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    tag: 'ul',
    children: items.map((item) => ({
      type: 'listitem',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      value: 1,
      checked: undefined,
      children: [textNode(item)],
    })),
  }
}

function blockNode(blockType: string, fields: Record<string, unknown>): LexicalNode {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: { blockType, id: crypto.randomUUID(), ...fields },
  }
}

export function blocksToLexical(blocks: Block[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: blocks.map((block) => {
        switch (block.type) {
          case 'p':
            return paragraphNode(block.text)
          case 'h2':
            return headingNode(block.text, 'h2')
          case 'h3':
            return headingNode(block.text, 'h3')
          case 'ul':
            return listNode(block.items)
          case 'tip':
            return blockNode('tip', { text: block.text })
          case 'callout':
            return blockNode('callout', { text: block.text })
          default:
            return paragraphNode('')
        }
      }),
    },
  }
}

export function categoryToPayload(category: string) {
  return category === 'AI updates' ? 'ai-updates' : category
}