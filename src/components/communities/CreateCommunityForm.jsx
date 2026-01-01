import { useParams } from "react-router-dom";
import CreateCommunityModal from "./CreateCommunityModal";
import { useCommunity } from "../../context";
import { useEffect } from "react";

const CreateCommunity = () => {
  const { communityId } = useParams();
  const { getCommunityDetails, currentCommunity, setCurrentCommunity } = useCommunity();

  useEffect(() => {
    if (communityId) {
      getCommunityDetails(communityId);
    } else {
      // Clear data so Create mode doesn't show old Edit data
      if (setCurrentCommunity) setCurrentCommunity(null);
    }
    // Remove getCommunityDetails from here to stop the infinite loop
  }, [communityId]); 

  return (
    <div>
      {/* Ensure we don't pass stale data if communityId is missing */}
      <CreateCommunityModal community={communityId ? currentCommunity : null} />
    </div>
  );
};

export default CreateCommunity;