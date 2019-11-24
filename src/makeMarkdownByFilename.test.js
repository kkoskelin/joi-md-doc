const makeMarkdownByFilename = require('./makeMarkdownByFilename');

describe(`makeMarkdownByFilename`, () => {
  describe(`unit`, () => {
    it(`should support primitive type`, () => {
      const joiSchema = {
        describe: () => ({
          metas: [{ name: 'Test', filename: 'test' }],
          keys: {
            foo: { type: 'number' },
            bar: { type: 'string' },
            baz: { type: 'boolean' },
          },
        }),
      };

      expect(makeMarkdownByFilename(joiSchema)).toMatchSnapshot();
    });

    it(`should support nested schemas/objects`, () => {
      const joiSchema = {
        describe: () => ({
          metas: [{ name: 'Parent', filename: 'parent' }],
          keys: {
            foo: {
              type: 'object',
              metas: [{ name: 'Child', filename: 'child' }],
              keys: {
                foo: { type: 'number' },
              },
            },
          },
        }),
      };

      expect(makeMarkdownByFilename(joiSchema)).toMatchSnapshot();
    });

    it(`should mark required fields`, () => {
      const joiSchema = {
        describe: () => ({
          metas: [{ name: 'Test', filename: 'test' }],
          keys: {
            foo: {
              type: 'number',
              flags: {
                presence: 'required',
              },
            },
          },
        }),
      };

      expect(makeMarkdownByFilename(joiSchema)).toMatchSnapshot();
    });

    it(`should support descriptions`, () => {
      const joiSchema = {
        describe: () => ({
          metas: [{ name: 'Test', filename: 'test' }],
          keys: {
            foo: {
              type: 'number',
              flags: {
                description: 'This is a description.',
              },
            },
          },
        }),
      };

      expect(makeMarkdownByFilename(joiSchema)).toMatchSnapshot();
    });

    it(`should support default meta tags`, () => {
      const joiSchema = {
        describe: () => ({
          metas: [{ name: 'Test', filename: 'test' }],
          keys: {
            foo: {
              type: 'number',
              metas: [{ default: 1 }],
            },
          },
        }),
      };

      expect(makeMarkdownByFilename(joiSchema)).toMatchSnapshot();
    });
  });
});
