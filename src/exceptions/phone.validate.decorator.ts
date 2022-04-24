import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPhone( validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPhone',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any,) {
          const regexp = new RegExp(`^[\+]{0,1}380([0-9]{9})$`);
         // const test = regexp.test(relatedValue);
          return regexp.test(value);
        },
      },
    });
  };
}