interface HeaderProps {
  totalUsers: string;
  title?: string; 
}

export const Header = ({ totalUsers, title = "Gestión de Usuarios" }: HeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">Total: {totalUsers} usuarios</p>
    </div>
  );
};