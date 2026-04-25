import { useState } from "react";
import PrimaryButton from "@/common/PrimaryButton";
import { useDeleteUserMutation, useGetMeQuery } from "@/store/Api/User.api";

const DangerZone = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { data: user } = useGetMeQuery(null);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteAccount = async () => {
    if (!user?.data?._id) {
      console.error("User ID not found");
      return;
    }

    try {
      await deleteUser(user.data._id).unwrap();
      // Handle successful deletion - maybe redirect to login or show success message
      console.log("Account deleted successfully");
      // You might want to redirect or clear local storage here
      // window.location.href = '/login';
    } catch (error) {
      console.error("Failed to delete account:", error);
      // Handle error - show error message to user
    } finally {
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <div className="p-4 border border-primary-red/20 bg-primary-red/10 rounded-xl space-y-3">
        <div>
          <h2 className="text-primary-red">Danger Zone</h2>
          <p className="text-base text-secondary-text">
            Permanently delete your account and all associated data
          </p>
        </div>
        <PrimaryButton
          type="Primary"
          title="Delete Account"
          className="bg-primary-red text-white text-base"
          onClick={() => setIsConfirmOpen(true)}
        />
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h3 className="text-xl font-semibold text-primary-red">
              Confirm Account Deletion
            </h3>
            <p className="text-secondary-text">
              Are you sure you want to delete your account? This action cannot be
              undone and all your data will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-lg bg-primary-red text-white hover:bg-red-600 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DangerZone;