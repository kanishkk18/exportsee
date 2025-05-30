import React, { useState } from 'react';
import { FormLabel, Grid, GridItem,Button, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Select } from '@chakra-ui/react';
import { CloseIcon, PhoneIcon } from '@chakra-ui/icons';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { userSchema } from 'schema';
import { putApi, postApi } from 'services/api';
import Spinner from 'components/spinner/Spinner';

const AddEditUser = (props) => {
    const { onClose, isOpen, setAction, data, userAction, userData, selectedId, fetchData, setUserAction } = props;
    const [isLoding, setIsLoding] = useState(false);
    const [show, setShow] = React.useState(false);
    const showPass = () => setShow(!show);

    const initialValues = {
        firstName: userAction === "add" ? '' : data?.firstName,
        lastName: userAction === "add" ? '' : data?.lastName,
        username: userAction === "add" ? '' : data?.username,
        phoneNumber: userAction === "add" ? '' : data?.phoneNumber,
        password: userAction === "add" ? '' : data?.password,
        passwordExpirationPeriod: userAction === "add" ? '3days' : data?.passwordExpirationPeriod,
    };

    const user = JSON.parse(window.localStorage.getItem('user'));

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            AddData();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, resetForm } = formik;

    const AddData = async () => {
        if (userAction === "add") {
            try {
                setIsLoding(true);
                let response = await postApi('api/user/register', values);
                if (response && response.status === 200) {
                    onClose();
                    resetForm();
                    setAction((pre) => !pre);
                    setUserAction('');
                } else {
                    toast.error(response.response.data?.message);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoding(false);
            }
        } else if (userAction === "edit") {
            try {
                setIsLoding(true);
                let response = await putApi(`api/user/edit/${selectedId}`, values);
                if (response && response.status === 200) {
                    fetchData();
                    let updatedUserData = userData;
                    if (user?._id === selectedId) {
                        if (updatedUserData && typeof updatedUserData === 'object') {
                            updatedUserData = {
                                ...updatedUserData,
                                firstName: values?.firstName,
                                lastName: values?.lastName,
                                passwordExpirationPeriod: values?.passwordExpirationPeriod,
                            };
                        }
                        localStorage.setItem('user', JSON.stringify(updatedUserData));
                    }
                    onClose();
                    setUserAction('');
                    setAction((pre) => !pre);
                } else {
                    toast.error(response.response.data?.message);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoding(false);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader justifyContent='space-between' display='flex'>
                    {userAction === "add" ? "Add" : "Edit"} User
                    <IconButton onClick={onClose} icon={<CloseIcon />} />
                </ModalHeader>
                <ModalBody>
                    <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                First Name<Text color={"red"}>*</Text>
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                name="firstName"
                                placeholder='First Name'
                                fontWeight='500'
                                borderColor={errors.firstName && touched.firstName ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.firstName && touched.firstName && errors.firstName}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Last Name
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                name="lastName"
                                placeholder='Last Name'
                                fontWeight='500'
                                borderColor={errors.lastName && touched.lastName ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.lastName && touched.lastName && errors.lastName}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Email<Text color={"red"}>*</Text>
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                type='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                name="username"
                                placeholder='Email Address'
                                fontWeight='500'
                                borderColor={errors.username && touched.username ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.username && touched.username && errors.username}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Phone Number<Text color={"red"}>*</Text>
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<PhoneIcon color="gray.300" borderRadius="16px" />}
                                />
                                <Input
                                    type="tel"
                                    fontSize='sm'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phoneNumber}
                                    name="phoneNumber"
                                    fontWeight='500'
                                    borderColor={errors.phoneNumber && touched.phoneNumber ? "red.300" : null}
                                    placeholder="Phone number"
                                    borderRadius="16px"
                                />
                            </InputGroup>
                            <Text mb='10px' color={'red'}>{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Password Expiration<Text color={"red"}>*</Text>
                            </FormLabel>
                            <Select
                                name="passwordExpirationPeriod"
                                value={values.passwordExpirationPeriod}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fontSize='sm'
                                fontWeight='500'
                            >
                                <option value="3days">3 Days</option>
                                <option value="1month">1 Month</option>
                                <option value="6months">6 Months</option>
                                <option value="1year">1 Year</option>
                                <option value="forever">Forever</option>
                            </Select>
                        </GridItem>

                        {userAction !== "add" && (
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Password
                                </FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        isRequired={true}
                                        fontSize='sm'
                                        placeholder='Enter Your Password'
                                        name='password'
                                        size='lg'
                                        variant='auth'
                                        type={show ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        borderColor={errors.password && touched.password ? "red.300" : null}
                                        className={errors.password && touched.password ? "isInvalid" : null}
                                    />
                                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                                        <Icon
                                            color={'gray.400'}
                                            _hover={{ cursor: "pointer" }}
                                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                            onClick={showPass}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <Text mb='10px' color={'red'}>{errors.password && touched.password && errors.password}</Text>
                            </GridItem>
                        )}

                        {userAction !== "edit" && (
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Password
                                </FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        isRequired={true}
                                        fontSize='sm'
                                        placeholder='Enter Your Password'
                                        name='password'
                                        size='lg'
                                        variant='auth'
                                        type={show ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        borderColor={errors.password && touched.password ? "red.300" : null}
                                        className={errors.password && touched.password ? "isInvalid" : null}
                                    />
                                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                                        <Icon
                                            color={'gray.400'}
                                            _hover={{ cursor: "pointer" }}
                                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                            onClick={showPass}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <Text mb='10px' color={'red'}>{errors.password && touched.password && errors.password}</Text>
                            </GridItem>
                        )}
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant='brand'
                        size="sm"
                        disabled={isLoding}
                        onClick={handleSubmit}
                    >
                        {isLoding ? <Spinner /> : 'Save'}
                    </Button>
                    <Button
                        sx={{
                            marginLeft: 2,
                            textTransform: "capitalize",
                        }}
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        onClick={() => {
                            formik.resetForm();
                            onClose();
                        }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddEditUser;
