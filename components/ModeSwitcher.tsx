import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { TbSun, TbMoon } from "react-icons/tb";

export default function ModeSwitcher() {
  const { toggleColorMode, colorMode } = useColorMode();
  
  return (
    <IconButton
      mx={2}
      onClick={toggleColorMode}
      aria-label="Switch Color Mode"
      bg="transparent"
      _hover={{ bg: "transparent" }}
      icon={colorMode === "light" ? <TbMoon /> : <TbSun />}
    />
  );
}
