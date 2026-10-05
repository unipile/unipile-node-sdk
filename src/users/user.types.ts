import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { registeredFormat } from "../common/type-system.js";

/**
 * @note Keep sub-schemas separated to be able to validate only the parts you're
 *       interested in.
 */

/**
 * @note This is a very loose definition of an 'usual' email shape.
 *       Yet it will reject some technically valid email addresses,
 *       e.g. email without top-level domains.
 *
 *       The idea is to pre-filter some input to get an UnverifiedEmail,
 *       then send a verification email and once verification is complete,
 *       graduate it to a VerifiedEmail.
 */
const LOOSE_EMAIL_SHAPE_REGEX = /^\S+@\S+\.\S+$/;
registeredFormat("emailLike", (s) => LOOSE_EMAIL_SHAPE_REGEX.test(s));
export const EmailSchema = Type.String({ format: "emailLike" });
export type Email = Static<typeof EmailSchema>;
export const EmailValidator = TypeCompiler.Compile(EmailSchema);

/**
 *
 */
export const UserNameSchema = Type.Object({
  username: EmailSchema,
});

export type UserName = Static<typeof UserNameSchema>;
export const UserNameValidator = TypeCompiler.Compile(UserNameSchema);

/**
 *
 */
export const UserIdSchema = Type.Object({
  id: Type.Number(),
});

export type UserId = Static<typeof UserIdSchema>;
export const UserIdValidator = TypeCompiler.Compile(UserIdSchema);

/**
 *
 */
export const UserReferralCodeSchema = Type.Object({
  id: Type.String(),
});

export type UserReferralCode = Static<typeof UserReferralCodeSchema>;
export const UserReferralCodeValidator = TypeCompiler.Compile(
  UserReferralCodeSchema
);

/**
 * @todo Populate as needed.
 */

/** */
export const UserSchema = Type.Composite([
  UserNameSchema,
  UserIdSchema,
  UserReferralCodeSchema,
]);

export type User = Static<typeof UserSchema>;
export const UserValidator = TypeCompiler.Compile(UserSchema);

// /** */
// export const UserIntersectSchema = Type.Intersect([
//   UserNameSchema,
//   UserIdSchema,
// ]);

// export type UserIntersect = Static<typeof UserIntersectSchema>;
// export const UserIntersectValidator = TypeCompiler.Compile(UserIntersectSchema);

// export const UserSchema = Type.Object({
//   username: EmailSchema,
//   id: Type.Number(),
// });

// export type User = Static<typeof UserSchema>;
// export const UserValidator = TypeCompiler.Compile(UserSchema);

// console.log(
//   EmailValidator.Code(),
//   UserNameValidator.Code(),
//   UserIdValidator.Code(),
//   UserValidator.Code(),
//   EmailValidator.Check('azdazda@yahoo.fr'),
//   //   UserCompositeValidator.Code(),
//   //   UserIntersectValidator.Code(),
// );
