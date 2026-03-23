import AdminViewProfileDonations from "./components/AdminViewProfileDonations";
import AdminViewProfileCampaigns from "./components/AdminViewProfileCampaigns";
import AdminViewProfileStats from "./components/AdminViewProfileStats";
import AdminViewProfileChart from "./components/AdminViewProfileChart";
import AdminViewProfileHeader from "./components/AdminViewProfileHeader";






const AdminViewUserProfile = () => {
  return (
    <div className="space-y-8 mt-10 px-4 md:px-10">
        <AdminViewProfileHeader/>
        <AdminViewProfileStats/>
        <AdminViewProfileChart/>
      <div className="grid md:grid-cols-1 gap-3">
        <AdminViewProfileDonations/>
        <AdminViewProfileCampaigns/>
      </div>

    </div>
  );
};

export default AdminViewUserProfile;