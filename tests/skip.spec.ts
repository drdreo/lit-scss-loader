import compiler from "./compiler";
import { skip, include } from '../src/skipParser';

/**
 * Tests for
 * - Skipping a certain file. 
 * - Skipping all the files.
 * - Including a certain file.
*/

describe('Skip Parser', async () => {
  
  let output;

  it('Should skip style.css', async() => {
    const stats = await compiler('test.css?skip');

    output = "\`" + stats.toJson().modules[0].source.trim().replace(/\`/g, "\\`") + "\`";

    const hasExport = output.includes('export');
    expect(hasExport).toBe(false);
  });

  it('Should skip style.css with defaultSkip on', async() => {
    const stats = await compiler('test.css', { defaultSkip: true});
    output = "\`" + stats.toJson().modules[0].source.trim().replace(/\`/g, "\\`") + "\`";

    const hasExport = output.includes('export');
    expect(hasExport).toBe(false);
  });

  it('Should include style.css even with defaultSkip on', async() => {
    const stats = await compiler('test.css?include', { defaultSkip: true});
    output = "\`" + stats.toJson().modules[0].modules[0].source.trim().replace(/\`/g, "\\`") + "\`";
    
    const hasContent = output.includes("background-color: #000000;");
    expect(hasContent).toBe(true);

    const hasExport = output.includes('export default');
    expect(hasExport).toBe(true);

    const importString = "import {css} from 'lit-element";
    expect(output.includes(importString)).toBe(true);
  });

  it('Should match ?skip', () => {
    const query = '?skip&somethingelsetoskippit';
    const query2 = '?name&skip'

    const parseResult = skip(query);
    const parseResult2 = skip(query2);

    expect(parseResult).toBe(true);
    expect(parseResult2).toBe(true);
  });

  
  it('Should not match ?skip', () => {
    const query = '?skipping&skipper';
    const parseResult = skip(query);
    expect(parseResult).toBe(false);
  });

   it('Should match ?include', () => {
    const query = '?include&somethingelsetoskippit';
    const query2 = '?name&include'
    
    const parseResult = include(query);
    const parseResult2 = include(query2);

    expect(parseResult).toBe(true);
    expect(parseResult2).toBe(true);
  });


});