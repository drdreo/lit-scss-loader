import * as generateTemplate from '../src/templateGenerator';

/**
 * Tests the template generator
 */

describe('Template Generator', () => {

    let template;
    let parsedFileContents;

    beforeAll(() => {
        parsedFileContents = `
            div {
                /* Testing out CSS */
                background-color: magenta;
                /* Because we assume that our SCSS has been already parsed */
            }
        `;

        template = generateTemplate(parsedFileContents);
    });

    it('Should generate the template', () => {
        expect(template).not.toBeUndefined();
        expect(template).not.toBeNull();
    });

    it('Should have injected the parsedFileContents', () => {
        expect(template.indexOf(parsedFileContents)).not.toBe(-1);
    })

})

