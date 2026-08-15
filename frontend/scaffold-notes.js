const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'src', 'app', 'content');

const structure = {
  'java-dsa': [
    'arrays', 'strings', 'linked-list', 'stack', 'queue', 'hashing', 'recursion', 
    'searching', 'sorting', 'trees', 'bst', 'heap', 'graphs', 'dynamic-programming'
  ],
  'aptitude/quantitative': [
    'percentage', 'profit-loss', 'ratio-proportion', 'average', 'time-work', 
    'time-speed-distance', 'simple-interest', 'compound-interest', 'probability'
  ],
  'aptitude/logical-reasoning': [
    'coding-decoding', 'blood-relations', 'direction-sense', 'syllogism', 
    'analogy', 'classification', 'series', 'seating-arrangement'
  ],
  'core-cs/oop': [
    'introduction', 'classes-objects', 'inheritance', 'polymorphism', 'abstraction', 'encapsulation'
  ],
  'core-cs/dbms': [
    'introduction', 'er-model', 'normalization', 'transactions', 'indexing', 'sql-basics'
  ],
  'core-cs/operating-system': [
    'introduction', 'process-management', 'memory-management', 'concurrency', 'file-systems'
  ],
  'core-cs/computer-networks': [
    'introduction', 'osi-model', 'tcp-ip', 'routing', 'application-layer'
  ],
  'core-cs/sql': [
    'introduction', 'queries', 'joins', 'subqueries', 'indexing'
  ]
};

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

for (const [subjectPath, chapters] of Object.entries(structure)) {
  for (const chapter of chapters) {
    const chapterDir = path.join(contentDir, subjectPath, chapter);
    fs.mkdirSync(chapterDir, { recursive: true });

    const title = chapter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    const notesContent = `import { Notes } from '../../../core/models/notes.model';

export const ${toCamelCase(chapter)}Notes: Notes = {
  title: '${title}',
  slug: '${chapter}',
  description: 'Complete theory notes for ${title}.',
  sections: [
    {
      heading: 'Introduction',
      content: \`
        Notes content will be added here.
      \`
    }
  ]
};
`;
    // For core-cs, the nesting is deeper, so import path needs adjusting
    const depth = subjectPath.split('/').length + 2;
    let importPath = '';
    for (let i = 0; i < depth; i++) {
      importPath += '../';
    }
    importPath += 'core/models/notes.model';

    const finalNotesContent = notesContent.replace('../../../core/models/notes.model', importPath);

    fs.writeFileSync(path.join(chapterDir, 'notes.ts'), finalNotesContent);
  }
}

// Generate notes-paths.ts
const configDir = path.join(__dirname, 'src', 'app', 'config');
fs.mkdirSync(configDir, { recursive: true });

let pathsContent = `// ============================================================
// PREORBIT — Notes Path Mapping
// ============================================================

import { Notes } from '../core/models/notes.model';

type NoteLoader = () => Promise<{ [key: string]: Notes }>;

export const notesPaths: Record<string, Record<string, NoteLoader | Record<string, NoteLoader>>> = {
`;

for (const [key, chapters] of Object.entries(structure)) {
  const parts = key.split('/');
  if (parts.length === 1) {
    pathsContent += `  '${parts[0]}': {\n`;
    for (const chapter of chapters) {
      pathsContent += `    '${chapter}': () => import('../content/${parts[0]}/${chapter}/notes') as unknown as Promise<{ [key: string]: Notes }>,\n`;
    }
    pathsContent += `  },\n`;
  } else if (parts.length === 2) {
    // We need to group them by parts[0]
    // But structure has them as 'aptitude/quantitative' and 'aptitude/logical-reasoning'
    // This script will just handle it by checking if we already started the top level section.
  }
}

// Since we have nested structure for aptitude and core-cs, let's just write the object out manually in the script for simplicity since we know the keys.
pathsContent = `// ============================================================
// PREORBIT — Notes Path Mapping
// ============================================================

export const notesPaths: any = {
`;

const buildTree = () => {
  const tree = {};
  for (const [key, chapters] of Object.entries(structure)) {
    const parts = key.split('/');
    let current = tree;
    for (let i = 0; i < parts.length; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    for (const chapter of chapters) {
      current[chapter] = `() => import('../content/${key}/${chapter}/notes').then(m => m.${toCamelCase(chapter)}Notes)`;
    }
  }
  return tree;
}

const tree = buildTree();

function stringifyTree(obj, indent) {
  let str = '{\n';
  for (const [k, v] of Object.entries(obj)) {
    str += `${indent}  '${k}': `;
    if (typeof v === 'object') {
      str += stringifyTree(v, indent + '  ');
    } else {
      str += v + ',\n';
    }
  }
  str += `${indent}},\n`;
  return str;
}

pathsContent += stringifyTree(tree, '').slice(1, -2) + ';\n'; // Slice off leading '{' and trailing '},' to fit inside the exported object if we just export const = tree

pathsContent = `// ============================================================
// PREORBIT — Notes Path Mapping
// ============================================================

export const notesPaths: Record<string, any> = ${stringifyTree(tree, '').slice(0, -2)};
`;

fs.writeFileSync(path.join(configDir, 'notes-paths.ts'), pathsContent);


console.log('Scaffolding complete.');
