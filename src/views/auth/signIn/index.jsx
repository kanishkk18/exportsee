

import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,          
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { postApi } from "services/api";
import { loginSchema } from "schema";
import { toast } from "react-toastify";
import Spinner from "components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../../../redux/slices/imageSlice";
import { setUser } from "../../../redux/slices/localSlice";
import { GoogleOneTap, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { BsGoogle } from "react-icons/bs";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";




function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [isLoding, setIsLoding] = React.useState(false);
  const [checkBox, setCheckBox] = React.useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  
  const tabStyle = {
    container: {
      width: "400px",
      fontFamily: "sans-serif",
    },
    tabsList: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      width: "100%",
      borderBottom: "1px solid #e2e8f0",
      marginBottom: "16px",
    },
    tabsTrigger: {
      padding: "8px 16px",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    activeTabsTrigger: {
      borderBottom: "2px solid #3182ce",
      color: "#3182ce",
    },
    card: {
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      overflow: "hidden",
    },
    cardHeader: {
      padding: "16px",
      borderBottom: "1px solid #e2e8f0",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: "0 0 8px 0",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#718096",
      margin: 0,
    },
    cardContent: {
      padding: "16px",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "4px",
      fontSize: "14px",
    },
    cardFooter: {
      padding: "16px",
      borderTop: "1px solid #e2e8f0",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#3182ce",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    // Dispatch the fetchRoles action on component mount
    dispatch(fetchImage("?isActive=true"));
  }, [dispatch]);

  const image = useSelector((state) => state?.images?.images);

  const [show, setShow] = React.useState(false);
  const showPass = () => setShow(!show);

  const initialValues = {
    username: "",
    password: "",
  };
  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      login();
    },
  });
  const navigate = useNavigate();

  const login = async () => {
    try {
      setIsLoding(true);
      let response = await postApi("api/user/login", values, checkBox);
      if (response && response.status === 200) {
        navigate("/superAdmin");
        toast.success("Login Successfully!");
        resetForm();
        dispatch(setUser(response?.data?.user))
      } else {
        toast.error(response.response.data?.error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };

  return (
     
    <DefaultAuth
      illustrationBackground={image?.length > 0 && image[0]?.authImg}
      image={image?.length > 0 && image[0]?.authImg}
    >
    <a href="https://exporteese.com/" className="flex w-fit -ml-10 -mt-10 justify-center items-center px-3 py-1 gap-1 border rounded-full"> <BiLeftArrowAlt/> Back to main</a>

      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="fit-content"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column">
        <Box >
        <div className="flex w-full mb-6  ml-10 flex-col justify-center gap-2 items-center text-center">
          <div className="flex justify-center items-center ">
            <img
              className="h-[60px] mb-4  rounded-full w-[60px] "
              src='https://res.cloudinary.com/dna3hwzre/image/upload/v1741499065/473408572_1590238345196986_2661325784945347044_n_ii9ax7.jpg' 
              alt="Logo"
            />
          </div>
            <h1 className="text-4xl mb-3 font-bold">Welcome back</h1>
          </div>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
           <div style={tabStyle.container}>
      <div style={tabStyle.tabsList}>
        <button
          style={{
            ...tabStyle.tabsTrigger,
            ...(activeTab === "account" ? tabStyle.activeTabsTrigger : {}),
          }}
          onClick={() => setActiveTab("account")}
        >
          Users
        </button>
        <button
          style={{
            ...tabStyle.tabsTrigger,
            ...(activeTab === "password" ? tabStyle.activeTabsTrigger : {}),
          }}
          onClick={() => setActiveTab("password")}
        >
          Team Members
          </button>
      </div>

      {activeTab === "account" && (
        <div className="flex w-full flex-col gap-2 justify-center items-center">
          
  <button className=" min-w-full border px-4 py-2 text-center rounded-3xl gap-2 flex justify-center  items-center mb-2">
     <BsGoogle/> <SignInButton/></button>
     
     <button className=" min-w-full border px-4 py-2 text-center rounded-3xl gap-2 flex justify-center  items-center mb-2">
     <BsGoogle/> <SignUpButton/></button>
        </div>
      )}

      {activeTab === "password" && (
         <form onSubmit={handleSubmit} className="dark:text-white">
         <FormControl isInvalid={errors.username && touched.username}>
           <FormLabel
             display="flex"
             ms="4px"
             fontSize="sm"
             fontWeight="500"
             color={textColor}
             mb="8px"
           >
             Email<Text color={brandStars}>*</Text>
           </FormLabel>
           <Input
          
           borderRadius={16}
             fontSize="sm"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
             name="username"
             ms={{ base: "0px", md: "0px" }}
             type="email"
             placeholder="hello@gmail.com"
             mb={errors.username && touched.username ? undefined : "10px"}
             fontWeight="500"
             size="lg"
             borderColor={
               errors.username && touched.username ? "red.300" : null
             }
             className={
               errors.username && touched.username ? "isInvalid " : null
             }
           />
           {errors.username && touched.username && (
             <FormErrorMessage mb="24px">
               {" "}
               {errors.username}
             </FormErrorMessage>
           )}
         </FormControl>

         <FormControl
           isInvalid={errors.password && touched.password}
           mb="24px"
         >
           <FormLabel
             ms="4px"
             fontSize="sm"
             fontWeight="500"
             color={textColor}
             display="flex"
           >
             Password<Text color={brandStars}>*</Text>
           </FormLabel>
           <InputGroup size="md">
             <Input
               isRequired={true}
               fontSize="sm"
               placeholder="Enter Your Password"
               name="password"
               mb={errors.password && touched.password ? undefined : "10px"}
               value={values.password}
               onChange={handleChange}
               onBlur={handleBlur}
               size="lg"
               variant="auth"
               type={show ? "text" : "password"}
               borderColor={
                 errors.password && touched.password ? "red.300" : null
               }
               className={
                 errors.password && touched.password ? "isInvalid" : null
               }
             />
             <InputRightElement display="flex" alignItems="center" mt="4px">
               <Icon
                 color={textColorSecondary}
                 _hover={{ cursor: "pointer" }}
                 as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                 onClick={showPass}
               />
             </InputRightElement>
           </InputGroup>
           {errors.password && touched.password && (
             <FormErrorMessage mb="24px">
               {" "}
               {errors.password}
             </FormErrorMessage>
           )}
           <Flex justifyContent="space-between" align="center" mb="24px">
             <FormControl display="flex" alignItems="center">
               <Checkbox
                 onChange={(e) => setCheckBox(e.target.checked)}
                 id="remember-login"
                 value={checkBox}
                 defaultChecked
                 colorScheme="brandScheme"
                 me="10px"
               />
               <FormLabel
                 htmlFor="remember-login"
                 mb="0"
                 fontWeight="normal"
                 color={textColor}
                 fontSize="sm"
               >
                 Keep me logged in
               </FormLabel>
             </FormControl>
           </Flex>

           <Flex
             justifyContent="space-between"
             align="center"
             mb="20px"
           ></Flex>
           <button
             fontSize="sm"
             type="submit"
             
             className="bg-[#0F172A] inline-flex items-center justify-center whitespace-nowrap rounded-[14px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-white hover:bg-muted/40 h-12 px-4 py-2 w-full"
             disabled={isLoding ? true : false}
           >
             {isLoding ? <Spinner /> : "Continue"}
           </button>

         </FormControl>
         
       </form>
       
      )}
                 <p className="text-[14px] ml-3 my-4 text-gray-600 text-center">  Hey! Login to continue with your Exportseese.</p>

    </div>
              
      
       
    
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
