import { Stack, Typography, type StackProps } from "@mui/material";
import { ELOQUIO_CONFIG } from "../../enterprise/config";
import { Logo } from "./Logo";

export type LogoWithTextProps = StackProps;

export const LogoWithText = ({ sx, ...rest }: LogoWithTextProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        ...sx,
      }}
      {...rest}
    >
      <Logo sx={{ mr: 1 }} />
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          userSelect: "none",
          display: { xs: "none", sm: "block" },
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: "italic",
          letterSpacing: "0.02em",
        }}
      >
        {ELOQUIO_CONFIG.appName}
      </Typography>
    </Stack>
  );
};
