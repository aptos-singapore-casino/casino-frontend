import { extendTheme } from "@mui/joy";

const primaryPalette = {
  "50": "#ecfdf5",
  "100": "#d1fae5",
  "200": "#a7f3d0",
  "300": "#6ee7b7",
  "400": "#34d399",
  "500": "#10b981",
  "600": "#059669",
  "700": "#047857",
  "800": "#065f46",
  "900": "#064e3b",
};

const neutralPalette = {
  "50": "#f5f7fa",
  "100": "#e4e7eb",
  "200": "#cbd2d9",
  "300": "#9aa5b1",
  "400": "#7b8794",
  //Solid background
  "500": "#616e7c",
  //TBD
  "600": "#52606d",
  //Level 2
  "700": "#3e4c59",
  //Level 2 and soft
  "800": "#323f4b",
  //Surface (card background)
  "900": "#12161c",
};

export const defaultTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: primaryPalette,
        neutral: neutralPalette,
        focusVisible: "rgba(3, 102, 214, 0.3)",
      },
    },
    dark: {
      palette: {
        primary: primaryPalette,
        neutral: neutralPalette,
        text: {
          primary: "var(--joy-palette-neutral-50)",
          secondary: "var(--joy-palette-neutral-100)",
          icon: "var(--joy-palette-neutral-50)",
        },
        background: {
          body: "#101418",
        },
        focusVisible: "rgba(3, 102, 214, 0.3)",
      },
    },
  },
  focus: {
    default: {
      outlineWidth: "3px",
    },
  },
  fontFamily: {
    body: "SF Pro Text, var(--gh-fontFamily-fallback)",
  },
  components: {
    JoyListItem: {
      styleOverrides: {
        root: {
          "--ListItem-minHeight": "2rem",
          "--ListItem-paddingY": "0.25rem",
        },
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "6px",
          boxShadow: "0 1px 0 0 rgba(27, 31, 35, 0.04)",
          transition: "80ms cubic-bezier(0.33, 1, 0.68, 1)",
          transitionProperty: "color,background-color,box-shadow,border-color",
          ...(ownerState.size === "md" && {
            fontWeight: 600,
            minHeight: "32px",
            fontSize: "14px",
            "--Button-paddingInline": "1rem",
          }),
          ...(ownerState.color === "success" &&
            ownerState.variant === "solid" && {
              "--gh-palette-focusVisible": "rgba(46, 164, 79, 0.4)",
              border: "1px solid rgba(27, 31, 36, 0.15)",
              "&:active": {
                boxShadow: "inset 0px 1px 0px rgba(20, 70, 32, 0.2)",
              },
            }),
          ...(ownerState.color === "neutral" &&
            ownerState.variant === "outlined" && {
              "&:active": {
                boxShadow: "none",
              },
            }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "6px",
          boxShadow: "0 1px 0 0 rgba(27, 31, 35, 0.04)",
          transition: "80ms cubic-bezier(0.33, 1, 0.68, 1)",
          transitionProperty: "color,background-color,box-shadow,border-color",
          ...(ownerState.size === "md" && {
            fontWeight: 600,
            minHeight: "32px",
            fontSize: "14px",
            "--Button-paddingInline": "1rem",
          }),
          ...(ownerState.color === "success" &&
            ownerState.variant === "solid" && {
              "--gh-palette-focusVisible": "rgba(46, 164, 79, 0.4)",
              border: "1px solid rgba(27, 31, 36, 0.15)",
              "&:active": {
                boxShadow: "inset 0px 1px 0px rgba(20, 70, 32, 0.2)",
              },
            }),
          ...(ownerState.color === "neutral" &&
            ownerState.variant === "outlined" && {
              "&:active": {
                boxShadow: "none",
              },
            }),
        }),
      },
    },
  },
});
