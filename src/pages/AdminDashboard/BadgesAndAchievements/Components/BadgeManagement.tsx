import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {  Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useGetAllBadgesByAdminQuery, useUpdateBadgeMutation } from "@/store/Api/Badges.api";

// Badge Type from API
export interface Badge {
  _id: string;
  name: string;
  type: string;
  triggerEvent: string;
  conditions: string[];
  points: number;
  logo?: string;
  earnedCount: number;
  updatedAt?: string;
  requirement?: string;
}

// Form Schema
const badgeSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type BadgeFormData = z.infer<typeof badgeSchema>;

const BadgeManagement = () => {
  // API Hooks
  const { data: badgesData, isLoading, isError } = useGetAllBadgesByAdminQuery(null);
  console.log(badgesData)
  const [updateBadge, { isLoading: isUpdating }] = useUpdateBadgeMutation();

  const badges = badgesData?.data?.allBadges || [];

  const [searchTerm, _setSearchTerm] = useState("");
  const [statusFilter, _setStatusFilter] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [badgeImage, setBadgeImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Filter badges
  const filteredBadges = badges.filter((badge: Badge) => {
    const matchesSearch =
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || badge.type === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEditModal = (badge: Badge) => {
    setCurrentBadge(badge);
    setIsEditModalOpen(true);
    setImagePreview(badge.logo || null);
  };

  const TriggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBadgeImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBadge = async (data: BadgeFormData) => {
    if (!currentBadge) return;

    const formData = new FormData();
    formData.append("name", data.name);
    if (badgeImage) {
      formData.append("logo", badgeImage);
    }

    try {
      await updateBadge({ id: currentBadge._id, formData }).unwrap();
      setIsEditModalOpen(false);
      setCurrentBadge(null);
      setBadgeImage(null);
      setImagePreview(null);
      toast.success("Badge updated successfully!");
    } catch (error) {
      toast.error("Failed to update badge");
    }
  };

  const BadgeCard = ({ badge }: { badge: Badge }) => {
    return (
      <div className="bg-primary-white rounded-xl p-4 border border-border hover:shadow-md transition-shadow space-y-2">
        <div className="flex justify-between items-start mb-2">
          <div
            className={`size-12 rounded-full flex items-center justify-center ${badge.logo ? "border border-border" : "bg-light-blue"
              }`}
          >
            {badge.logo ? (
              <img
                src={badge.logo}
                alt="badge"
                className="w-10 object-cover rounded-full"
              />
            ) : (
              <span className="text-white">🏆</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openEditModal(badge)}
              className="text-primary-blue hover:text-primary-blue/80"
            >
              <Edit size={20} />
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-primary-text mb-1">{badge.name}</h3>
        <p className="text-sm text-secondary-text mb-3 line-clamp-2">
          {badge.type} • {badge.points} points
        </p>
        <p className="text-xs text-secondary-text mb-3 line-clamp-2">
          {badge.conditions.join(", ")}
        </p>
        <hr className="border border-border" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary-text">Earned By</span>
          <span className="text-xs font-medium text-primary-green">
            {badge.earnedCount.toLocaleString()} users
          </span>
        </div>
      </div>
    );
  };

  const EditBadgeModal = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<BadgeFormData>({
      resolver: zodResolver(badgeSchema),
      defaultValues: currentBadge || {
        name: "",
      },
    });

    useEffect(() => {
      if (currentBadge) {
        setValue("name", currentBadge.name);
        setImagePreview(currentBadge.logo || null);
      }
    }, [currentBadge, setValue]);

    const onSubmit = (data: BadgeFormData) => handleUpdateBadge(data);
    if (!currentBadge) return null;

    return (
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Badge: {currentBadge.name}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-primary-text">
                Name
              </label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-text">
                  Badge Icon (Image)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden border border-border rounded-lg p-2"
                />
                <div
                  onClick={TriggerFileUpload}
                  className="size-10 rounded-md border border-border
      flex items-center justify-center
      cursor-pointer bg-gray-50 hover:bg-gray-100 transition
    "
                >
                  <Upload />
                </div>
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 mt-2 object-cover rounded-md"
                />
              )}
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setCurrentBadge(null);
                  setBadgeImage(null);
                  setImagePreview(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary-blue text-white"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-text">Loading badges...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500">Failed to load badges. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* <div className="p-4 sm:p-6 bg-white border border-border rounded-xl flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text"
            size={16}
          />
          <input
            type="text"
            placeholder="Search badges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-border rounded-lg bg-gray focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Badge">Badge</SelectItem>
              <SelectItem value="Achievement">Achievement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge: Badge) => (
            <BadgeCard key={badge._id} badge={badge} />
          ))}
        </div>
        {filteredBadges.length === 0 && (
          <div className="text-center py-12 text-secondary-text">
            <p>No badges found.</p>
          </div>
        )}
      </div>

      <EditBadgeModal />
    </div>
  );
};

export default BadgeManagement;