const fs = require('fs');
const path = require('path');

const generateTestFile = (componentName, criteria, outputFile) => {
  const template = (criterion) => `
  it('${criterion}', async () => {
    // ARRANGE
    render(<${componentName} />);

    // ACT

    // ASSERT

  });
  `;

  const tests = criteria.map(template).join('\n');

  const content = `
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ${componentName} from './${componentName}'; // Adjust the import based on your file structure

describe('${componentName}', async () => {
  ${tests}
});
  `;

  fs.writeFileSync(outputFile, content);
  console.log(`Test file generated at ${outputFile}`);
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node generateTests.js <ComponentName> <OutputFile> <CriteriaFile>');
    process.exit(1);
  }

  const [componentName, outputFile, criteriaFile] = args;
  const criteria = fs.readFileSync(criteriaFile, 'utf-8').split('\n').filter(Boolean);

  generateTestFile(componentName, criteria, outputFile);
};

main();