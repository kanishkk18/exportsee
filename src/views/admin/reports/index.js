
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getApi } from 'services/api';
import ReportChart from './components/reportChart';
import CommonCheckTable from "components/reactTable/checktable";
import { Link } from "react-router-dom";
import Banner from "./banner";
import HistoryCard from "./components/historyCard";
import { Card, CardContent } from "../../../components/ui/card";
import { ArrowRight } from 'lucide-react';
import { Button } from "@chakra-ui/react";
import { superballs } from 'ldrs'

const Report = () => {
    const title = 'Reports'
    const [data, setData] = useState([])
    const [isLoding, setIsLoding] = useState(false)
    const [selectedValues, setSelectedValues] = useState([]);
    // const [selectedColumns, setSelectedColumns] = useState([]);
    // const [columns, setColumns] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"))

    const tableColumns = [
        { Header: 'Email Sent', accessor: 'emailsent' },
        { Header: "Outbound Calls", accessor: "outboundcall" },
    ];

    // const fetchCustomDataFields = async () => {
    //     const tempTableColumns = [
    //         { Header: '#', accessor: '_id' },
    //         { Header: 'Name', accessor: 'firstName' },
    //         { Header: 'Email Sent', accessor: 'emailsent' },
    //         { Header: "Outbound Calls", accessor: "outboundcall" },
    //     ];
    //     // setSelectedColumns(JSON.parse(JSON.stringify(tempTableColumns)));
    // }

    if (user.role === 'superAdmin') {
        tableColumns.unshift({
            Header: "#",
            accessor: "_id",
            isSortable: false,
            width: 10
        }, { Header: 'Name', accessor: 'firstName' })
    }

    const fetchData = async () => {
        setIsLoding(true)
        let result = await getApi(user.role === 'superAdmin' ? 'api/reporting' : `api/reporting?_id=${user._id}`);
        if (result && result.status === 200) {
            setData(result?.data)
        }
        setIsLoding(false)
    }

    // const [columns, setColumns] = useState([...tableColumns]);
    // const [selectedColumns, setSelectedColumns] = useState([...tableColumns]);
    // const dataColumn = tableColumns?.filter(item => selectedColumns?.find(colum => colum?.Header === item.Header))
    useEffect(() => {
        fetchData()
        // fetchCustomDataFields()
    }, [])

    return (
        <div className="p-8 bg-white rounded-[20px]">
        
        <div className="mt-6 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
            {/* NFT Banner */}
            <Banner />
  
            {/* NFT Header */}
          {/*   <div className="mb-4 mt-8 flex flex-col justify-between px-4 md:flex-row md:items-center">
              <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
                Recently Created
              </h4>
              <Button variant="outline">
                <Link to="/product">See All</Link>
              </Button>
            </div>
  
            
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 <div >
                    <Card
                      className="group overflow-hidden rounded-[12px] transition-transform hover:-translate-y-1"
                    >
                      <CardContent className="p-0 relative">
                        <div className="relative w-full h-[500px]">
                          <img
                            src="https://i.pinimg.com/736x/b2/c3/13/b2c313cc44ec3a772b47f2dcec621ffd.jpg"
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                        <div className="absolute bottom-2 left-2 right-2 bg-white rounded-[10px] p-3 shadow-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                            </p>
                              <Link
                                className="text-lg font-semibold text-gray-900"
                                to="http://localhost:3000/propertyView/6757364df40b51add35fba35"
                              >
                                <p>Independent villa</p>
                              </Link>
                            </div>
                            <Link  to="http://localhost:3000/propertyView/6757364df40b51add35fba35" className="h-10 w-10 rounded-full flex items-center justify-center transition-colors bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white">
                              <ArrowRight className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
        
          </div> */}
                    <Card className="min-w-[57vw] rounded-xl flex p-4 mt-6"> <ReportChart /></Card>

          </div> 
  
          {/* Right Side Section */}
          <div className="col-span-1  space-y-6  w-full rounded-2xl 2xl:col-span-1">
          <Card mt={4} mb={4} className="shadow-sm rounded-2xl">
                <CommonCheckTable
                    title={title}
                    isLoding={isLoding}
                    columnData={tableColumns ?? []}
                    // dataColumn={dataColumn ?? []}
                    allData={data ?? []}
                    tableData={data}
                    AdvanceSearch={false}
                    checkBox={false}
                    tableCustomFields={[]}
                    deleteMany={true}
                // selectedValues={selectedValues}
                // setSelectedValues={setSelectedValues}
                // selectedColumns={selectedColumns}
                // setSelectedColumns={setSelectedColumns}
                />
            </Card>
            
           

          </div>
        </div>
      

      </div>
           
           
       
    )
}

export default Report
