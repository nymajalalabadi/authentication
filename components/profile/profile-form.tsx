import classes from './profile-form.module.css';
import { useRef } from 'react';

export default function ProfileForm(props: { onChangePassword: (data: { newPassword: string, oldPassword: string }) => void }) {
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const oldPasswordInputRef = useRef<HTMLInputElement>(null);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newPassword = newPasswordInputRef.current!.value;
    const oldPassword = oldPasswordInputRef.current!.value;

    props.onChangePassword({newPassword: newPassword, oldPassword: oldPassword});
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}