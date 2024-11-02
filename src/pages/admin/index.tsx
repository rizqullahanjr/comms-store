import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardAdminView from "@/components/views/admin/Dashboard";

const AdminPage = () => {
  return (
    <AdminLayout>
      <div>
        <DashboardAdminView />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
