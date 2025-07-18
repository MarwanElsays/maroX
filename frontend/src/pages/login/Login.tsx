import { Button, TextInput, PasswordInput, Stack, Title, Paper, Box, Group, Text } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Import if using React Router

interface FormValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});

const initialValues: FormValues = {
  email: '',
  password: ''
};

export default function LoginForm() {
  const navigate = useNavigate();
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('Logging in with:', values);
    navigate('/timeline');
    setSubmitting(false);
  };

  return (
    <Box className={styles.fullPageContainer}>
      <Title order={1} className={styles.siteTitle}>
        MaroX
      </Title>

      <Paper className={styles.loginPaper} shadow="xs">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
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
              <Stack>
                <Title order={2} className={styles.loginTitle}>
                  Sign In
                </Title>

                <TextInput
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  classNames={{
                    input: styles.loginInput,
                    label: styles.loginLabel
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
                    input: styles.loginInput,
                    label: styles.loginLabel,
                    innerInput: styles.loginLabel
                  }}
                />

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className={styles.loginButton}
                  fullWidth
                >
                  Login
                </Button>

                <Group justify="center" mt="md">
                  <Text size="sm">Don't have an account?</Text>
                  <Button
                    variant="outline"
                    component={Link}
                    to="/signup"
                    className={styles.signupButton}
                  >
                    Sign Up
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