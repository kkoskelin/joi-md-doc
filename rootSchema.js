const joi = require('@hapi/joi');
const R = require('ramda');

const listItem = joi
  .object()
  .keys({
    foo: joi.string(),
  })
  .meta({
    name: 'List Item',
    filename: 'listItemSchema',
  });

module.exports = joi
  .object()
  .keys({
    version: joi
      .number()
      .meta({ default: '1.0.0' })
      .description('Follows semantic versioning.'),
    foo: joi
      .string()
      .required()
      .valid(...R.map(R.pipe(R.toString, R.concat('valid')), R.range(0, 4)))
      .invalid(
        ...R.map(R.pipe(R.toString, R.concat('invalid')), R.range(0, 4)),
      ),
    primitiveList: joi.array().items(joi.string(), joi.number(), joi.boolean()),
    objectList: joi.array().items(listItem),
    nestedObjSchema1: joi
      .object()
      .keys({
        foo: joi.string(),
        nestedObjSchema2: joi
          .object()
          .keys({
            foo: joi.string(),
          })
          .meta({
            name: 'Nested Object Schema 2',
            filename: 'nestedObjSchema2',
          }),
      })
      .meta({
        name: 'Nested Object Schema 1',
        filename: 'nestedObjSchema1',
      }),
  })
  .meta({
    name: 'Root Schema',
    filename: 'rootSchema',
  });
