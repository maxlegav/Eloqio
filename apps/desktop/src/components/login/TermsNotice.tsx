import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { ELOQUIO_CONFIG } from "../../enterprise/config";

type TermsNoticeProps = {
  align?: "left" | "center";
};

export const TermsNotice = ({ align = "center" }: TermsNoticeProps) => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      textAlign={align}
      sx={{
        maxWidth: 300,
        alignSelf: align === "center" ? "center" : "flex-start",
        fontSize: "0.75rem",
      }}
    >
      <FormattedMessage
        defaultMessage="By using {appName}, you agree to our"
        values={{ appName: ELOQUIO_CONFIG.appName }}
      />{" "}
      <a
        href={`${ELOQUIO_CONFIG.website}/terms`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        <FormattedMessage defaultMessage="Terms & Conditions" />
      </a>{" "}
      <FormattedMessage defaultMessage="and" />{" "}
      <a
        href={`${ELOQUIO_CONFIG.website}/privacy`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        <FormattedMessage defaultMessage="Privacy Policy" />
      </a>
    </Typography>
  );
};
