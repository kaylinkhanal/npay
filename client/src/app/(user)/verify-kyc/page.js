"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [kycList, setKycList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getKycList();
  }, []);

  const getKycList = async () => {
    const { data } = await axios.get(`http://localhost:4000/user-kyc`);
    setKycList(data);
  };

  const handleApprove = async (userId) => {
    // Implement approve logic here
  };

  const handleReject = async (userId) => {
    // Implement reject logic here
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleRefresh = async () => {
    await getKycList();
    toast.success("Refreshed successfully");
  };

  return (
    <div className="mx-10">
      <div className="flex mb-4">
        <Button auto onPress={handleRefresh}>
          Refresh
        </Button>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fathers Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  KYC status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {kycList.length > 0 && kycList.map((item) => (
                <tr key={item.userId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.fathersName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span
                      className={
                        item.kycVerifiedStatus === "pending"
                          ? "bg-orange-200 text-orange-900 px-3 py-1 font-semibold rounded-full leading-tight"
                          : item.kycVerifiedStatus === "rejected"
                          ? "bg-red-200 text-red-900 px-3 py-1 font-semibold rounded-full leading-tight"
                          : "bg-green-200 text-green-900 px-3 py-1 font-semibold rounded-full leading-tight"
                      }
                    >
                      {item.kycVerifiedStatus}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {item.kycVerifiedStatus === "pending" ? (
                      <Button onPress={() => handleOpenModal(item)}>View Details</Button>
                    ) : item.kycVerifiedStatus === "rejected" ? (
                      "No action"
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUser && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{selectedUser.userId}'s KYC Details</ModalHeader>
                <ModalBody>
                  <p>Fathers Name: {selectedUser.fathersName}</p>
                  <p>Date of Birth: {selectedUser.dob}</p>
                  <p>Citizenship Number: {selectedUser.citizenshipNumber}</p>
                  <p>Permanent Address: {selectedUser.permanentAddress}</p>
                  <p>Temporary Address: {selectedUser.temporaryAddress}</p>
                  <p>Pan Number: {selectedUser.panNumber}</p>
                  <p> Citizenship photo: "After building image fetching"</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" onPress={() => handleApprove(selectedUser.userId)}>
                    Approve
                  </Button>
                  <Button color="danger" onPress={() => handleReject(selectedUser.userId)}>
                    Reject
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Page;
