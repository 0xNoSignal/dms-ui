import { mode } from "@chakra-ui/theme-tools";
const config = {
  initialColorMode: "dark" as "dark",
  useSystemColorMode: true,
};
const theme = {
  config,
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg: mode("brandGreen.100", "brandGreen.900")(props),
        height: "100%",
      },
    }),
  },
  colors: {
    brandGreen: {
      900: "#121714",
      600: "#04724D",
      800: "#023B28",
      700: "#034F35",
      400: "#069D6B",
      300: "#07C586",
      200: "#A7F3D0",
      100: "#EFFFFA",
    },
  },
  fonts: {
    body: "Figtree, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: 8,
      },
      variants: {
        primary: {
          bg: "brandGreen.600",
          borderColor: "brandGreen.600",
          borderStyle: "solid",
          borderWidth: "1px",
          color: "white",
          fontSize: 16,
          px: 8,
        },
        secondary: {
          fontWeight: "regular",
          bg: "white",
          color: "brandGreen.900",
          borderColor: "brandGreen.600",
          borderStyle: "solid",
          borderWidth: "1px",
        },
        third: {
          color: "brandGreen.400",
          fontWeight: "light",
        },
        select: {
          fontWeight: "bold",
          bg: "white",
          color: "black",
          borderColor: "gray.300",
          borderStyle: "solid",
          borderWidth: "1px",
          my: 1,
          w: "100%",
          px: 2,
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
        fontSize: "l",
        mb: 4,
      },
    },
    Text: {
      variants: {
        baseStyle: { color: "brandGrenn.900" },
        header: {
          fontWeight: "regular",
          opacity: 0.6,
          fontSize: 12,
        },
        subline: {
          fontWeight: "bold",
          fontSize: {
            base: 16,
            md: 20,
          },
        },
      },
    },
  },
};

export default theme;
