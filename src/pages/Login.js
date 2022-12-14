import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import AuthSocialLogin from '../sections/authentication/login/AutnSocialLogin';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Đăng nhập | Đồ án 2">
      <AuthLayout>
        Chưa có tài khoản? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Đăng ký ngay
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          ĐỒ ÁN 2 || HỆ THỐNG GIÁM SÁT VÀ CẢNH BÁO NHIỆT ĐỘ ĐỘ ẨM
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Đăng Nhập Vào Hệ Thống, Giám Sát Và Cảnh Báo Nhiệt Độ Độ Ẩm
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Đăng Nhập Bằng Tài Khoản Google.
            </Typography>
          </Stack>
          <AuthSocialLogin />

          {/* <LoginForm /> */}

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Chưa có tài khoản?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="/register" underline="hover">
              Đăng ký ngay
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
