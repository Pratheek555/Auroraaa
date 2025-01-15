import Typography from '@mui/material/Typography';


const Footer = () => {
  return (
    <Typography
      mt={1}
      px={1}
      pb={{ xs: 1.5, sm: 1, lg: 0 }}
      color="text.secondary"
      variant="body2"
      sx={{ textAlign: { xs: 'center', md: 'right' } }}
      letterSpacing={0.5}
    >
      <img src="https://cdn-icons-png.flaticon.com/512/508/508786.png" alt="heart icon" height={24} width={24} style={{ marginRight: 8 }} />
      Aurora
      
    </Typography>
  );
};

export default Footer;
