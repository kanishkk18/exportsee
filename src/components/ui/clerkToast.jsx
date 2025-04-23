import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function WelcomeModal() {
  const { user, isSignedIn } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      const hasSeenModal = sessionStorage.getItem("hasSeenWelcomeModal");
      if (!hasSeenModal) {
        setShowModal(true);
        sessionStorage.setItem("hasSeenWelcomeModal", "true");
      }
    }
  }, [isSignedIn]);

  if (!showModal || !user) return null;

  const email = user?.primaryEmailAddress?.emailAddress;
  const phone = user?.primaryPhoneNumber?.phoneNumber;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">🎉 Login Successful</h2>
        <p className="text-gray-700 mb-2">
          Welcome, <span className="font-medium">{user.fullName || email || phone || "User"}</span>!
        </p>
        <p className="text-sm text-gray-500">
          You have successfully logged in using{" "}
          {email ? "your email" : phone ? "your phone number" : "your account"}.
        </p>
        <div className="mt-2 text-gray-600 text-sm">
          {email && <p>Email: {email}</p>}
          {!email && phone && <p>Phone: {phone}</p>}
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-[6px]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
