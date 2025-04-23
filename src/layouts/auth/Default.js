// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
import Footer from "components/footer/FooterAuth";
import { Link } from "react-router-dom";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

function AuthIllustration(props) {
  const { children, illustrationBackground } = props;

  return (
    <Flex h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "100vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="center"
        direction="column"
      >
        {children}
        <Box
          display={{ base: "none", md: "flex" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          borderBottomLeftRadius={{ lg: "80px", xl: "160px" }}
          justifyContent="center"
          position="absolute"
          flexDirection="column"
          alignItems="center"
          overflow="hidden"
          right="0px"
        >
         
            {/* <div className="flex-1 w-full rounded-bl-[10rem] bg-gradient-to-br from-purple-400 via-blue-600 to-blue-700 p-8 hidden lg:flex flex-col items-center justify-center text-center">
              <div className="bg-white rounded-full p-8 mb-8">
                <div className="w-24 h-24 rounded-full bg-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Exportseese</h2>
              <Link
                to="/"
                className="text-white/80 hover:text-white bg-white/10 px-6 py-3 rounded-full"
              >
                <span className="block font-semibold">Exportseese.com</span>
              </Link>
            </div> */}
             <Link to="https://exporteese.com/" target="_blank" style={{ height: "100%", width: "100%" }}>
              {/* <Flex
                bg={`url(${illustrationBackground})`}
                justify="center"
                align="center"
                w="100%"
                h="100%"
                bgSize="cover"
                bgPosition="50%"
              /> */}
               <img
      src="https://i.pinimg.com/736x/52/fa/1e/52fa1e5af83f30d9f8b3abaef66da4ec.jpg"
      alt="Illustration Background"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
            </Link>
        
        </Box>
        <Footer />
      </Flex>
      <FixedPlugin/>
    </Flex>
  );
}

export default AuthIllustration;
