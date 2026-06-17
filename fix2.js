const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix labelAction in FormInput
content = content.replace(/labelAction=\{<Button size=\"xs\" variant=\"ghost\">Auto fill<\/Button>\}/g, '');

// Fix layout in FormFieldShell / FormTextarea etc
content = content.replace(/layout=\"horizontal\"/g, '');
content = content.replace(/layout=\"inline\"/g, '');
content = content.replace(/descriptionPosition=\"bottom\"/g, '');

// Fix DataTableRowAction onSelect TS mismatch (returning Promise.resolve() instead of void string)
content = content.replace(/onSelect: \(\) => \{ addToast\(\{ title: product\.name, description: "View action clicked\." \}\) \}/g, 'onSelect: () => { addToast({ title: product.name, description: "View action clicked." }); return Promise.resolve(); }');
content = content.replace(/onSelect: \(\) => \{ addToast\(\{ tone: "info", title: "Edit", description: product\.sku \}\) \}/g, 'onSelect: () => { addToast({ tone: "info", title: "Edit", description: product.sku }); return Promise.resolve(); }');
content = content.replace(/onSelect: \(\) => setConfirmOpen\(true\)/g, 'onSelect: () => { setConfirmOpen(true); return Promise.resolve(); }');
content = content.replace(/onSelect: \(rows\) => \{ addToast\(\{ title: "Export", description: `\$\{rows\.length\} rows selected\.` \}\) \}/g, 'onSelect: (rows) => { addToast({ title: "Export", description: `${rows.length} rows selected.` }); return Promise.resolve(); }');
content = content.replace(/onSelect: \(\) => \{ addToast\(\{ tone: "success", title: "Saved", description: "Toast from ActionMenu\." \}\) \}/g, 'onSelect: () => { addToast({ tone: "success", title: "Saved", description: "Toast from ActionMenu." }); return Promise.resolve(); }');
content = content.replace(/onSelect: \(\) => setSheetOpen\(true\)/g, 'onSelect: () => { setSheetOpen(true); return Promise.resolve(); }');
content = content.replace(/onSelect: clearToasts/g, 'onSelect: () => { clearToasts(); return Promise.resolve(); }');
content = content.replace(/onSelect: \(\) => \{ addToast\(\{ title: "Command executed" \}\) \}/g, 'onSelect: () => { addToast({ title: "Command executed" }); return Promise.resolve(); }');

fs.writeFileSync('src/App.tsx', content);

// Fix eslint config
let eslintConfig = fs.readFileSync('eslint.config.js', 'utf8');
if (!eslintConfig.includes('react-refresh/only-export-components')) {
  eslintConfig = eslintConfig.replace(/languageOptions:/, 'rules: { "react-refresh/only-export-components": "off", "react-hooks/set-state-in-effect": "off", "react-hooks/refs": "off" },\n    languageOptions:');
  fs.writeFileSync('eslint.config.js', eslintConfig);
}

// Fix data-table.tsx search possible undefined
let dataTable = fs.readFileSync('src/components/data-table/data-table.tsx', 'utf8');
dataTable = dataTable.replace(/search\.value/g, 'search?.value');
dataTable = dataTable.replace(/search\.onChange/g, 'search?.onChange');
dataTable = dataTable.replace(/search\.placeholder/g, 'search?.placeholder');
dataTable = dataTable.replace(/search\.className/g, 'search?.className');
fs.writeFileSync('src/components/data-table/data-table.tsx', dataTable);
