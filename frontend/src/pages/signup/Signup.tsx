// Signup.tsx
import { Button, TextInput, PasswordInput, Stack, Title, Paper, Box, Group, Text } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';
import { UserRequestDto } from '@/types/UserTypes';
import { userService } from '@/services/UsersService';

interface SignupValues {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required')
});

const initialValues: SignupValues = {
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: ''
};

export default function SignupForm() {
  const navigate = useNavigate();
  const handleSubmit = async (
    values: SignupValues,
    { setSubmitting, setStatus }: FormikHelpers<SignupValues>
  ) => {
    try {
      // Convert form values to UserRequestDto
      const userData: UserRequestDto = {
        userId: 0, // userId is auto-generated
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: 'USER' // Default role
      };

      // Call the user service to create the user
      const userId = await userService.createUser(userData);
      
      console.log('User created with ID:', userId);
      localStorage.setItem('userId', userId.toString());
      
      // Redirect to login after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Signup failed. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className={classes.fullPageContainer}>
      <Title order={1} className={classes.siteTitle}>
        MaroX
      </Title>

      <Paper className={classes.signupPaper} radius="md">
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack className={classes.stackGap}>
                <Title order={2} className={classes.signupTitle}>
                  Create Account
                </Title>

                <Group grow className={classes.groupGap}>
                  <TextInput
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && errors.firstName}
                    classNames={{
                      input: classes.signupInput,
                      label: classes.signupLabel
                    }}
                  />
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && errors.lastName}
                    classNames={{
                      input: classes.signupInput,
                      label: classes.signupLabel
                    }}
                  />
                </Group>

                <TextInput
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && errors.username}
                  classNames={{
                    input: classes.signupInput,
                    label: classes.signupLabel
                  }}
                />

                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  classNames={{
                    input: classes.signupInput,
                    label: classes.signupLabel
                  }}
                />

                <PasswordInput
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  classNames={{
                    input: classes.signupInput,
                    label: classes.signupLabel,
                    innerInput: classes.signupLabel
                  }}
                />

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className={classes.signupButton}
                  fullWidth
                >
                  Sign Up
                </Button>

                <Group justify="center" mt="md">
                  <Text c="black" size="sm">Already have an account?</Text>
                  <Button
                    variant="outline"
                    component={Link}
                    to="/login"
                    className={classes.loginButton}
                  >
                    Login
                  </Button>
                </Group>
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}