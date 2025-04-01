// Chakra Imports
import { Button, Icon, useColorMode } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import React from "react";

export default function FixedPlugin(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";

  return (
    <Button
      {...rest}
      h='30px'
      w='30px'
      zIndex='99'
      bg={bgButton}
     
      variant='no-effects'
     
      border='1px solid'
      borderColor='#6A53FF'
      borderRadius='50px'
      onClick={toggleColorMode}
      display='flex'
      p='0px'
      align='center'
      justify='center'  className="mr-6">
      <Icon
        h='24px'
        w='24px'
        color='white'
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
       
      />
    </Button>
  );
}
