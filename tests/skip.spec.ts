import { include, skip } from '../src/skipParser';
import compiler from "./compiler";

/**
 * Tests for
 * - Skipping a certain file.
 * - Skipping all the files.
 * - Including a certain file.
 */

describe('Skip Parser', () => {

	let output;

	it('should skip style.scss', async () => {
		output = await compiler('test.scss?skip');

		const hasExport = output.includes('export');
		expect(hasExport).toBe(false);
	});

	it('should skip style.css with defaultSkip on', async () => {
		output = await compiler('test.css', { defaultSkip: true });

		const hasExport = output.includes('export');
		expect(hasExport).toBe(false);
	});

	it('should include style.css even with defaultSkip on', async () => {
		output = await compiler('test.css?include', { defaultSkip: true });

		const hasContent = output.includes("background-color: #000000;");
		expect(hasContent).toBe(true);

		const hasExport = output.includes('export default');
		expect(hasExport).toBe(true);

		const importString = "import {css} from 'lit";
		expect(output.includes(importString)).toBe(true);
	});

	it('should match ?skip', () => {
		const query = '?skip&somethingelsetoskipit';
		const query2 = '?name&skip'

		const parseResult = skip(query);
		const parseResult2 = skip(query2);

		expect(parseResult).toBe(true);
		expect(parseResult2).toBe(true);
	});

	it('should not match ?skip', () => {
		const query = '?skipping&skipper';
		const parseResult = skip(query);
		expect(parseResult).toBe(false);
	});

	it('should match ?include', () => {
		const query = '?include&somethingelsetoskippit';
		const query2 = '?name&include'

		const parseResult = include(query);
		const parseResult2 = include(query2);

		expect(parseResult).toBe(true);
		expect(parseResult2).toBe(true);
	});

});
