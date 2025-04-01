
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, GridItem, Text, useDisclosure, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { DeleteIcon, ViewIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { CiMenuKebab } from "react-icons/ci";
import { getApi } from 'services/api';
import Add from "./Add";
import Edit from './Edit';
import AddEmailHistory from "../emailHistory/components/AddEmail";
import AddPhoneCall from "../phoneCall/components/AddPhoneCall";
import { HasAccess } from "../../../redux/accessUtils";
import CommonCheckTable from "../../../components/reactTable/checktable";
import ImportModal from "./components/ImportModel";
import CommonDeleteModel from 'components/commonDeleteModel';
import { deleteManyApi } from 'services/api';
import { fetchContactData } from '../../../redux/slices/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactCustomFiled } from '../../../redux/slices/contactCustomFiledSlice';
import { toast } from 'react-toastify';

const Index = () => {
    const navigate = useNavigate();
    const [permission, emailAccess, callAccess] = HasAccess(['Contacts', 'Emails', 'Calls']);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const [isLoding, setIsLoding] = useState(false);
    const [action, setAction] = useState(false);
    const [columns, setColumns] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [deleteModel, setDelete] = useState(false);
    const [addPhoneCall, setAddPhoneCall] = useState(false);
    const [callSelectedId, setCallSelectedId] = useState();
    const [addEmailHistory, setAddEmailHistory] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [selectedValues, setSelectedValues] = useState([]);
    const [isImportContact, setIsImport] = useState(false);
    const [emailRec, setEmailRec] = useState('');
    const [phoneRec, setPhoneRec] = useState({});

    const data = useSelector((state) => state?.contactData?.data)

    const handleOpenEmail = (id, dataContact) => {
        if (id) {
            setEmailRec(dataContact?.email);
            setAddEmailHistory(true);
        }
    }

    const fetchCustomDataFields = async () => {
        setIsLoding(true);
        const result = await dispatch(fetchContactCustomFiled());
        if (result?.payload?.status === 200) {
            setContactData(result?.payload?.data);
        } else {
            toast.error("Failed to fetch data", "error");
        }
        const actionHeader = {
            Header: "Action", accessor: "action", isSortable: true, center: true,
            cell: ({ row }) => (
                <Text fontSize="md" fontWeight="900" textAlign={"center"} >
                    <Menu isLazy  >
                        <MenuButton><CiMenuKebab /></MenuButton>
                        <MenuList minW={'fit-content'} transform={"translate(1520px, 173px);"}>
                            {permission?.update &&
                                <MenuItem py={2.5} icon={<EditIcon fontSize={15} mb={1} />} onClick={() => { setEdit(true); setSelectedId(row?.values?._id); }}>Edit</MenuItem>}
                            {callAccess?.create &&
                                <MenuItem py={2.5} width={"165px"} onClick={() => { setPhoneRec(row?.original); setAddPhoneCall(true); setCallSelectedId(row?.values?._id); }} icon={<PhoneIcon fontSize={15} mb={1} />}>Create Call</MenuItem>}
                            {emailAccess?.create &&
                                <MenuItem py={2.5} width={"165px"} onClick={() => {
                                    handleOpenEmail(row?.values?._id, row?.original); setSelectedId(row?.values?._id)
                                }} icon={<EmailIcon fontSize={15} mb={1} />}>Send Email</MenuItem>}
                            {permission?.view &&
                                <MenuItem py={2.5} color={'green'} icon={<ViewIcon mb={1} fontSize={15} />} onClick={() => { navigate(`/contactView/${row?.values?._id}`) }}>View</MenuItem>}
                            {permission?.delete &&
                                <MenuItem py={2.5} color={'red'} icon={<DeleteIcon fontSize={15} mb={1} />} onClick={() => { setDelete(true); setSelectedValues([row?.values?._id]); }}>Delete</MenuItem>}
                        </MenuList>
                    </Menu>
                </Text>
            )
        };

        const tempTableColumns = [
            { Header: "#", accessor: "_id", isSortable: false, width: 10 },
            ...(result?.payload?.data && result.payload.data.length > 0
                ? result.payload.data[0]?.fields
                    ?.filter((field) => field?.isTableField === true && field?.isView)
                    ?.map(
                        (field) => ({
                            Header: field?.label,
                            accessor: field?.name,
                            cell: (cell) => (
                                <div className="selectOpt">
                                    <Text
                                        onClick={() => {
                                            navigate(`/contactView/${cell?.row?.original?._id}`);
                                        }}
                                        me="10px"
                                        sx={{ '&:hover': { color: 'blue.500', textDecoration: 'underline' }, cursor: 'pointer' }}
                                        color='brand.600'
                                        fontSize="sm"
                                        fontWeight="700"
                                    >
                                        {cell?.value || "-"}
                                    </Text>
                                </div>
                            ),
                        })
                    ) || []
                : []),
            ...(result?.payload?.data?.[0]?.fields || []) // Check if fields is defined, if not, use empty array
                .filter(field => field?.isTableField === true && !field?.isView) // Filter out fields where isTableField is true
                .map(field => ({ Header: field?.label, accessor: field?.name })),
            ...(permission?.update || permission?.view || permission?.delete ? [actionHeader] : [])
        ];

        setColumns(tempTableColumns);
        setIsLoding(false);
    };

    const handleDeleteContact = async (ids) => {
        try {
            setIsLoding(true)
            let response = await deleteManyApi('api/contact/deleteMany', ids)
            if (response.status === 200) {
                setSelectedValues([])
                setDelete(false)
                setAction((pre) => !pre)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoding(false)
        }
    }

    useEffect(async () => {
        // fetchData();
        await dispatch(fetchContactData())
        fetchCustomDataFields();
    }, [action]);

    return (
        <div className="bg-gray-200 rounded-[20px] overflow-hidden">
               <div className="contactbackground  text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-2">Contact Management</h1>
              <p className="text-blue-100 text-[18px]">Manage your contacts efficiently</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Hero"
              className=" w-68  border-white h-44 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={4}>
                {!isLoding &&
                    <GridItem colSpan={6}>
                        <CommonCheckTable
                            title={"Clients"}
                            isLoding={isLoding}
                            columnData={columns ?? []}
                            // dataColumn={dataColumn ?? []}
                            allData={data ?? []}
                            tableData={data}
                            tableCustomFields={contactData?.[0]?.fields?.filter((field) => field?.isTableField === true) || []}
                            access={permission}
                            // action={action}
                            // setAction={setAction}
                            // selectedColumns={selectedColumns}
                            // setSelectedColumns={setSelectedColumns}
                            // isOpen={isOpen}
                            // onClose={onclose}
                            onOpen={onOpen}
                            selectedValues={selectedValues}
                            setSelectedValues={setSelectedValues}
                            setDelete={setDelete}
                            setIsImport={setIsImport}
                        />
                    </GridItem>
                }
            </Grid>

            {isOpen && <Add isOpen={isOpen} size={"lg"} contactData={contactData[0]} onClose={onClose} setAction={setAction} action={action} />}
            {edit && <Edit isOpen={edit} size={"lg"} contactData={contactData[0]} selectedId={selectedId} setSelectedId={setSelectedId} onClose={setEdit} setAction={setAction} moduleId={contactData?.[0]?._id} />}
            {deleteModel && <CommonDeleteModel isOpen={deleteModel} onClose={() => setDelete(false)} type='Contacts' handleDeleteData={handleDeleteContact} ids={selectedValues} />}
            {addEmailHistory && <AddEmailHistory fetchData={fetchContactData} isOpen={addEmailHistory} onClose={setAddEmailHistory} id={selectedId} contactEmail={emailRec} />}
            {addPhoneCall && <AddPhoneCall fetchData={fetchContactData} isOpen={addPhoneCall} onClose={setAddPhoneCall} id={callSelectedId} cData={phoneRec} />}
            {isImportContact && <ImportModal text='Contact file' isOpen={isImportContact} onClose={setIsImport} customFields={contactData?.[0]?.fields || []} />}

</div>
        </div>
    )
}

export default Index
