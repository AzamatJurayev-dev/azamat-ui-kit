import fs from "fs";
import path from "path";

const filesToFixReact = [
  "src/components/data-table/data-table-row-actions.tsx",
  "src/components/data-table/data-table-select-column.tsx",
  "src/components/form/form-async-select.tsx",
  "src/components/form/form-date-input.tsx",
  "src/components/form/form-date-picker.tsx",
  "src/components/form/form-date-range-input.tsx",
  "src/components/form/form-date-range-picker.tsx",
  "src/components/form/form-number-input.tsx",
  "src/components/form/form-password-input.tsx",
  "src/components/form/form-phone-input.tsx",
  "src/components/form/form-search-input.tsx",
  "src/components/form/form-select.tsx",
];

for (const file of filesToFixReact) {
  const p = path.resolve(process.cwd(), file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, "utf-8");
    content = content.replace(/import\s+(?:\*\s+as\s+)?React\s+from\s+["']react["'];?\r?\n/, "");
    fs.writeFileSync(p, content, "utf-8");
  }
}

// Fix action-menu.tsx
const actionMenuFile = path.resolve(process.cwd(), "src/components/actions/action-menu.tsx");
if (fs.existsSync(actionMenuFile)) {
  let content = fs.readFileSync(actionMenuFile, "utf-8");
  content = content.replace(/trigger\?: React\.ReactNode/, "trigger?: React.ReactElement");
  fs.writeFileSync(actionMenuFile, content, "utf-8");
}

// Fix form-date-range-picker.tsx
const dateRangePickerFile = path.resolve(process.cwd(), "src/components/form/form-date-range-picker.tsx");
if (fs.existsSync(dateRangePickerFile)) {
  let content = fs.readFileSync(dateRangePickerFile, "utf-8");
  content = content.replace(/onValueChange\?\.\(value\)/, "onValueChange?.({ from: value.from || undefined, to: value.to || undefined })");
  fs.writeFileSync(dateRangePickerFile, content, "utf-8");
}

// Fix async-select.tsx
const asyncSelectFile = path.resolve(process.cwd(), "src/components/inputs/async-select.tsx");
if (fs.existsSync(asyncSelectFile)) {
  let content = fs.readFileSync(asyncSelectFile, "utf-8");
  content = content.replace(/const option = await loadSelectedOption\?\.\(value\)/, "const option = await loadSelectedOption?.(value as TValue)");
  fs.writeFileSync(asyncSelectFile, content, "utf-8");
}

// Fix simple-select.tsx
const simpleSelectFile = path.resolve(process.cwd(), "src/components/inputs/simple-select.tsx");
if (fs.existsSync(simpleSelectFile)) {
  let content = fs.readFileSync(simpleSelectFile, "utf-8");
  content = content.replace(/<Select value=\{value\} onValueChange=\{onValueChange\} \{\.\.\.props\}>/, "<Select value={value} onValueChange={(val) => onValueChange?.(val as string)} {...props}>");
  fs.writeFileSync(simpleSelectFile, content, "utf-8");
}

// Fix file-upload.tsx
const fileUploadFile = path.resolve(process.cwd(), "src/components/upload/file-upload.tsx");
if (fs.existsSync(fileUploadFile)) {
  let content = fs.readFileSync(fileUploadFile, "utf-8");
  content = content.replace(/onDragEnter\?\.\(event\)/g, "onDragEnter?.(event as any)");
  content = content.replace(/onDragLeave\?\.\(event\)/g, "onDragLeave?.(event as any)");
  content = content.replace(/onDragOver\?\.\(event\)/g, "onDragOver?.(event as any)");
  content = content.replace(/onDrop\?\.\(event\)/g, "onDrop?.(event as any)");
  fs.writeFileSync(fileUploadFile, content, "utf-8");
}

console.log("Fixes applied.");
