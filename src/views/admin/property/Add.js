import { CloseIcon } from '@chakra-ui/icons';
import { Checkbox, FormLabel, Input, Radio, RadioGroup, Select, Stack, ModalFooter, Textarea , Flex, Grid, GridItem, Button, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {getApi, postApi } from 'services/api';
import { generateValidationSchema } from 'utils';
import CustomForm from 'utils/customForm';
import ContactModel from "components/commonTableModel/ContactModel";
import LeadModel from "components/commonTableModel/LeadModel";
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { LiaMousePointerSolid } from 'react-icons/lia';


const Add = (props) => {
    const [isLoding, setIsLoding] = useState(false)
    const { onClose, isOpen, id, fetchData, setAction, action, access, contactAccess, leadAccess , view } = props
    const contactData = useSelector((state) => state?.contactData?.data)
    const [contactModelOpen, setContactModel] = useState(false);
    const [leadModelOpen, setLeadModel] = useState(false);
    const leadData = useSelector((state) => state?.leadData?.data);
    const [assignToLeadData, setAssignToLeadData] = useState([]);
    const [assignToContactData, setAssignToContactData] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))
    

    
    const initialFieldValues = Object.fromEntries(
        (props?.propertyData?.fields || []).map(field => [field?.name, ''])
    );

    const initialValues = {
        ...initialFieldValues,
        createBy: JSON.parse(localStorage.getItem('user'))._id
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: yup.object().shape(generateValidationSchema(props?.propertyData?.fields)),

        onSubmit: (values, { resetForm }) => {
            AddData();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, } = formik


    const AddData = async () => {
        try {
            setIsLoding(true)
            let response = await postApi('api/form/add', { ...values, moduleId: props?.propertyData?._id })
            if (response.status === 200) {
                props.onClose();
                formik.resetForm();
                props.setAction((pre) => !pre)
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            setIsLoding(false)
        }
    };

    useEffect(async () => {
        values.start = props?.date;
        if (view === true) {
            if (values.category === "Contact" && assignToContactData.length <= 0) {
                setAssignToContactData(contactData);
            }
        } else {
            try {
                let result;
                if (values.category === "Contact" && assignToContactData.length <= 0) {
                    result = await getApi(user.role === 'superAdmin' ? 'api/contact/' : `api/contact/?createBy=${user._id}`);
                    setAssignToContactData(result?.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [props, values.category]);
    
  

    return (
        <div>
              <Modal onClose={onClose} isOpen={isOpen} size={'5xl'} isCentered >
              <ModalOverlay />
              <ModalContent height={"650px"}>
                    <ModalHeader alignItems={"center"} justifyContent='space-between' display='flex' >
                        Add Property
                        <IconButton onClick={props.onClose} icon={<CloseIcon />} />
                    </ModalHeader>
                    <ModalBody overflowY={"auto"} height={"600px"} >

                        <CustomForm moduleData={props.propertyData} values={values} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />
                        </ModalBody>


                        <ModalFooter>
                        <Button size="sm" sx={{ textTransform: "capitalize" }} disabled={isLoding ? true : false} variant="brand" type="submit" onClick={handleSubmit}                        >
                            {isLoding ? <Spinner /> : 'Save'}
                        </Button>
                        <Button size="sm"
                            variant="outline"
                            colorScheme='red'
                            sx={{
                                marginLeft: 2,
                                textTransform: "capitalize",
                            }}
                            onClick={props.onClose}
                        >
                            Close
                        </Button>
                        </ModalFooter>

                    </ModalContent>
            </Modal>
        </div>
    )
}

export default Add
