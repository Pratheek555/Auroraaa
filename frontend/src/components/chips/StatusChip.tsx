import Chip from '@mui/material/Chip';
import IconifyIcon from 'components/base/IconifyIcon';

interface StatusChipProps {
  status: 'treated' | 'canceled' | 'pending';
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      icon={
        <IconifyIcon
          icon="radix-icons:dot-filled"
          sx={(theme) => ({
            color:
              status === 'treated'
                ? `${theme.palette.success.main} !important`
                : status === 'pending'
                  ? `${theme.palette.warning.main} !important`
                  : `${theme.palette.error.main} !important`,
          })}
        />
      }
      label={status}
      sx={{
        pr: 0.65,
        width: 80,
        justifyContent: 'center',
        color:
          status === 'treated'
            ? 'success.main'
            : status === 'pending'
              ? 'warning.main'
              : 'error.main',
        letterSpacing: 0.5,
        bgcolor:
          status === 'treated'
            ? 'transparent.success.main'
            : status === 'pending'
              ? 'transparent.warning.main'
              : 'transparent.error.main',
        borderColor:
          status === 'treated'
            ? 'transparent.success.main'
            : status === 'pending'
              ? 'transparent.warning.main'
              : 'transparent.error.main',
      }}
    />
  );
};

export default StatusChip;
