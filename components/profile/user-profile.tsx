import classes from './user-profile.module.css';
import ProfileForm from './profile-form';

export default function UserProfile() {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}