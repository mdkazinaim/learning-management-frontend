import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useGetAllSupportQuery, useUpdateSupportStatusMutation } from "@/store/Api/Support.api";

interface SupportData {
  _id: string;
  userEmail: string;
  phone: string;
  problemDescription: string;
  solveStatus: "Pending" | "Resolve";
  replay?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  user: string;
  phone?: string;
  date: string;
  status: "Pending" | "Resolved";
  message?: string;
}

const replySchema = z.object({
  solveStatus: z.enum(["Pending", "Resolve"], {
    required_error: "Status is required",
  }),
  replay: z.string().min(10, "Reply message must be at least 10 characters"),
});

type ReplyFormData = z.infer<typeof replySchema>;

const TicketManagement = () => {
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const ticketsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const queryParams = {
    searchTerm: debouncedSearch,
    page: currentPage,
    limit: ticketsPerPage,
  };

  const { data, isLoading, isFetching } = useGetAllSupportQuery(queryParams);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateSupportStatusMutation();

  const mapToTicket = (supportData: SupportData): Ticket => ({
    id: supportData._id,
    ticketId: `#${supportData._id.slice(-8).toUpperCase()}`,
    subject: supportData.problemDescription,
    user: supportData.userEmail,
    phone: supportData.phone,
    date: new Date(supportData.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    status: supportData.solveStatus === "Resolve" ? "Resolved" : "Pending",
    message: supportData.problemDescription,
  });

  const tickets = data?.data?.data?.map(mapToTicket) || [];
  const totalPages = data?.meta?.totalPage || 1;
  const total = data?.meta?.total || 0;
  const indexOfFirstTicket = (currentPage - 1) * ticketsPerPage;
  const indexOfLastTicket = Math.min(currentPage * ticketsPerPage, total);

  const openTicketModal = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTicket(null);
  };

  const handleReply = async (formData: ReplyFormData) => {
    if (!currentTicket) return;

    const toastId = toast.loading("Updating ticket...");

    try {
      await updateStatus({
        supportId: currentTicket.id,
        solveStatus: formData.solveStatus,
        replay: formData.replay,
      }).unwrap();

      toast.success("Ticket updated successfully!", { id: toastId });
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update ticket. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border border-border rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by email, phone, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {isFetching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-blue"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border rounded-lg overflow-hidden">
                <thead className="bg-gray">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-secondary-text">Ticket ID</th>
                    <th className="p-3 text-left text-sm font-medium text-secondary-text">Subject</th>
                    <th className="p-3 text-left text-sm font-medium text-secondary-text">User</th>
                    <th className="p-3 text-left text-sm font-medium text-secondary-text">Date</th>
                    <th className="p-3 text-left text-sm font-medium text-secondary-text">Status</th>
                    <th className="p-3 text-right text-sm font-medium text-secondary-text">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tickets.length > 0 ? (
                    tickets.map((ticket : any) => (
                      <tr key={ticket.id} className="hover:bg-gray/50 transition-colors">
                        <td className="p-3 text-sm font-medium">{ticket.ticketId}</td>
                        <td className="p-3 text-sm">{ticket.subject}</td>
                        <td className="p-3 text-sm">{ticket.user}</td>
                        <td className="p-3 text-sm">{ticket.date}</td>
                        <td className="p-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === "Pending"
                                ? "bg-[#FFF5F5] text-primary-red"
                                : "bg-green-100 text-primary-green"
                              }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => openTicketModal(ticket)}
                            className="text-primary-blue hover:underline text-sm font-medium"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-secondary-text text-sm">
                            {searchTerm ? "No tickets found matching your search" : "No support tickets available"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {tickets.length > 0 && (
                <div className="p-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-secondary-text">
                    Showing {indexOfFirstTicket + 1} to {indexOfLastTicket} of {total} results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-primary-blue hover:bg-gray"
                        }`}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center ${currentPage === pageNum ? "bg-primary-blue text-white" : "text-primary-text hover:bg-gray/50"
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-primary-blue hover:bg-gray"
                        }`}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isModalOpen && currentTicket && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-primary-text">Ticket ID: {currentTicket.ticketId}</h3>
                      <button onClick={closeModal} className="text-secondary-text hover:text-primary-text">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-6 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-secondary-text">From:</span>
                        <span className="font-medium text-primary-text">{currentTicket.user}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-secondary-text">Phone:</span>
                        <span className="font-medium text-primary-text">{currentTicket.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-secondary-text">Date:</span>
                        <span className="font-medium text-primary-text">{currentTicket.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-secondary-text">Status:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${currentTicket.status === "Pending" ? "bg-[#FFF5F5] text-primary-red" : "bg-green-100 text-primary-green"
                            }`}
                        >
                          {currentTicket.status}
                        </span>
                      </div>

                      <div className="p-4 bg-gray rounded-lg mt-4">
                        <p className="text-sm font-medium text-primary-text mb-2">Problem Description:</p>
                        <p className="text-sm text-secondary-text">{currentTicket.message}</p>
                      </div>
                    </div>

                    {currentTicket.status === "Pending" && (
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-primary-text mb-4">Update Ticket</h4>
                        <ReplyForm
                          onSubmit={handleReply}
                          defaultValues={{
                            solveStatus: "Pending",
                            replay: "",
                          }}
                          isLoading={isUpdating}
                        />
                      </div>
                    )}

                    {currentTicket.status === "Resolved" && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          This ticket has been resolved
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray transition-colors"
                      >
                        Close
                      </button>
                      {currentTicket.status === "Pending" && (
                        <button
                          onClick={() => document.getElementById("update-button")?.click()}
                          disabled={isUpdating}
                          className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-primary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? "Updating..." : "Update Ticket"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ReplyForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: {
  onSubmit: (data: ReplyFormData) => void;
  defaultValues: { solveStatus: "Pending" | "Resolve"; replay: string };
  isLoading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-primary-text mb-2">
          Status
        </label>
        <select
          {...register("solveStatus")}
          className={`w-full p-2 border ${errors.solveStatus ? "border-red-500" : "border-border"
            } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
        >
          <option value="Pending">Pending</option>
          <option value="Resolve">Resolve</option>
        </select>
        {errors.solveStatus && (
          <p className="text-xs text-red-500 mt-1">{errors.solveStatus.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-primary-text mb-2">
          Reply Message
        </label>
        <textarea
          {...register("replay")}
          rows={4}
          className={`w-full p-2 border ${errors.replay ? "border-red-500" : "border-border"
            } rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue`}
          placeholder="Write your reply message here..."
        />
        {errors.replay && (
          <p className="text-xs text-red-500 mt-1">{errors.replay.message}</p>
        )}
      </div>

      <button type="submit" id="update-button" className="sr-only" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

export default TicketManagement;