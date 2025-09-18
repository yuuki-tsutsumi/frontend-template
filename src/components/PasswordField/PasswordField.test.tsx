import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  ERRMSG_PASSWORD_MISMATCH,
  ERRMSG_PASSWORD_NO_LOWERCASE,
  ERRMSG_PASSWORD_NO_NUMBER,
  ERRMSG_PASSWORD_NO_SYMBOL,
  ERRMSG_PASSWORD_NO_UPPERCASE,
  ERRMSG_PASSWORD_TOO_SHORT,
  PasswordField,
} from './PasswordField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const mockProps = {
  label: 'パスワード',
  registerName: 'password',
  password: 'testpassword',
  compareWithField: 'newPassword',
};

const shortPassword = 'short';
const noSymbolPassword = 'testpassword1';
const noNumberPassword = 'testpassword!';
const noLowercasePassword = 'TESTPASSWORD1!';
const noUppercasePassword = 'testpassword1!';
const perfectPassword = 'Testpassword1!';
const differentpassword = 'differentpassword';

const PasswordFieldWrapper = () => {
  const [password, setPassword] = useState('');
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<{ password: string }>({ mode: 'onBlur' });
  return (
    <PasswordField
      label={mockProps.label}
      registerName={mockProps.registerName as keyof { password: string }}
      password={password}
      setPassword={setPassword}
      register={register}
      watch={watch}
      errors={errors}
      compareWithField={mockProps.compareWithField}
    />
  );
};

const PasswordAndConfirmFieldWrapper = () => {
  const [password, setPassword] = useState('');
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>({
    mode: 'onBlur',
  });
  return (
    <>
      <PasswordField
        label='パスワード'
        registerName={'password' as keyof { password: string }}
        password={password}
        setPassword={setPassword}
        register={register}
        watch={watch}
        errors={errors}
        compareWithField={mockProps.compareWithField}
      />
      <PasswordField
        label='パスワード確認用'
        registerName={'confirmPassword' as keyof { confirmPassword: string }}
        password={password}
        setPassword={setPassword}
        register={register}
        watch={watch}
        errors={errors}
        compareWithField={mockProps.compareWithField}
      />
    </>
  );
};

describe('PasswordField Component', () => {
  const user = userEvent.setup();

  it('正しくレンダリングされている', () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const label = container.querySelector('label');
    const placeholder = container.querySelector('span');

    // assert
    expect(label).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });

  it('ボタンを押すとパスワードが表示される', async () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const input = container.querySelector('input') as HTMLInputElement;
    const button = screen.getByRole('button');

    // act
    await user.type(input, mockProps.password);
    await user.click(button);

    // assert
    expect(input.value).toBe(mockProps.password);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('入力文字数が少ない場合, バリデーションエラーが出る', async () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const input = container.querySelector('input') as HTMLInputElement;

    // act
    await user.type(input, shortPassword);
    await user.tab();

    // assert
    expect(screen.getByText(ERRMSG_PASSWORD_TOO_SHORT)).toBeInTheDocument();
  });

  it('記号が含まれない場合, バリデーションエラーが出る', async () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const input = container.querySelector('input') as HTMLInputElement;

    // act
    await user.type(input, noSymbolPassword);
    await user.tab();

    // assert
    expect(screen.getByText(ERRMSG_PASSWORD_NO_SYMBOL)).toBeInTheDocument();
  });

  it('数字が含まれない場合, バリデーションエラーが出る', async () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const input = container.querySelector('input') as HTMLInputElement;

    // act
    await user.type(input, noNumberPassword);
    await user.tab();

    // assert
    expect(screen.getByText(ERRMSG_PASSWORD_NO_NUMBER)).toBeInTheDocument();
  });

  it('小文字が含まれない場合, バリデーションエラーが出る', async () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const input = container.querySelector('input') as HTMLInputElement;

    // act
    await user.type(input, noLowercasePassword);
    await user.tab();

    // assert
    expect(screen.getByText(ERRMSG_PASSWORD_NO_LOWERCASE)).toBeInTheDocument();
  });

  it('大文字が含まれない場合, バリデーションエラーが出る', async () => {
    // arrange
    const { container } = render(<PasswordFieldWrapper />);
    const input = container.querySelector('input') as HTMLInputElement;

    // act
    await user.type(input, noUppercasePassword);
    await user.tab();

    // assert
    expect(screen.getByText(ERRMSG_PASSWORD_NO_UPPERCASE)).toBeInTheDocument();
  });

  it('パスワードが一致しない場合, バリデーションエラーが出る', async () => {
    // arrange
    const { container } = render(<PasswordAndConfirmFieldWrapper />);
    const passwordInput = container.querySelector('input') as HTMLInputElement;
    const confirmInput = container.querySelectorAll(
      'input',
    )[1] as HTMLInputElement;

    // act
    await user.type(passwordInput, perfectPassword);
    await user.tab();
    await user.type(confirmInput, differentpassword);
    await user.tab();

    // assert
    expect(screen.getByText(ERRMSG_PASSWORD_MISMATCH)).toBeInTheDocument();
  });
});
