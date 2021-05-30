interface IUser {
  _id?: string;
  name?: string;
  email: string;
  phone?: string;
  gender?: string;
  address?: [];
  town?: string;
  country?: string;
  password: string;
  confirmPassword?: string;
  googleId?: string;
  stripeId?: string;
}
type IUserState = {
  isFetching: boolean;
  currentUser: IUser | null;
  cookiePresent: boolean | string | null;
  errors: IValidationError[] | [];
};
