type ViewTypeAdmin = "clases" | "usuarios" | "planes" | "videos" | "archivos" | "blogs";
type ViewTypeTemas = "clases"| "temas" | "subtemas"

type NavItem = {
  id: ViewTypeAdmin;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
};