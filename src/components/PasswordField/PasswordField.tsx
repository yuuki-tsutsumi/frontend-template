import { useState } from 'react';
import {
  Box,
  BoxProps,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  FieldValues,
  Path,
} from 'react-hook-form';

export type PasswordFieldProps<T extends FieldValues> = {
  label: string;
  password: string;
  registerName: keyof T;
  setPassword: (password: string) => void;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  compareWithField?: string;
} & BoxProps;

export const ERRMSG_PASSWORD_IS_REQUIRED = 'パスワードは必須です';
export const ERRMSG_PASSWORD_TOO_SHORT =
  'パスワードは12文字以上である必要があります';
export const ERRMSG_PASSWORD_NO_SYMBOL =
  'パスワードには少なくとも1つの記号を含める必要があります';
export const ERRMSG_PASSWORD_NO_NUMBER =
  'パスワードには少なくとも1つの数字を含める必要があります';
export const ERRMSG_PASSWORD_NO_LOWERCASE =
  'パスワードには少なくとも1つの小文字を含める必要があります';
export const ERRMSG_PASSWORD_NO_UPPERCASE =
  'パスワードには少なくとも1つの大文字を含める必要があります';
export const ERRMSG_PASSWORD_MISMATCH = 'パスワードが一致しません';

export const PasswordField = <T extends FieldValues>({
  label,
  registerName,
  password,
  setPassword,
  register,
  watch,
  errors,
  compareWithField = 'newPassword',
  ...restProps
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordValue = () => {
    const formValues = watch();
    return (
      ((formValues as Record<string, unknown>)[compareWithField] as string) ||
      ''
    );
  };

  const getErrorMessage = () => {
    if (!errors[registerName]) return '';
    const error = errors[registerName];
    return String(error.message || '');
  };

  return (
    <Box {...restProps}>
      <TextField
        label={label}
        type={showPassword ? 'text' : 'password'}
        variant='outlined'
        fullWidth
        value={password}
        {...register(registerName as unknown as Path<T>, {
          required: ERRMSG_PASSWORD_IS_REQUIRED,
          onChange: (event) => setPassword(event.target.value),
          validate:
            registerName === 'confirmPassword'
              ? (value: string) =>
                  value === getPasswordValue() || ERRMSG_PASSWORD_MISMATCH
              : {
                  minLength: (value: string) =>
                    value.length >= 12 || ERRMSG_PASSWORD_TOO_SHORT,
                  hasSymbol: (value: string) =>
                    /[!-/:-@[-`{-~]/.test(value) || ERRMSG_PASSWORD_NO_SYMBOL,
                  hasNumber: (value: string) =>
                    /[0-9]/.test(value) || ERRMSG_PASSWORD_NO_NUMBER,
                  hasLowercase: (value: string) =>
                    /[a-z]/.test(value) || ERRMSG_PASSWORD_NO_LOWERCASE,
                  hasUppercase: (value: string) =>
                    /[A-Z]/.test(value) || ERRMSG_PASSWORD_NO_UPPERCASE,
                },
        })}
        error={!!errors[registerName]}
        helperText={getErrorMessage()}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge='end'
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};
