import compiler from './compiler';

/**
 * This uses Webpack's compiler function (see compiler.js) to
 * generate an in-memory test of the loader. 
 * 
 * We load a dummy css and check for its creation and integrity of its 
 * content.
 */

describe('The Loader', async () => {

  let stats;
  let statsMin;

  let output;
  let outputMin;


  beforeAll(async () => {
    stats = await compiler('test.css');
    statsMin = await compiler('test.css', { minify: true });

    // strange string comparison due to template literals inside template literals
    output = "\`" + stats.toJson().modules[0].modules[0].source.trim().replace(/\`/g, "\\`") + "\`";
    outputMin = "\`" + statsMin.toJson().modules[0].modules[0].source.trim().replace(/\`/g, "\\`") + "\`";
  });

  it('Creates the file', async () => {
    expect(output).not.toBeNull();
  });

  it('Creates the min file', async () => {
    expect(outputMin).not.toBeNull();
  });

  it('Has the CSS contents', async () => {
    const parsedFileContents = `background-color: #000000;`;

    const hasCss = output.includes(parsedFileContents)
    expect(hasCss).toBe(true);
  });
  
  it('Has the min CSS contents', async () => {
    const parsedMinFileContents = `background-color:#000`;

    const hasCssMin = outputMin.includes(parsedMinFileContents)
    expect(hasCssMin).toBe(true);
  });
});