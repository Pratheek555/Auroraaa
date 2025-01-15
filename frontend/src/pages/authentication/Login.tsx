import { useState, ChangeEvent, FormEvent } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import axios from 'axios';
import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';

interface User {
  [key: string]: string;
}

const Login = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const username = user.email;
    const password = user.password;

    const bodyParameter = {
      username,
      password
    }

    axios.post(
      "http://127.0.0.1:8000/auth/login",
      QueryString.stringify(bodyParameter),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

    )
      .then((response) => {
        console.log(response.data.access_token);
        const token = response.data.access_token;

        localStorage.setItem("authToken", token);
        navigate('/Aurora')
      })
      .catch((error) => {
        console.error(error);
      })



    e.preventDefault();
    console.log(user);
  };

  return (
    <>
      <Typography align="center" variant="h3" fontWeight={600}>
        LogIn
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} mt={4} spacing={2} width={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<IconifyIcon icon="uim:google" />}
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<IconifyIcon icon="uim:apple" />}
        >
          Login with Apple
        </Button>
      </Stack>
      <Divider sx={{ my: 3 }}>or Login with</Divider>
      <Stack onSubmit={handleSubmit} component="form" direction="column" gap={2}>
        <TextField
          id="username"
          name="email"
          type="text"
          value={user.email}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Email"
          autoComplete="email"
          fullWidth
          autoFocus
          required
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          autoFocus
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ opacity: user.password ? 1 : 0 }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <IconifyIcon icon={showPassword ? 'ion:eye' : 'ion:eye-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack mt={-1.5} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox id="checkbox" name="checkbox" color="primary" />}
            label="Remember me"
          />
          <Link href="#!" fontSize="body2.fontSize" letterSpacing={0.5}>
            Forgot password?
          </Link>
        </Stack>
        <Button type="submit" variant="contained" size="medium" fullWidth>
          Submit
        </Button>
        <Typography
          my={3}
          color="text.secondary"
          variant="body2"
          align="center"
          letterSpacing={0.5}
        >
          Don't have an account? <Link href={paths.signup}>{'Signup'}</Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Login;
