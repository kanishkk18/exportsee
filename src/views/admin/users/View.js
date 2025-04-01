import { AddIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Grid, FormLabel, GridItem, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import Card from "components/card/Card";
import { HSeparator } from "components/separator/Separator";
import Spinner from "components/spinner/Spinner";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getApi } from "services/api";
import Add from "./Add";
import Edit from "./Edit";
import RoleTable from "./components/roleTable";
import RoleModal from "./components/roleModal";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/localSlice";
import CommonDeleteModel from 'components/commonDeleteModel';
import { deleteApi } from "services/api";
import AddEditUser from './AddEditUser';
import { MdFileUpload, MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { BsCloudCheck } from "react-icons/bs";
import { Input } from "../../../components/ui/input";
import Storage from "./components/storage";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const View = () => {

  const RoleColumn = [
    { Header: '#', accessor: '_id', width: 10, display: false },
    { Header: 'Role Name', accessor: 'roleName' },
    { Header: "Description", accessor: "description", }
  ];
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user)
  const [isLogoutScheduled, setIsLogoutScheduled] = useState(false);

  const userName = typeof userData === 'string' ? JSON.parse(userData) : userData

  const param = useParams()
  const navigate = useNavigate()
  const handleOpenModal = (userData) => {
    setEdit(true)
    dispatch(setUser(userData)); // Dispatch setUser action to set user data
  };


  const [data, setData] = useState()
  const [roleData, setRoleData] = useState([])
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [edit, setEdit] = useState(false);
  const [deleteModel, setDelete] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [isLoding, setIsLoding] = useState(false)
  const [action, setAction] = useState(false)
  const [userAction, setUserAction] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const size = "lg";

  const handleOpen = (type) => {
    setUserAction(type)
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const fetchData = async () => {
    setIsLoding(true)
    let response = await getApi('api/user/view/', param.id)
    setData(response.data);
    setIsLoding(false)
  }

  useEffect(() => {
    if (param.id) {
      fetchData()
    }
  }, [action])

  useEffect(async () => {
    setIsLoding(true);
    let result = await getApi("api/role-access");
    setRoleData(result.data);
    setIsLoding(false);
  }, [])


  const handleDeleteClick = async () => {

    try {
      setIsLoding(true)
      let response = await deleteApi(`api/user/delete/`, param.id)
      if (response.status === 200) {
        setDelete(false)
        navigate(-1)
        setAction((pre) => !pre)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoding(false)
    }
  };


	const logOut = (message) => {
		localStorage.clear();
		sessionStorage.clear();
		navigate("/auth");
		if (message) {
			toast.error(message);
		} else {
			toast.success("Log out Successfully");
		}
		setIsLogoutScheduled(true);
	};

	useEffect(() => {
		const token =
			localStorage.getItem("token") || sessionStorage.getItem("token");

		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
				if (decodedToken.exp < currentTime) {
					if (!isLogoutScheduled) {
						logOut("Token has expired");
					}
				} else {
					// Schedule automatic logout when the token expires
					const timeToExpire = (decodedToken.exp - currentTime) * 1000; // Convert seconds to milliseconds
					setTimeout(() => {
						if (!isLogoutScheduled) {
							logOut("Token has expired");
						}
					}, timeToExpire);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
	}, [isLogoutScheduled]);


  return (
    <>
      {isLoding ?
        <Flex justifyContent={'center'} alignItems={'center'} width="100%" >
          <Spinner />
        </Flex> : <div className="">
          <AddEditUser isOpen={isOpen} onClose={handleClose} data={data} selectedId={param?.id} userAction={userAction} setUserAction={setUserAction} fetchData={fetchData} />
          <CommonDeleteModel isOpen={deleteModel} onClose={() => setDelete(false)} type='User' handleDeleteData={handleDeleteClick} ids={''} selectedValues={param.id} />

          <Card display={'none'}>
            <Grid templateColumns={'repeat(12, 1fr)'} gap={4}>
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <Heading size="md" mb={3} textTransform={'capitalize'}>
                  {data?.firstName || data?.lastName ? `${data?.firstName} ${data?.lastName}` : 'User'} Information
                </Heading>

              </GridItem>
              <GridItem colSpan={{ base: 12, md: 6 }} className="hidden" >
                <Flex justifyContent={{ base: 'start', sm: 'start', md: 'end' }}>
                  {data?.role === 'superAdmin' && <Menu>
                    <MenuButton variant="outline" colorScheme='blackAlpha' size="sm" va mr={2.5} as={Button} rightIcon={<ChevronDownIcon />}>
                      Actions
                    </MenuButton>
                    <MenuDivider />
                    <MenuList minWidth={'13rem'}>
                      <MenuItem alignItems={"start"} onClick={() => handleOpen('add')} icon={<AddIcon />}>Add</MenuItem>
                      <MenuItem alignItems={"start"} onClick={() => handleOpen('edit')} icon={<EditIcon />} color='green'>Edit</MenuItem>
                      {data?.role !== 'superAdmin' && JSON.parse(localStorage.getItem('user'))?.role === 'superAdmin' && <>
                        <MenuDivider />
                        <MenuItem alignItems={"start"} onClick={() => setDelete(true)} icon={<DeleteIcon />}>Delete</MenuItem>
                      </>}
                    </MenuList>
                  </Menu>}
                  <Link to="/user">
                    <Button leftIcon={<IoIosArrowBack />} variant="brand" size="sm">
                      Back
                    </Button>
                  </Link>
                </Flex>
              </GridItem>
            </Grid>
            <HSeparator />
            <Grid templateColumns={'repeat(2, 1fr)'} gap={4} mt='5' display={'none'}>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> First Name </Text>
                <Text>{data?.firstName ? data?.firstName : ' - '}</Text>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Last Name </Text>
                <Text>{data?.lastName ? data?.lastName : ' - '}</Text>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}>Phone Number</Text>
                <Text>{data?.phoneNumber ? data?.phoneNumber : ' - '}</Text>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> User Email </Text>
                <Text>{data?.username ? data?.username : ' - '}</Text>
              </GridItem>
            </Grid>
          </Card>

          {data?.role !== 'superAdmin' && <Card mt={3}>
            <RoleTable fetchData={fetchData} columnsData={RoleColumn ?? []} roleModal={roleModal} setRoleModal={setRoleModal} tableData={data?.roles || []} title={'Role'} />
          </Card>}
          <RoleModal fetchData={fetchData} isOpen={roleModal} onClose={setRoleModal} columnsData={RoleColumn ?? []} id={param.id} tableData={roleData ?? []} interestRoles={data?.roles.map((item) => item._id)} />

          <Card mt={3} display={'none'}>
            <Grid templateColumns="repeat(6, 1fr)" gap={1}>
              <GridItem colStart={6} >
                <Flex justifyContent={"right"}>
                  <Button onClick={() => { handleOpenModal(userData); handleOpen('edit') }} leftIcon={<EditIcon />} mr={2.5} variant="outline" size="sm" colorScheme="green">Edit</Button>
                  {data?.role !== 'superAdmin' && JSON.parse(localStorage.getItem('user'))?.role === 'superAdmin' && <Button size="sm" style={{ background: 'red.800' }} onClick={() => setDelete(true)} leftIcon={<DeleteIcon />} colorScheme="red" >Delete</Button>}
                </Flex>
              </GridItem>
            </Grid>
          </Card>
        </div>}

      <div className="flex bg-muted/100 dark:bg-transparent p-10 w-full flex-col gap-5">
        <div className="flex justify-end w-full ">
          {data?.role === 'superAdmin' && <Menu>
            <MenuButton variant="outline" colorScheme='blackAlpha' size="sm" va mr={2.5} as={Button} rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuDivider />
            <MenuList minWidth={'13rem'}>
              <MenuItem alignItems={"start"} onClick={() => handleOpen('add')} icon={<AddIcon />}>Add</MenuItem>
              <MenuItem alignItems={"start"} onClick={() => handleOpen('edit')} icon={<EditIcon />} color='green'>Edit</MenuItem>
              {data?.role !== 'superAdmin' && JSON.parse(localStorage.getItem('user'))?.role === 'superAdmin' && <>
                <MenuDivider />
                <MenuItem alignItems={"start"} onClick={() => setDelete(true)} icon={<DeleteIcon />}>Delete</MenuItem>
              </>}
            </MenuList>
          </Menu>}
          <Link to="/user">
            <Button leftIcon={<IoIosArrowBack />} variant="brand" size="sm">
              Back
            </Button>
          </Link>
        </div >
        <div className="w-full flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">

          <div className="col-span-4 lg:!mb-0">

            <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
              {/* Background and profile */}
              <div
                className="relative mt-0 flex h-32 w-full justify-center rounded-xl bg-cover"
                style={{
                  backgroundImage: "url(https://horizon-ui.com/chakra-pro/static/media/NftBanner3.b1cb888b1b6c5b0f4b8e.png)",
                }}
              >
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">

                  <img

                    src="https://i.pinimg.com/736x/b2/c3/13/b2c313cc44ec3a772b47f2dcec621ffd.jpg"
                    alt="profile"
                    className="h-full w-full rounded-full object-cover cursor-pointer"
                  />
                </div>
              </div>


              <div className=" flex w-full justify-end pt-3 ">
                <span className="text-3xl text-red-600 cursor-pointer" onClick={logOut}><IoLogOutOutline />
                </span>

              </div>

              {/* Name and position */}
              <div className="mt-8 flex flex-col items-center">
                <h4 className="text-2xl font-bold pb-5 text-navy-700 dark:text-white">
                  {data?.firstName || data?.lastName ? `${data?.firstName} ${data?.lastName}` : 'User'}
                </h4>
                <p className='text-small font-semibold '>Id : {data?._id}</p>
               </div>



              {/* Post followers */}
              <div className="mt-6 mb-3 flex justify-between ">
                <div className="flex flex-col space-y-2 items-center justify-center">
                  <p className="text-md font-bold text-navy-700 dark:text-white">{data?.phoneNumber}</p>
                  <p className="text-sm font-normal text-gray-600">Number</p>
                </div>

                <div className="flex flex-col space-y-2 items-center justify-center">
                  <p className="text-md font-bold text-navy-700 dark:text-white">
                  {data?.username ? data?.username : ' - '}
                  </p>
                  <p className="text-sm font-normal text-gray-600">Email</p>

                </div>
                <div className="flex flex-col space-y-2 items-center justify-center">
                  <p className="text-md font-bold text-navy-700 dark:text-white">
                    {data?.role}
                  </p>
                  <p className="text-sm font-normal text-gray-600">Role</p>

                </div>

              </div>
            </Card>
          </div>

          <div className="col-span-3 lg:!mb-0">
            <Storage />
          </div>

          <div className="z-0 col-span-5 lg:!zzmb-0">
            <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500  dark:shadow-none 2xl:grid-cols-11">
              <Link to="/documents" className="col-span-5 h-full w-full rounded-xl bg-muted/80 dark:!bg-navy-700 2xl:col-span-6">
                <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                  <MdFileUpload className="text-[80px] text-blue-600 " />
                  <h4 className="text-xl font-bold text-blue-600 dark:text-white">
                    Upload Files
                  </h4>
                  <p className="mt-2 text-sm font-medium text-blue-600">
                    PNG, JPG and GIF files are allowed
                  </p>
                </button>
              </Link>

              <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
                Upload Files                </h5>
                <p className="leading-1 mt-2 text-base font-normal text-gray-600">
                Accepted File Types (Images, PDFs, Word docs, Powerpoint, Excel, ZIP, and video files - 15MB max)
                </p>
                <button
                  href=" "
                  className="linear mt-4 flex items-center justify-center rounded-xl bg-blue-600 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                >
                  Publish now
                </button>
              </div>
            </Card>
          </div>
        </div>



        <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
         {/* <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
            <Card extra={"w-full p-4 h-full"}>
              <div className="mb-8 w-full">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  My Properties
                </h4>
                <p className="mt-2 text-base text-gray-600">
                  Here you can find more details about your properties. Keep you user
                  engaged by providing meaningful information.
                </p>

              </div>


              <div className=" overflow-hidden">

                <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">

                  <div className="flex items-center" >
                    <Link to="#">
                      <img className="h-[83px] w-[83px] rounded-lg" src="https://i.pinimg.com/736x/b2/c3/13/b2c313cc44ec3a772b47f2dcec621ffd.jpg" alt="" />
                    </Link>
                    <div className="ml-4">
                      <Link className='text-slate-700 font-semibold hover:underline truncate' to="">
                        <p>Independent Villa</p>
                      </Link>
                      <p className="text-md text-gray-500 " > tower-26 paras tierea</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link to=""
                      className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                      <MdModeEditOutline />
                    </Link>
                    <button className='text-red-600 uppercase text-xl'>
                      <MdDeleteOutline />
                    </button>

                  </div>

                </div>

              </div>

            </Card> 
          </div>*/}

          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
            <Card extra={"w-full h-full p-3"}>
              {/* Header */}
              <div className="mt-2 mb-8 w-full">
                <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                  Update User Info
                </h4>

              </div>
              {/* Cards */}
              <div className="p-6">

                <form action="" className="space-y-3 flex w-full flex-col  " >
                  <FormLabel>Name</FormLabel>
                  <Input type="text" placeholder="Username" id="username" defaultValue={data?.firstName} className="border p-3 rounded-lg" />
                  <FormLabel>Phone</FormLabel>
                  <Input type="phone" placeholder="Phone" id="phone" defaultValue={data?.phoneNumber} className="border p-3 rounded-lg" />
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Email" id="email" defaultValue={data?.username} className="border p-3 rounded-lg" />

                  <Button onClick={() => { handleOpenModal(userData); handleOpen('edit') }} leftIcon={<EditIcon />} mr={2.5} mt={4} variant="outline" size="sm" colorScheme="green">Edit</Button>

                </form>
                <div className="flex py-4 justify-between items-center">

                  <button className="bg-red-500 text-white flex justify-center items-center gap-2 p-2 text-sm rounded-lg" onClick={() => setDelete(true)}><DeleteIcon /> Delete Account</button>

                  <button className="bg-blue-600 p-1 flex rounded-lg justify-center items-center gap-2 cursor-pointer text-xl text-white" variant="outline" onClick={logOut} ><IoLogOutOutline /> Logout</button>

                </div>
              </div>

            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default View
