import { useEffect, useState } from "react";
import  Card  from "components/card/Card"; // Adjust the path as needed
import { BsCloudCheck } from "react-icons/bs";
import { getApi } from "services/api"; // Adjust the path to your API utility

const StorageCard = () => {
  const [storageData, setStorageData] = useState({ usedStorage: 0, totalStorage: 1 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getApi('api/reporting'); // API endpoint for fetching storage details
    if (result && result.status === 200) {
      setStorageData(result?.data || { usedStorage: 0, totalStorage: 1 });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { usedStorage = 0, totalStorage = 1 } = storageData;
  const percentageUsed = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0;

  return (
    <Card className="h-full rounded-[20px] border-none shadow-none justify-end items-end py-8 " extra={"w-full min-h-full  p-4"}>
      {/* Your storage */}
      <div className="mb-auto mt-4 flex flex-col items-center justify-center">
        <div className="mt-4 mb-2 flex items-center justify-center rounded-full p-[26px] text-5xl font-bold text-brand-500 bg-blue-600 text-white">
          <BsCloudCheck />
        </div>
        <h4 className="mb-px mt-4 text-2xl font-bold text-navy-700 dark:text-white">
          Your storage
        </h4>
        <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
          Supervise your drive space in the easiest way
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex w-full flex-col mt-6 p-4">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-600">{usedStorage.toFixed(1)} GB</p>
          <p className="text-sm font-medium text-gray-600">{totalStorage.toFixed(1)} GB</p>
        </div>
        <div className="mt-4 flex h-3 w-full items-center rounded-full bg-blue-100">
          <span
            className="h-full rounded-full bg-blue-600 dark:bg-blue-600"
            style={{ width: `${percentageUsed}%` }}
          />
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className=" text-center text-gray-500">
          Loading storage details...
        </div>
      )}
    </Card>
  );
};

export default StorageCard;
