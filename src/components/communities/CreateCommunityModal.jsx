import { useEffect, useState } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

const CommunityForm = ({ community }) => {
  const navigate = useNavigate();
  const { createCommunity, updateCommunity, error, isLoading } = useCommunity();
  const [formData, setFormData] = useState({
    communityName: "",
    avatarFile: null,
  });

  useEffect(() => {
    if (community) {
      setFormData({
        communityName: community.communityName || "",
        avatarFile: null,
      });
    }
  }, [community]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (community) {
      // Edit Mode
      const result = await updateCommunity(community._id, {
        communityName: formData.communityName,
      });
      if (result?.success) navigate(`/communities/${community._id}`);
    } else {
      const data = new FormData();
      data.append("communityName", formData.communityName);
      if (formData.avatarFile) data.append("avatarFile", formData.avatarFile);

      const result = await createCommunity(data);
      if (result?.success) {
        const newId = result.data?._id;
        navigate(`/community/${newId}`);
      }
    }
  };

  return (
    <div className="flex flex-col mx-auto max-w-3xl p-6 bg-white dark:bg-[#1A1A1A] border border-black/5 dark:border-white/10 rounded-[var(--radius)] shadow-[var(--shadow-soft)]">
      {error && <p className="mb-4 text-sm text-[--accent-danger] font-bold text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          name="communityName"
          label="Community Name:"
          placeholder="Enter name"
          value={formData.communityName}
          onChange={handleChange}
          required
        />

        <Input
          type="file"
          name="avatarFile"
          label={community ? "Change Avatar:" : "Upload Avatar:"}
          onChange={handleChange}
          accept="image/*"
          required={!community}
        />

        <Button type="submit" disabled={isLoading} btnP className="w-full py-3 mt-2">
          {isLoading ? "Processing..." : community ? "Update Community" : "Create Community"}
        </Button>
      </form>
    </div>
  );
};

export default CommunityForm;