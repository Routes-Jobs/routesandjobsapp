
import { useState } from "react";
import Header from "@/components/Header";
import RoleSelection from "@/components/RoleSelection";
import EmployeeFlow from "@/components/EmployeeFlow";
import EmployerFlow from "@/components/EmployerFlow";
import GeneralPublicFlow from "@/components/GeneralPublicFlow";

type UserRole = "employee" | "employer" | "general" | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const renderFlow = () => {
    switch (selectedRole) {
      case "employee":
        return <EmployeeFlow onBack={() => setSelectedRole(null)} />;
      case "employer":
        return <EmployerFlow onBack={() => setSelectedRole(null)} />;
      case "general":
        return <GeneralPublicFlow onBack={() => setSelectedRole(null)} />;
      default:
        return <RoleSelection onRoleSelect={setSelectedRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderFlow()}
    </div>
  );
};

export default Index;
