import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'isValidMongoObjectId', async: false })
export class IsValidMongoObjectId implements ValidatorConstraintInterface {
  validate(id: string): boolean {
    console.log('validation!');
    return Types.ObjectId.isValid(id);
  }

  defaultMessage(): string {
    return 'Invalid ObjectId';
  }
}
