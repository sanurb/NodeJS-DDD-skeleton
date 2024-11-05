import { faker } from "@faker-js/faker/locale/en";

interface Props {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
}

export class StringMother {
  public static random(options?: Props): string {
    const { length, lowercase, uppercase } = options || {};

    const randomString = faker.string.alpha({ length: length || 10 });

    if (lowercase) {
      return randomString.toLowerCase();
    }

    if (uppercase) {
      return randomString.toUpperCase();
    }

    return randomString;
  }
}
